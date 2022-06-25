import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>creatMe - Make your custom Tezos NFT Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col pt-40">
        <main className="flex w-full flex-col items-center justify-center px-20 text-center">
          <h1 className="text-3xl font-semibold">
            CreatMe
          </h1>
          <p className="mt-3">
            Make your custom Tezos NFT Collection. Setup mechanism of distribution.
          </p>

          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-8 sm:w-full">
            <Link href='/new'>
              <a className='px-4 py-2 rounded-2xl text-lg bg-slate-900 text-slate-50 hover:scale-105 hover:bg-slate-700'>Get Started</a>
            </Link>
            <a href='https://github.com/en0c-026/creatMe/blob/master/USAGE.md' target="_blank" className='px-4 py-2 rounded-2xl text-lg bg-slate-900 text-slate-50 hover:scale-105 hover:bg-slate-700'>Read Docs</a>

          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Home
