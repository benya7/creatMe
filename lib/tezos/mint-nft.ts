import { TezosToolkit } from '@taquito/taquito';
import { TokenMetadataInternal, tezosApi, runMethod } from '@oxheadalpha/fa2-interfaces'

export default async function mintNft(
  tz: TezosToolkit,
  collection: string,
  tokens: TokenMetadataInternal[]
): Promise<void> {
  const ownerAddress = await tz.signer.publicKeyHash();
  const nftContract = (await tezosApi(tz as any).at(collection))
    .asNft()
    .withMint();

  console.log("minting tokens...")
  await runMethod(nftContract.mint([{ owner: ownerAddress, tokens }]));
  console.log("tokens minted!")
}