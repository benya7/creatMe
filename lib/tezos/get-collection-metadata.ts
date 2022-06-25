import { createNftStorage } from '@oxheadalpha/tznft/dist/nft-util';
import { TezosToolkit } from '@taquito/taquito';
import { bytes2Char } from '@taquito/utils';
import throwError from '../throw-error';
export default async function getCollectionMetadata(
  tz: TezosToolkit,
  contract: string,
): Promise<string> {

  const collectionContract: any = await tz.contract.at(contract)
    .catch(() => throwError("INVALID_CONTRACT_ADDRESS"));

  let storage: ReturnType<typeof createNftStorage> = await collectionContract.storage();
  let metadataBytes = await storage.metadata.get("content");
  let metadata = "";
  if (metadataBytes) {
    metadata = bytes2Char(metadataBytes);
  } else {
    throwError("COLLECTION_METADATA_NOT_FOUND");
  }
  return metadata;

}