import { TezosToolkit } from '@taquito/taquito';
import path from 'path';
import readFile from "../read-file"
import { createNftStorage } from '@oxheadalpha/tznft/dist/nft-util'
import { originateContract } from '@oxheadalpha/tezos-tools';
import throwError from '../throw-error';
import getConfig from 'next/config';


export async function createCollection(
  tz: TezosToolkit,
  metadata: string,
): Promise<string> {
  const { serverRuntimeConfig } = getConfig()
  const ownerAddress = await tz.signer.publicKeyHash();
  const fullPath = path.join(serverRuntimeConfig.PROJECT_ROOT, 'fa2_nft_asset.tz')
  const code = await readFile(fullPath)
    .catch((e) => {
      console.error(e)
      throw new Error("FAILED_READ_CONTRACT_FILE");
    });

  const storage = createNftStorage(ownerAddress, metadata);

  console.log(('originating new NFT contract...'));
  const contract = await originateContract(tz as any, code, storage, 'nft')
    .catch((e) => {
      console.error(e)
      throw new Error("FAILED_DEPLOY_CONTRACT");
    });

  return contract.address
}