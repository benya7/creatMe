import { ReactNode } from "react";

interface UsageProps {
  parrafos: { text: string; style?: string }[];
  children?: ReactNode
}

export default function Usage({
  parrafos,
  children
}: UsageProps) {
  return (
    <div className="flex flex-col rounded-xl bg-gray-200 p-8 gap-2 text-sm h-fit">
      <span className="text-xl font-bold pb-2 pl-2">Usage</span>
      {
        parrafos.map((parrafo, i) => (
          <p key={i} className={parrafo.style}>
            {parrafo.text}
          </p>
        ))
      }
      {
        children
      }
    </div>
  )
}