import Head from "next/head";
import { FormEvent, useState } from "react";
import Layout from "../components/layout";
import useModal from "../hooks/useModal";
import Error from "../components/error";
import Transaction from "../components/transaction";
import Usage from "../components/usage";
import Image from "next/image";
import axios, { AxiosRequestConfig } from "axios";
import TransferForm from "../components/transfer-form";
import { CollectionMetadata, ItemMetadata } from "../lib/types";
import EntryMetadataCollection, { ItemArray, ItemString } from "../components/entry-metadata-collection";

export default function Show() {
  const [loadingTransaction, setLoadingTrasanction] = useState(false);
  const {
    isVisible: isVisibleModalTransaction,
    showModal: showModalTransaction,
    hideModal: hideModalTransaction
  } = useModal();
  const {
    isVisible: isVisibleModalToken,
    showModal: showModalTokenInfo,
    hideModal: hideModalTokenInfo
  } = useModal();
  const {
    isVisible: isVisibleModalError,
    showModal: showModalError,
    hideModal: hideModalError
  } = useModal();
  const [error, setError] = useState<{ type: string; message: string }>();

  const [collectionMetadata, setCollectionMetadata] = useState<CollectionMetadata>()
  const [collectionAddress, setCollectionAddress] = useState("");
  const [tokensId, setTokensId] = useState("");
  const [tokensIdParsed, setTokensIdParsed] = useState<string[]>();
  const [tokensMetadata, setTokensMetadata] = useState<ItemMetadata[]>();
  const [tokenSelected, setTokenSelected] = useState<ItemMetadata>();
  const handleTokensId = (ids: string) => {
    let idsParsed = ids.replace(/[a-zA-Z]+$/, "")

    let _tokensIdParsed = idsParsed.trim().split(",")
    let uniqueChars = _tokensIdParsed.filter((element, index) => {
      return _tokensIdParsed.indexOf(element) === index;
    });
    setTokensId(uniqueChars.toString())
    setTokensIdParsed(uniqueChars);
  }

  const getTokensMetadata = async () => {
    setTokensMetadata(undefined)
    setLoadingTrasanction(true);
    showModalTransaction();
    const data = JSON.stringify({
      collectionAddress: collectionAddress,
      type: 'tokens-metadata',
      tokensId: tokensIdParsed
    });
    const config: AxiosRequestConfig = {
      headers: { 'content-type': 'application/json' },
    }
    try {
      let response = await axios.post('/api/tezos/', data, config);
      setTokensMetadata(response.data.tokensMetadata)
      console.log(response.data.tokensMetadata)
      setLoadingTrasanction(false)
      hideModalTransaction();
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

  const getMetadataCollection = async () => {
    setCollectionMetadata(undefined)
    setTokensMetadata(undefined)
    setTokenSelected(undefined)
    setTokensId("")
    setLoadingTrasanction(true);
    showModalTransaction();
    const data = JSON.stringify({
      collectionAddress: collectionAddress,
      type: 'collection-metadata'
    });
    const config: AxiosRequestConfig = {
      headers: { 'content-type': 'application/json' },
    }

    try {
      let response = await axios.post('/api/tezos/', data, config);
      setCollectionMetadata(response.data)
      console.log(response.data)
      setLoadingTrasanction(false)
      hideModalTransaction();
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
        <title>Show Collection - creatMe</title>
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
              message=""
              action="Loading..."
            />
          )
        }{
          tokenSelected &&
          isVisibleModalToken &&
          (
            <TokenInfo
              token={tokenSelected}
              hideModal={hideModalTokenInfo}
            />
          )
        }
        <main>
          <div className="antialiased text-gray-900 px-6">
            <div className="py-12 px-10">
              <h2 className="text-2xl font-bold pb-2 border-b border-gray-500">Show Collection</h2>
              <div className="flex flex-col sm:px-20 gap-16 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <label className="block" htmlFor="collectionAddress">
                    <span className="text-gray-700">Collection Address</span>
                    <div className="flex items-center gap-2 justify-center">
                      <input
                        type="text"
                        name="collectionAddress"
                        id="collectionAddress"
                        value={collectionAddress}
                        onChange={(e) => {
                          setTokensMetadata(undefined)
                          setCollectionMetadata(undefined)
                          setCollectionAddress(e.target.value.trim())
                        }}
                        className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <button
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-50 rounded-xl px-3 py-2 mt-1 disabled:bg-slate-400"
                        disabled={collectionAddress === "" || collectionAddress.length < 36}
                        onClick={() => getMetadataCollection()}>Show</button>
                    </div>
                  </label>
                  {
                    collectionMetadata &&
                    collectionMetadata.name && (
                      <div className="flex flex-col bg-slate-100 rounded-xl min-h-fit py-4 px-5">
                        <h2 className="font-semibold mb-2 self-center">Collection Metadata</h2>
                        {
                          Object.entries(collectionMetadata).map((item, i) => (
                            <EntryMetadataCollection
                              key={i}
                              item={item}
                            />
                          ))
                        }

                      </div>
                    )
                  }
                  <label className="block" htmlFor="tokensId">
                    <span className="text-gray-700">Search Tokens</span>
                    <div className="flex items-center gap-2 justify-center">
                      <input
                        type="text"
                        name="tokensId"
                        id="tokensId"
                        value={tokensId}
                        placeholder="Example: 0,1,2"
                        onChange={(e) => handleTokensId(e.target.value)}
                        className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <button
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-50 rounded-xl px-3 py-2 mt-1 disabled:bg-slate-400"
                        disabled={tokensId === "" || collectionAddress === ""}
                        onClick={() => getTokensMetadata()}
                      >
                        Search
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 pl-1"><span className="underline">Note:</span> Enter the ids separated by ',' . Example: 0,1,2</p>
                  </label>
                  {
                    tokensMetadata && (
                      <div className="flex flex-col gap-4 bg-slate-100 rounded-xl min-h-fit py-4 px-5">
                        <span className="font-semibold self-center">Tokens List</span>
                        <div className="grid grid-cols-4">
                          {
                            tokensMetadata.map((item, i) => (
                              <TokenCard
                                key={i}
                                token={item}
                                showModal={showModalTokenInfo}
                                setTokenSelected={setTokenSelected}
                              />
                            ))
                          }
                        </div>
                      </div>
                    )
                  }
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}


const TokenCard = ({
  token,
  showModal,
  setTokenSelected
}: {
  token: ItemMetadata;
  showModal: () => void;
  setTokenSelected: (token: ItemMetadata) => void
}) => {
  return (
    <div className="flex flex-col items-center bg-slate-300 border border-slate-700 rounded-xl h-40 w-32">
      <div className="h-24 w-24 mt-2">
        <Image src={`https://ipfs.io/ipfs/${token.displayUri.slice(7)}`} width="100" height="100" />
      </div>
      <p className="font-semibold text-md">{token.name}</p>
      <button
        className="bg-emerald-500 text-sm hover:bg-emerald-400 text-slate-50 rounded-xl px-3 mt-1 disabled:bg-slate-400"
        onClick={() => {
          setTokenSelected(token)
          showModal()
        }}
      >
        View
      </button>
    </div>
  )
}

const TokenInfo = ({
  token,
  hideModal
}: {
  token: ItemMetadata;
  hideModal: () => void;
}) => {
  return (
    <div className="fixed z-10 bg-contain inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-screen">
      <div className="flex min-h-screen items-center justify-center">

        <div className="flex flex-col border border-gray-600 items-center rounded-xl p-4 bg-slate-100  text-black text-sm">
          <div className="flex border-b border-slate-400 w-full justify-center pb-1">
            <span className="font-semibold text-lg">Token Metadata</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 mt-2">
              <Image src={`https://ipfs.io/ipfs/${token.displayUri.slice(7)}`} width="100" height="100" />
            </div>
            <div className="py-2">
              {
                Object.entries(token).map((item, i) => (
                  <EntryItem
                    key={i}
                    item={item}
                  />
                ))
              }
            </div>
            <button
              className="bg-red-600 px-4 py-1 rounded-md text-slate-100"
              onClick={hideModal}>
              Close
            </button>


          </div>
        </div>
      </div >
    </div >
  )
}

const EntryItem = ({ item }: { item: [string, any] }) => {
  if (
    typeof item[1] === "string"
    && item[1].length > 0
    && item[0] !== "artifactUri"
    && item[0] !== "thumbnailUri"
  ) {
    return <ItemString itemKey={item[0]} value={item[1]} />
  } else if (item[0] === "attributes" && item[1].length > 0) {
    return (
      <div>
        <p className="underline px-1">attributes</p>
        {
          (item[1] as { name: string; value: string }[]).map((value, i) => (
            <ItemString itemKey={value.name} value={value.value} />
          ))
        }
      </div>
    )
  } else if (Array.isArray(item[1]) && item[1].length > 0) {
    return <ItemArray itemKey={item[0]} values={item[1]} />
  }
  else {
    return <p>{" "}</p>
  }
}