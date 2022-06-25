import { TezosToolkit } from '@taquito/taquito';
import path from 'path';
import readFile from "../read-file"
import { createNftStorage } from '@oxheadalpha/tznft/dist/nft-util'
import { originateContract } from '@oxheadalpha/tezos-tools';

export async function createCollection(
  tz: TezosToolkit,
  metadata: string,
): Promise<string> {

  const ownerAddress = await tz.signer.publicKeyHash();
  const code = await readFile(path.join(process.cwd(), 'lib/tezos/fa2_nft_asset.tz'))
    .catch((e) => {
      throw new Error("FAILED_CONTRACT_FILE_READ");
    });

  const storage = createNftStorage(ownerAddress, metadata);

  console.log(('originating new NFT contract...'));
  const contract = await originateContract(tz as any, code, storage, 'nft');

  return contract.address
}