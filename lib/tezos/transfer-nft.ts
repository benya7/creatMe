import { TezosToolkit } from '@taquito/taquito';
import { TransferBatch, tezosApi, runMethod } from "@oxheadalpha/fa2-interfaces"

export default async function transferNft(
  tz: TezosToolkit,
  contract: string,
  batch: TransferBatch
): Promise<void> {

  const nftContract = (await tezosApi(tz as any).at(contract)).withFa2();

  console.log('transferring tokens...');
  await runMethod(nftContract.transferTokens(batch.transfers));
  console.log('tokens transferred');
}