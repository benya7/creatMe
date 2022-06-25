import axios, { AxiosRequestConfig } from "axios";
import Head from "next/head";
import Layout from "../components/layout";
import { FormEvent, useEffect, useState } from "react";
import Error from "../components/error";
import Usage from "../components/usage";
import CollectionForm from "../components/collection-form";
import useModal from "../hooks/useModal";
import Transaction from "../components/transaction";
import handleItem from "../lib/handle-item-local";

export default function New() {

  // CollectionForm Logic 
  const [loadingTransaction, setLoadingTrasanction] = useState(false);
  const { isVisible, showModal, hideModal } = useModal();
  const [contractHash, setContractHash] = useState("");
  // Collection metadata
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [homepage, setHomePage] = useState("");
  const [authors, setAuthors] = useState("");
  const [version, setVersion] = useState("1.0.0");
  const [license, setLicense] = useState("MIT");

  // Exhibition details
  const [date, setDate] = useState("");
  const [topic, setTopic] = useState("");
  const [location, setLocation] = useState("");
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

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingTrasanction(true);
    showModalTransaction();

    const data = JSON.stringify({
      metadata: {
        name: name,
        description: description,
        homepage: homepage,
        authors: authors,
        version: version,
        license: license
      },
      exhibition: {
        date: date,
        topic: topic,
        location: location
      }
    });

    const config: AxiosRequestConfig = {
      headers: { 'content-type': 'application/json' }
    };

    try {
      let response = await axios.post('/api/tezos/create-collection', data, config);
      let hash = response.data.contractHash;
      setContractHash(hash)
      handleItem(hash)

      setLoadingTrasanction(false);
      console.log("contract hash =>", response.data)
    } catch (e: any) {

      hideModalTransaction();
      setLoadingTrasanction(false);
      setError(e.response.data);
      showModalError();

      setTimeout(() => {
        setError(undefined)
      }, 40000);
    }

  }

  return (
    <Layout>
      <Head>
        <title>Create New Collection - creatMe</title>
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
              message="The contract deployment was successful."
              hash={{ type: "contract", value: contractHash }}
              action="Deploying NFT collection contract..."
            />
          )
        }
        <main>
          <div className="antialiased text-gray-900 px-6">
            <div className="py-12 px-8">
              <h2 className="text-2xl font-bold pb-2 border-b border-gray-500">Create New Art Project</h2>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-16 py-4">
                <CollectionForm
                  handleOnSubmit={handleOnSubmit}
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                  homepage={homepage}
                  setHomePage={setHomePage}
                  authors={authors}
                  setAuthors={setAuthors}
                  version={version}
                  setVersion={setVersion}
                  license={license}
                  setLicense={setLicense}
                  date={date}
                  setDate={setDate}
                  topic={topic}
                  setTopic={setTopic}
                  location={location}
                  setLocation={setLocation}
                />
                <Usage
                parrafos={[
                    { text: "Create a new NFT collection. Following the Tezos standards." },
                    { text: "Generates an FA2 Contract, meets the following interfaces:" },
                    { text: "-TZIP-016", style: "italic font-semibold" },
                    { text: "-TZIP-012", style: "italic font-semibold" },
                    { text: "-TZIP-021", style: "italic font-semibold" },
                    { text: "You can configure all available fields in the form." },
                    { text: "Below if you wish you can complete the details of the art exibithion." },
                    { text: "The 'authors' field accepts more than one value separated by ','. For example: 'banski, Quasimondo'" },
                    { text: "After clicking the Submit button, the contract implementation is executed."},
                    { text: "Contract address becomes available so you can save the address for later use in the Mint and Transfers process."},
                    { text: "In the event that you have not been able to save the address of the contract, it will be saved in LocalStorage of your browser, if that happens look for it there with the key 'contract-hashes'"}

                ]}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}