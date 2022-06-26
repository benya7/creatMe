import { TokenMetadataInternal } from '@oxheadalpha/fa2-interfaces';
import fs from "fs"
import path from 'path';
import readFile from '../../../lib/read-file';
import sleep from '../../../lib/sleep';
import initRoute from '../../../lib/init-route';
import { pinFile } from '@oxheadalpha/tezos-tools'
import { parseTokens } from '@oxheadalpha/tznft/dist/contracts'
import initTezosTK from '../../../lib/tezos/init-tezos-tk';
import mintNft from '../../../lib/tezos/mint-nft';
import { ItemMetadata } from '../../../lib/types';
import updateItemMetadata from '../../../lib/tezos/update-item-metadata';


const API_KEY = process.env.PINATA_API_KEY!;
const SECRET_KEY = process.env.PINATA_SECRET_API_KEY!;

let apiRoute = initRoute((error, _, res) => {
  console.log(error.message)
  if (error.message == "PINATA_AUTH_ERROR") {
    res.status(501).json({ type: error.message, message: "Pinata Authentication Error, please review your api keys." })
  } else if (error.message == "JSON_METADATA_NOT_FOUND") {
    res.status(501).json({ type: error.message, message: "Metadata JSON File not found or wrong named." })
  } else if (error.message == "INCONSISTENT_IMAGE_FILES") {
    res.status(501).json({ type: error.message, message: "The items in the Metadata JSON file do not match the selected image files. Files are missing or names do not match." })
  } else if (error.message == "INCONSISTENT_METADATA_FILES") {
    res.status(501).json({ type: error.message, message: "The Metadata JSON file do not match the pattern name passed. Files are missing or names do not match." })
  } else if (error.message == "USED_TOKEN_ID") {
    res.status(501).json({ type: error.message, message: "Some of the items for the passed id have already been used. Please check the number of elements in your uploads or your single metadata file." })
  }
  else {
    res.status(501).json({ type: error.code, message: error.message })
  }

})

const UPLOADS_DIR = path.join(process.cwd(), 'json');


apiRoute.post(async (req, res) => {

  let tokens: string[] = [];
  let parsedTokens: TokenMetadataInternal[] = [];
  let {
    collectionAddress,
    fileExtension,
    multipleFile,
    totalItems,
    patternName
  } = req.body

  let fileMetadata: ItemMetadata[] = [];

  // Parse fileMetadata in a single object
  console.log("parsing metadata files...")
  if (multipleFile) {
    for (let i = 0; i < totalItems; i++) {
      let jsonFile = await readFile(path.join(UPLOADS_DIR, `${patternName}${i}.json`))
        .catch(() => {
          throw new Error("INCONSISTENT_METADATA_FILES")
        })
      let ItemMetadata: ItemMetadata = JSON.parse(jsonFile)
      fileMetadata.push(ItemMetadata)
    }
  } else {
    let jsonFile = await readFile(`${UPLOADS_DIR}/metadata.json`)
      .catch(() => {
        throw new Error("JSON_METADATA_NOT_FOUND");
      })

    let itemsMetadata: ItemMetadata[] = JSON.parse(jsonFile)
    fileMetadata = itemsMetadata;

  }

  // Check if the items in the json metadata file match the selected files
  console.log("checking images files consistent...")
  for (const item of fileMetadata) {
    let imagePath = path.join(UPLOADS_DIR, `${item.name}.${fileExtension}`)
    await readFile(imagePath).catch(() =>{
      throw new Error("INCONSISTENT_IMAGE_FILES"); 
    })
  }

  // Loop in metadata items
  console.log("starting IPFS service...")

  for (const [i, item] of fileMetadata.entries()) {
    let imagePath = path.join(UPLOADS_DIR, `${item.name}.${fileExtension}`)

    // Pin image to IPFS
    console.log(`pin image of ${item.name} to IPFS...`);
    let imageCid = await pinFile(API_KEY, SECRET_KEY, `${item.name}-image`, imagePath)
    let itemJson = updateItemMetadata(imageCid, item);

    const itemJsonPath = path.join(UPLOADS_DIR, `${item.name}.json`);
    fs.writeFileSync(itemJsonPath, itemJson);

    // Pin metadata to IPFS
    console.log(`pin metadata of ${item.name} to IPFS...`);
    let metadataCid = await pinFile(API_KEY, SECRET_KEY, `${item.name}-metadata`, itemJsonPath)
    tokens.push(`${i}, ipfs://${metadataCid}`)

    await sleep(2500)
  }

  tokens.map(token => {
    parsedTokens = parseTokens(token, parsedTokens);
  })

  const tezos = initTezosTK(true);
  await mintNft(tezos, collectionAddress, parsedTokens);
  console.log("all files were processed!");


  res.status(200).json({ msg: "success" })
})




export default apiRoute