import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="flex flex-wrap items-center justify-between w-full px-8 border-b-2">

      <div className="container flex flex-wrap gap-10 justify-around items-center my-4">
        <Link href="/">
          <a className="text-2xl font-medium">CreatMe</a>
        </Link>
        <Link href="/new">
          <a className="hover:text-emerald-500 text-lg hover:scale-105 duration-200">New Project</a>
        </Link>
        <Link href="/mint">
          <a className="hover:text-emerald-500 text-lg hover:scale-105 duration-200">Mint</a>
        </Link>
        <Link href="/transfer">
          <a className="hover:text-emerald-500 text-lg hover:scale-105 duration-200">Transfer</a>
        </Link>
        <Link href="/show">
          <a className="hover:text-emerald-500 text-lg hover:scale-105 duration-200">Show</a>
        </Link>
      </div>
    </nav>
  )
}