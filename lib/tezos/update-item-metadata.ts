import { itemMetadata } from "../types";

export default function updateItemMetadata(cid: string, item: itemMetadata): string {
  let uriParsed = `ipfs://${cid}`

  item.artifactUri = uriParsed;
  item.displayUri = uriParsed;
  item.thumbnailUri = uriParsed;

  return JSON.stringify(item, undefined, 2);

}