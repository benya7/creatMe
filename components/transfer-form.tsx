import axios, { AxiosRequestConfig } from "axios";
import { FormEvent, useState } from "react";
import { Uploader } from "./uploader";

interface FormProps {
  handleOnSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  collectionAddress: string;
  setCollectionAddress: (value: string) => void;
  withoutFile: boolean;
  setWithoutFile: (value: boolean) => void;
  from: string;
  setFrom: (value: string) => void;
  addDestination: (to: string, tokenId: number) => void;
  clearListDest: () => void;
}

export default function TransferForm({
  handleOnSubmit,
  collectionAddress,
  setCollectionAddress,
  withoutFile,
  setWithoutFile,
  from,
  setFrom,
  addDestination,
  clearListDest

}: FormProps) {

  const [to, setTo] = useState("")
  const [tokenId, setTokenId] = useState<number>();


  const handleOnClickAddDest = () => {
    if (to === "" || !tokenId) return;

    addDestination(to, tokenId);
    setTo("")
    setTokenId(Number.NaN)
  }

  const onChange = async (formData: FormData) => {

    const config: AxiosRequestConfig = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };
    await axios.post('/api/upload', formData, config);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-4 py-6 border-t border-gray-500">
          <div className="border-b">
            <span className="text-lg text text-gray-900 ml-4">Transfer Details</span>
          </div>


          <label className="block" htmlFor="collectionAddress">
            <span className="text-gray-700">Collection Contract Address</span>
            <input
              type="text"
              id="collectionAddress"
              name="collectionAddress"
              required
              value={collectionAddress}
              onChange={(e) => setCollectionAddress(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
          <label className="block" htmlFor="withoutFile">
            <div className="flex flex-row gap-4">
              <span className="text-gray-700">Transfers will be done without file?</span>
              <input
                type="checkbox"
                id="withoutFile"
                name="withoutFile"
                checked={withoutFile}
                onChange={() => setWithoutFile(!withoutFile)}
                className="mt-1 block rounded-full border-black border-2"
                placeholder=""
              />
            </div>
          </label>
          {
            !withoutFile && (
            <Uploader
              label="Select File Transfers"
              onChange={onChange}
              uploadFileName="theFiles"
              allowMultipleFiles={false}
              acceptedFileTypes=".json"
              showCount={false}
            />
            )
          }
          {
            withoutFile && (
              <div className="grid grid-cols-1 gap-4" >
                <label className="block" htmlFor="from">
                  <span className="text-gray-700">From Address</span>
                  <input
                    type="text"
                    id="from"
                    name="from"
                    required
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder=""
                  />
                </label>
                <label className="block" htmlFor="to">
                  <span className="text-gray-700">Destination Address</span>
                  <input
                    type="text"
                    name="to"
                    id="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
                <label className="block" htmlFor="tokenId">
                  <span className="text-gray-700">TokenId</span>
                  <input
                    type="number"
                    min={0}
                    name="tokenId"
                    id="tokenId"
                    value={tokenId}
                    onChange={(e) => {
                      if (!e.target.value) return
                      setTokenId(parseInt(e.target.value))
                    }
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
                <div className="flex flex-1 gap-2 justify-around">
                  <button className="px-2 py-1 rounded-lg text-sm bg-cyan-600 hover:bg-cyan-700 text-slate-50 disabled:bg-slate-500" onClick={handleOnClickAddDest} type='button' disabled={to == "" || !tokenId}>
                    Add Destination
                  </button>
                  <button className="px-2 py-1 rounded-lg text-sm bg-orange-600 hover:bg-orange-700 text-slate-50 disabled:bg-slate-500" onClick={clearListDest} type='button'>
                    Clear List
                  </button>
                </div>
              </div>
            )
          }
        </div>


        <button className="mt-2 px-4 py-2 border bg-emerald-300 rounded-xl hover:bg-emerald-500" type="submit">Submit</button>
      </div>
    </form>
  )
}