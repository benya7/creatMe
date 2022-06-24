import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="flex flex-row h-16 w-full px-8 items-center justify-between border-b-2">
      <Link href="/">
        <a className="text-2xl font-medium">CreatMe</a>
      </Link>
      <div className="flex flex-1 gap-10 justify-center">
        <Link href="/new">
          <a className="hover:text-emerald-500 text-lg hover:scale-105 duration-200">New Project</a>
        </Link>
        <Link href="/mint">
          <a className="hover:text-emerald-500 text-lg hover:scale-105 duration-200">Mint</a>
        </Link>
        <Link href="/transfer">
          <a className="hover:text-emerald-500 text-lg hover:scale-105 duration-200">Transfer</a>
        </Link>
      </div>
    </nav>
  )
}