import { FormEvent } from "react";
import getDate from "../lib/get-date";

interface FormProps {
  handleOnSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  fileExtension: string;
  setFileExtension: (value: string) => void
  collectionAddress: string;
  setCollectionAdress: (value: string) => void;
  multipleFile: boolean;
  setMultipleFile: (value: boolean) => void;
  totalItems: string;
  setTotalItems: (value: string) => void;
  patternName: string;
  setPatternName: (value: string) => void;

}

export default function MintForm({
  handleOnSubmit,
  fileExtension,
  setFileExtension,
  totalItems,
  setTotalItems,
  multipleFile,
  setMultipleFile,
  collectionAddress,
  setCollectionAdress,
  patternName,
  setPatternName
}: FormProps) {
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-4 py-6 border-t-2 ">
          <div className="border-b">
            <span className="text-lg text text-gray-900 ml-4">Mint Details</span>
          </div>

          <label className="block" htmlFor="collectionAddress">
            <span className="text-gray-700">Collection Contract Address</span>
            <input
              type="text"
              id="collectionAddress"
              name="authors"
              required
              value={collectionAddress}
              onChange={(e) => setCollectionAdress(e.target.value)}
              className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
          <label className="block" htmlFor="fileExtension">
            <span className="text-gray-700">What is the extension of images files?</span>
            <input
              type="text"
              id="fileExtension"
              name="fileExtension"
              value={fileExtension}
              required
              onChange={(e) => setFileExtension(e.target.value)}
              className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Example: png"
            />
          </label>
          <label className="block" htmlFor="multipleFile">
            <div className="flex flex-row gap-4">

              <span className="text-gray-700">Metadata file items collections is mutliple?</span>
              <input
                type="checkbox"
                id="multipleFile"
                name="multipleFile"
                checked={multipleFile}
                onChange={() => setMultipleFile(!multipleFile)}
                className="mt-1 block rounded-full border-black border-2"

              />
            </div>
          </label>
          {
            multipleFile && (
              <label className="block" htmlFor="totalItems">
                <span className="text-gray-700">Total items in the collection</span>
                <input
                  type="text"
                  id="totalItems"
                  name="totalItems"
                  value={totalItems}
                  required
                  onChange={(e) => setTotalItems((e.target.value))}
                  className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder=""
                />
              </label>
            )
          }

          {
            multipleFile && (
              <label className="block" htmlFor="patternName">
                <span className="text-gray-700">Collection item name pattern</span>
                <input
                  type="text"
                  id="patternName"
                  name="patternName"
                  value={patternName}
                  required
                  onChange={(e) => setPatternName((e.target.value))}
                  className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Example: Flower#"
                />
              </label>
            )
          }
        </div>

        <button className="mt-2 px-4 py-2 border bg-emerald-300 rounded-xl hover:bg-emerald-500" type="submit">Submit</button>
      </div>
    </form>
  )
}