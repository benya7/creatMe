import { NextApiRequest } from 'next/types';
import initRoute from '../../../lib/init-route';
import initTezosTK from '../../../lib/tezos/init-tezos-tk';
import throwError from '../../../lib/throw-error';
import { getTokensMetadata } from '../../../lib/tezos/get-tokens-metadata';
import getCollectionMetadata from '../../../lib/tezos/get-collection-metadata';

let apiRoute = initRoute((error, _, res) => {
  console.log(error.message)
  if (error.message == "INVALID_CONTRACT_ADDRESS") {
    res.status(501).json({ type: error.message, message: "Invalid contract address. Please enter an existing contract address." })
  } else if (error.message == "COLLECTION_METADATA_NOT_FOUND") {
    res.status(501).json({ type: error.message, message: "Collection metadata not found, please enter an FA2 Contract address with metadata storage." })
  } else if (error.message == "INVALID_REQ_TYPE") {
    res.status(501).json({ type: error.message, message: "Invalid request type, please enter an accepted type. Example: 'collection-metadata' or 'tokens-metadata'" })
  } else if (error.message == "TOKEN_ID_NOT_FOUND") {
    res.status(501).json({ type: error.message, message: "Some of the IDs don't exist. Make sure they are token ids that are minted." })
  }
  else {
    res.status(501).json({ type: "Uknow Error", message: "critical" })
  }
});


interface ReqExtended extends NextApiRequest {
  body: {
    type: 'collection-metadata' | 'tokens-metadata'
    collectionAddress: string,
    tokensId?: string[]
  }
}

apiRoute.post(async (req: ReqExtended, res) => {


  const { type, collectionAddress, tokensId } = req.body;
  
  const tezos = initTezosTK(true);

  if (type == 'collection-metadata') {
    let metadata = await getCollectionMetadata(tezos, collectionAddress);
    res.status(200).json(JSON.parse(metadata));

  } else if (type == "tokens-metadata" && tokensId) {
    
    let tokensMetadata = await getTokensMetadata(tezos, collectionAddress, tokensId)
    .catch((e) => {
      if (e.name == "TokenIdNotFound") {
        throwError("TOKEN_ID_NOT_FOUND")
      }
    })
    res.status(200).json({ tokensMetadata: tokensMetadata })
  } else {
    throwError("INVALID_REQ_TYPE")
  }

})
// apiRoute.post(async (req, res) => {

// });

export default apiRoute