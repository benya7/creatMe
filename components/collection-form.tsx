import { FormEvent } from "react";
import getDate from "../lib/get-date";

interface FormProps {
  handleOnSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  name: string;
  setName: (value: string) => void
  description: string;
  setDescription: (value: string) => void;
  homepage: string;
  setHomePage: (value: string) => void;
  authors: string;
  setAuthors: (value: string) => void;
  version: string;
  setVersion: (value: string) => void;
  license: string;
  setLicense: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  topic: string;
  setTopic: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
}

export default function CollectionForm({
  handleOnSubmit,
  name,
  setName,
  description,
  setDescription,
  homepage,
  setHomePage,
  authors,
  setAuthors,
  version,
  setVersion,
  license,
  setLicense,
  date,
  setDate,
  topic,
  setTopic,
  location,
  setLocation
}: FormProps) {
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-4 py-6">
          <div className="border-b">
            <span className="text-lg text text-gray-900 ml-4">Collection Metadata</span>
          </div>
          <label className="block" htmlFor="name">
            <span className="text-gray-700">Name</span>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
          <label className="block" htmlFor="description">
            <span className="text-gray-700">Description</span>
            <textarea
              id="description"
              name="description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={3}
            ></textarea>
          </label>
          <label className="block" htmlFor="homepage">
            <span className="text-gray-700">Home Page</span>
            <input
              type="text"
              id="homepage"
              name="homepage"
              value={homepage}
              onChange={(e) => setHomePage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
          <label className="block" htmlFor="authors">
            <span className="text-gray-700">Authors/Organization Name</span>
            <input
              type="text"
              id="authors"
              name="authors"
              required
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="banski, Quasimondo"
            />
          </label>
          <label className="block" htmlFor="version">
            <span className="text-gray-700">Version</span>
            <input
              type="text"
              id="version"
              name="version"
              required
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
          <label className="block" htmlFor="license">
            <span className="text-gray-700">License</span>
            <input
              type="text"
              id="license"
              name="license"
              required
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
        </div>
        <div className="grid grid-cols-1 gap-4 pt-6 border-t border-gray-500">
          <div className="border-b">
            <span className="text-lg text ml-4 text-gray-900">Exhibition Details</span>
          </div>
          <label className="block" htmlFor="date">
            <span className="text-gray-700">When is your event?</span>
            <input
              type="date"
              id="date"
              name="date"
              required
              min={getDate()}
              max="2038-01-01"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block" htmlFor="topic">
            <span className="text-gray-700">What is the topic of the exhibition?</span>
            <input
              type="text"
              id="topic"
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
              placeholder=""
            />
          </label>
          <label className="block" htmlFor="location">
            <span className="text-gray-700">Where is the event?</span>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
              placeholder=""
            />
          </label>
        </div>
        {/* <label className="block" htmlFor="extension">
          <span className="text-gray-700">What is the extension files?</span>
          <input
            type="text"
            id="extension"
            name="extension"
            required
            value={extension}
            onChange={(e) => setExtension(e.target.value.toLowerCase())}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
            placeholder="Example: png"
          />
        </label> */}

        <button className="mt-2 px-4 py-2 border bg-emerald-300 rounded-xl hover:bg-emerald-500" type="submit">Submit</button>
      </div>
    </form>
  )
}