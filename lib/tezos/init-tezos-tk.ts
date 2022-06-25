import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
export default function initTezosTK(withSigner?: boolean): TezosToolkit {
  const tezos = new TezosToolkit(process.env.TEZOS_RPC_URL!);
  if (withSigner) {
    tezos.setProvider({
      signer: new InMemorySigner(process.env.WALLET_TEZOS_PK!)
    })
  }
  return tezos;
}