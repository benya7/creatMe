export interface ItemMetadata {
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
};

export interface CollectionMetadata {
  name: string;
  description?: string;
  homepage?: string;
  authors?: string[];
  version?: string;
  license?: { name?: string };
  interfaces?: string[];
  source?: {
    tools?: string[];
    location?: string;
  },
  exhibition?: {
    date?: string;
    topic?: string;
    location?: string;
  }
}