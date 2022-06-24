import BigNumber from "bignumber.js";
import { TransferBatch } from "@oxheadalpha/fa2-interfaces"
export default function addTransfer(
  description: string,
  batch: TransferBatch
): TransferBatch {
  const [from, to, tokenId] = description.split(',').map(p => p.trim());
  return batch.withTransfer(from, to, new BigNumber(tokenId), 1);
}