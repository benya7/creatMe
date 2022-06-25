export const ItemString = ({ itemKey, value }: { itemKey: string; value: string }) => {
  if (value && value.length > 0) {
    return (
      <div className="flex gap-1 justify-between items-center border px-1">
        <p className="underline">{itemKey}:</p>
        <p className="text-blue-700 text-right">{value}</p>
      </div>
    )
  } else {
    return <p>{" "}</p>
  }
}
export const ItemArray = ({ itemKey, values }: { itemKey: string; values: string[] }) => {
  return (
    <div className="flex gap-1 justify-between items-center border px-1">
      <p className="underline">{itemKey}:</p>
      <ul>
        {
          values.map((value, i) => (
            <li key={i}>
              {
                <p className="italic text-blue-700">{value}</p>
              }
            </li>
          ))
        }
      </ul>
    </div>
  )
}


export default function EntryMetadataCollection({ item }: { item: [string, any] }) {
  if (item[0] === 'name') {
    return <ItemString itemKey={item[0]} value={item[1]} />
  } else if (item[0] === 'description') {
    return <ItemString itemKey={item[0]} value={item[1]} />
  } else if (item[0] === 'homepage') {
    return <ItemString itemKey={item[0]} value={item[1]} />
  } else if (item[0] === 'authors') {
    return <ItemArray itemKey={item[0]} values={item[1]} />
  } else if (item[0] === 'version') {
    return <ItemString itemKey={item[0]} value={item[1]} />
  } else if (item[0] === 'license') {
    return <ItemString itemKey={item[0]} value={item[1].name} />
  } else if (item[0] === 'interfaces') {
    return <ItemArray itemKey={item[0]} values={item[1]} />

  } else if (item[0] === 'exhibition') {
    return (
      <div>
        <p className="underline px-1">exhibition details:</p>
        <ItemString itemKey="date" value={item[1].date} />
        <ItemString itemKey="topic" value={item[1].topic} />
        <ItemString itemKey="location" value={item[1].location} />
      </div>
    )
  } else {
    return <p>{" "}</p>
  }
}