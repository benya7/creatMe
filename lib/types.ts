export interface itemMetadata {
  decimals: number,
  isBooleanAmount: boolean,
  name: string,
  description: string,
  tags: string[],
  minter: string,
  artifactUri: string,
  displayUri: string,
  thumbnailUri: string,
  creators: string[],
  rights: string,
  attributes: {
    name: string,
    value: string
  }[]
}