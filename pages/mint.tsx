import axios, { AxiosRequestConfig } from "axios";
import Head from "next/head";
import Layout from "../components/layout";
import { FormEvent, useState } from "react";
import Error from "../components/error";
import Usage from "../components/usage";
import useModal from "../hooks/useModal";
import Transaction from "../components/transaction";
import { Uploader } from "../components/uploader";
import MintForm from "../components/mint-form";


export default function Mint() {

  // Form Logic 
  const [loadingTransaction, setLoadingTrasanction] = useState(false);
  const {
    isVisible: isVisibleModalTransaction,
    showModal: showModalTransaction,
    hideModal: hideModalTransaction
  } = useModal();
  const {
    isVisible: isVisibleModalError,
    showModal: showModalError,
    hideModal: hideModalError
  } = useModal();

  const [txHash, setTxHash] = useState("");

  const [fileExtension, setFileExtension] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [multipleFile, setMultipleFile] = useState(false);
  const [collectionAddress, setCollectionAdress] = useState("");
  const [paternName, setPatternName] = useState("");


  const [error, setError] = useState<{ type: string; message: string }>();


  const onChange = async (formData: FormData) => {

    const config: AxiosRequestConfig = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };
    await axios.post('/api/upload', formData, config);
  };

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingTrasanction(true);
    showModalTransaction();

    let collectionAddressParsed = collectionAddress.trim()
    let fileExtensionParsed = fileExtension.trim().replace(".", "").toLocaleLowerCase();
    let totalItemsNumber = parseInt(totalItems);

    const data = JSON.stringify({
      collectionAddress: collectionAddressParsed,
      multipleFile: multipleFile,
      fileExtension: fileExtensionParsed,
      totalItems: totalItemsNumber,
      patternName: paternName
    });

    const config: AxiosRequestConfig = {
      headers: { 'content-type': 'application/json' }
    }

    try {
      let response = await axios.post('/api/tezos/mint', data, config);

      setLoadingTrasanction(false)
      console.log("result mint process =>", response.data)
    } catch (e: any) {
      setError(undefined)
      hideModalTransaction();
      setLoadingTrasanction(false);
      setError(e.response.data);
      showModalError();

      setTimeout(() => {
        hideModalError();
      }, 40000);
    }

  }
  return (
    <Layout>
      <Head>
        <title>Mint Tokens</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen">
        {
          isVisibleModalError &&
          error &&
          (
            <Error
              hideModal={hideModalError}
              type={error.type}
              message={error.message}
            />
          )
        }
        {
          isVisibleModalTransaction && (
            <Transaction
              loadingTrasaction={loadingTransaction}
              hideModal={hideModalTransaction}
              message="The mint procces was successful."
              action="Call contract to Mint Nft..."
            />
          )
        }
        <main>
          <div className="antialiased text-gray-900 px-6">
            <div className="py-12 px-8">
              <h2 className="text-2xl font-bold">Mint Tokens</h2>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-16 py-4">
                <div>
                  <Uploader
                    onChange={onChange}
                    label="Select Files"
                    uploadFileName="theFiles"
                    allowMultipleFiles={true}
                    showCount={true}
                  />
                  <MintForm
                    handleOnSubmit={handleOnSubmit}
                    fileExtension={fileExtension}
                    setFileExtension={setFileExtension}
                    collectionAddress={collectionAddress}
                    setCollectionAdress={setCollectionAdress}
                    multipleFile={multipleFile}
                    setMultipleFile={setMultipleFile}
                    totalItems={totalItems}
                    setTotalItems={setTotalItems}
                    patternName={paternName}
                    setPatternName={setPatternName}
                  />
                </div>
                <Usage
                  parrafos={[
                    { text: "For images files note:", style: "underline" },
                    { text: "Image names must match the 'name' field of the item in the Metadata JSON file. You must pass the extension of the image files in the form." },
                    { text: "Files selection is recommended to do it in the fewest number of times possible. If you upload a duplicate file it will overwrite the previous one." },
                    { text: "For metadata there are two options:", style: "underline" },
                    { text: "-Single file", style: "italic" },
                    { text: "If your metadata file is single. Load it through the select files button, its mandatory name must be this 'metadata.json'. And in the form do not check the checkbox." },
                    { text: "-Multiple file", style: "italic" },
                    { text: "Otherwise, if it is multiple, check the form's checkbox. You must provide the total number of items in your collection. " },
                    { text: "Also pass the name pattern, for example if your metadata file is called 'Flower1.json', its pattern is 'Flower', or if it is 'Flower#1.json' the pattern is 'Flower#'." },
                    { text: "Note that index 0 is counted, so your collection must start with 'Item#0'." },
                    { text: "The image uri fields in the metadata file will be updated by createMe with the IPFS url 'ipfs://hash'. So they can be an empty string." },
                    { text: "The 'name' field is the only one required and must be the same as the image name for that item." }
                  ]}
                  children={
                    <div className="flex flex-col gap-2">
                      <span>Recommended metadata interface is TZIP-21.{" "}
                        <a className="text-blue-700 hover:underline" href="https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-21/tzip-21.md" target="_blank">
                          More information.
                        </a>
                      </span>
                      <span>
                        See here an example single {" "}
                      <a className="text-blue-700 hover:underline" href="/metadata-example.json" target="_blank">
                         Metadata JSON file
                      </a>.
                      </span>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}