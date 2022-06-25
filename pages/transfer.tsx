import Head from "next/head";
import { FormEvent, useState } from "react";
import Layout from "../components/layout";
import useModal from "../hooks/useModal";
import Error from "../components/error";
import Transaction from "../components/transaction";
import Usage from "../components/usage";
import axios, { AxiosRequestConfig } from "axios";
import TransferForm from "../components/transfer-form";

export default function Transfer() {
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
  const [error, setError] = useState<{ type: string; message: string }>();

  const [withoutFile, setWithoutFile] = useState(false);
  const [from, setFrom] = useState("");
  const [collectionAddress, setCollectionAdress] = useState("");
  const [destinations, setDestinations] = useState<{ to: string; tokenId: number }[]>([]);

  const addDestination = (to: string, tokenId: number) => {
    setDestinations(prev => [...prev, { to: to, tokenId: tokenId }])
  }
  const clearListDest = () => {
    setDestinations([]);
  }

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingTrasanction(true);
    showModalTransaction();

    let collectionAddressParsed = collectionAddress.trim()


    const data = JSON.stringify({
      collectionAddress: collectionAddressParsed,
      withoutFile: withoutFile,
      from: from,
      destinations: destinations
    });

    const config: AxiosRequestConfig = {
      headers: { 'content-type': 'application/json' }
    }

    try {
      let response = await axios.post('/api/tezos/transfer', data, config);

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
        <title>Transfer NFT Tokens - creatMe</title>
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
              message="The transfers process was successful."
              action="Call contract to Transfer Nft..."
            />
          )
        }
        <main>
          <div className="antialiased text-gray-900 px-6">
            <div className="py-12 px-8">
              <h2 className="text-2xl font-bold pb-2 border-b border-gray-500">Transfer NFT Tokens </h2>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-16 py-4">
                <div>
                  <TransferForm
                    handleOnSubmit={handleOnSubmit}
                    collectionAddress={collectionAddress}
                    setCollectionAddress={setCollectionAdress}
                    withoutFile={withoutFile}
                    setWithoutFile={setWithoutFile}
                    from={from}
                    setFrom={setFrom}
                    addDestination={addDestination}
                    clearListDest={clearListDest}
                  />
                  {
                    withoutFile &&
                    destinations.length > 0 && (
                      <div className="grid grid-cols-1 mt-4 gap-2 ">
                        <span className="text-gray-700">Destination List</span>
                        <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          {
                            destinations.map((destination, i) => (
                              <li key={i} className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">

                                <div className="flex gap-2 justify-between">
                                  <span className="text-xs">{destination.to}</span>
                                  <span className="text-xs">{destination.tokenId}</span>
                                </div>
                              </li>
                            ))
                          }

                        </ul>
                      </div>
                    )
                  }
                </div>
                <Usage
                  parrafos={[
                    { text: "Transfers have two options:", style: 'underline'},
                    { text: "-Without file:", style: "italic" },
                    { text: "You must check the form checkbox, then a form will be enabled." },
                    { text: "Configure from Address and then you can add Destinations, input Destination Address and Token Id with Add Destinations button." },
                    { text: "Below the form you will see a list of destinations, you can also clear the list with the Clear button." },
                    { text: "-With file:", style: "italic"},
                    { text: "You must upload the file through the Select File Transfers button." },
                    { text: "The required file name must be 'transfers.json'" },
                    { text: "Its interface is a collection of elements in JSON Format with the following fields:" },
                    { text: "from: string;   to: string;   tokenId: number", style: "italic" },


                  ]}
                  children={
                    <div>
                      <a href='/transfers-example.json' className="text-blue-700 hover:underline" target='_blank'>See an example of 'transfers.json' here.</a>
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