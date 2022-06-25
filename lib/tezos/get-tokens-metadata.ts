import { TezosToolkit } from '@taquito/taquito';
import { tezosApi } from '@oxheadalpha/fa2-interfaces'
import { TokenMetadata } from '@taquito/tzip12'
export async function getTokensMetadata(
  tz: TezosToolkit,
  contract: string,
  tokens: string[]
): Promise<TokenMetadata[]> {

  const tokenIds = tokens.map(t => Number.parseInt(t));

  const fa2Contract = (await tezosApi(tz as any).at(contract)).withFa2();

  console.log('querying token metadata...');
  const tokensMeta = await fa2Contract.tokensMetadata(tokenIds);

  return tokensMeta;
}
