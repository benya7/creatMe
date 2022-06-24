import { TokenMetadataInternal, createOffChainTokenMetadata } from '@oxheadalpha/fa2-interfaces';
import { char2Bytes } from '@taquito/utils';
import BigNumber from 'bignumber.js';

export default function parseTokens(
  descriptor: string,
  tokens: TokenMetadataInternal[]
): TokenMetadataInternal[] {
  const [id, tokenMetadataUri] = descriptor.split(',').map(p => p.trim());

  if (!id || !tokenMetadataUri)
    throw new Error(
      `Invalid token format: ${descriptor}. It should be 'id, metadataUri'`
    );

  const token = createOffChainTokenMetadata(
    new BigNumber(id),
    tokenMetadataUri
  );
  token.token_info.set('', char2Bytes(tokenMetadataUri));
  return [token].concat(tokens);
}