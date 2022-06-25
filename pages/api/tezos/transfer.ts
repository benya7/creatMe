import { NextApiRequest } from 'next';

import { transferBatch } from '@oxheadalpha/fa2-interfaces';
import path from 'path';
import readFile from '../../../lib/read-file';
import initRoute from '../../../lib/init-route';
import initTezosTK from '../../../lib/tezos/init-tezos-tk';
import transferNft from '../../../lib/tezos/transfer-nft';
import { addTransfer } from '@oxheadalpha/tznft/dist/contracts';


interface ReqExtended extends NextApiRequest {
  body: {
    collectionAddress: string;
    withoutFile: boolean;
    from: string;
    destinations: {
      to: string;
      tokenId: number;
    }[];
  }
}



let apiRoute = initRoute((error, _, res) => {
  console.log(error.message)
  // if (error.message == "PINATA_AUTH_ERROR") {
  //   res.status(501).json({ type: error.message, message: "Pinata Authentication Error, please review your api keys." })
  // } else if (error.message == "JSON_METADATA_NOT_FOUND") {
  //   res.status(501).json({ type: error.message, message: "Metadata JSON File not found or wrong named." })
  // } else if (error.message == "INCONSISTENT_IMAGE_FILES") {
  //   res.status(501).json({ type: error.message, message: "The items in the Metadata JSON file do not match the selected image files. Files are missing or names do not match." })
  // } else if (error.message == "INCONSISTENT_METADATA_FILES") {
  //   res.status(501).json({ type: error.message, message: "The Metadata JSON file do not match the pattern name passed. Files are missing or names do not match." })
  // } else if (error.message == "USED_TOKEN_ID") {
  //   res.status(501).json({ type: error.message, message: "Some of the items for the passed id have already been used. Please check the number of elements in your uploads or your single metadata file." })
  // }
  // else {
  // }
  res.status(501).json({ type: error.code, message: error.message })

})

const UPLOADS_DIR = path.join(process.cwd(), "/public/uploads")


apiRoute.post(async (req: ReqExtended, res) => {

  let {
    collectionAddress,
    withoutFile,
    from,
    destinations
  } = req.body

  const tezos = initTezosTK();



  let _transferBatch = transferBatch();

  if (withoutFile) {

    destinations.map(destination => {
      let { to, tokenId } = destination;
      _transferBatch = addTransfer(`${from}, ${to}, ${tokenId}`, _transferBatch)

    })

  } else {

    let fileJson = await readFile(`${UPLOADS_DIR}/transfers.json`)
      .catch(() => {
        throw new Error("INCONSISTENT_TRANSFERS_FILE")
      })

    let transfersFile: {
      from: string;
      to: string;
      tokenId: number;
    }[] = JSON.parse(fileJson);

    transfersFile.map(transfer => {
      _transferBatch = addTransfer(`${transfer.from}, ${transfer.to}, ${transfer.tokenId}`, _transferBatch)

    })
  }

  await transferNft(tezos, collectionAddress, _transferBatch);
  // console.log("all files were processed!");


  res.status(200).json({ msg: "success" })
})




export default apiRoute