import initRoute from '../../../lib/init-route';
import initTezosTK from '../../../lib/tezos/init-tezos-tk';

const tezos = initTezosTK();

let apiRoute = initRoute((error, _, res) => {
  console.log(error.message)
  // if (error.message == "PINATA_AUTH_ERROR") {
  //   res.status(501).json({ type: error.message, message: "Pinata Authentication Error, please review your api keys." })
  // } else if (error.message == "JSON_METADATA_NOT_FOUND") {
  //   res.status(501).json({ type: error.message, message: "Metadata JSON File not found or wrong named." })
  // } else if (error.message == "INCONSISTENT_FILES") {
  //   res.status(501).json({ type: error.message, message: "The items in the Metadata JSON file do not match the selected files. Files are missing or names do not match." })
  // }
  // else {
  // }
  res.status(501).json({ type: "Uknow Error", message: "critical" })
});

apiRoute.get(async(req, res) => {

  let signerAddress = await tezos.signer.publicKeyHash()
  let balance = await tezos.tz.getBalance(signerAddress)

  res.status(200).json({address: signerAddress, balance: balance})
})
// apiRoute.post(async (req, res) => {
  
// });

export default apiRoute