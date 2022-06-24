import { ReactNode } from "react";
import Image from 'next/image'
import Navbar from "./navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main> {children} </main>
      <footer className="flex h-24 w-full items-center justify-center border-t">
        <div className="flex flex-col gap-2 items-center">
          <a
            className="flex items-center justify-center gap-2"
            href="https://tezos.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <Image src="/tezos-logo-1.svg" alt="Tezos Logo" width={72} height={32} />
          </a>
          <a
            href="https://github.com/en0c-026"
            target="_blank"
            className="text-xs hover:underline hover:text-cyan-400 hover:rotate-180 duration-500"
          >
            by en0c-26
          </a>
        </div>
      </footer>
    </>
  )
}