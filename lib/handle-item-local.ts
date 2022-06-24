export default function handleItem(value: string) {

  let valueLocal = localStorage.getItem("contract-hashes")

  if (!valueLocal) {
    let hashes = [];
    hashes.push(value);
    localStorage.setItem("contract-hashes", JSON.stringify(hashes))
  } else {
    let hashes = JSON.parse(valueLocal)
    hashes.push(value);
    localStorage.setItem("contract-hashes", JSON.stringify(hashes))

  }

}