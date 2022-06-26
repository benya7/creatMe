# Usage

## New Project
Create a new NFT collection. Following the Tezos standards.

Generates an FA2 Contract, meets the following interfaces:

-TZIP-016

-TZIP-012

-TZIP-021

You can configure all available fields in the form.

Below if you wish you can complete the details of the art exibithion.

The 'authors' field accepts more than one value separated by ','. For example: 'banski, Quasimondo'

After clicking the Submit button, the contract implementation is executed.

Contract address becomes available so you can save the address for later use in the Mint and Transfers process.

In the event that you have not been able to save the address of the contract, it will be saved in LocalStorage of your browser, if that happens look for it there with the key 'contract-hashes'

## Mint
For images files note:

Image names must match the 'name' field of the item in the Metadata JSON file. You must pass the extension of the image files in the form.

Files selection is recommended to do it in the fewest number of times possible. If you upload a duplicate file it will overwrite the previous one.

For metadata there are two options:

-Single file

If your metadata file is single. Load it through the select files button, its mandatory name must be this 'metadata.json'. And in the form do not check the checkbox.

-Multiple file

Otherwise, if it is multiple, check the form's checkbox. You must provide the total number of items in your collection.

Also pass the name pattern, for example if your metadata file is called 'Flower1.json', its pattern is 'Flower', or if it is 'Flower#1.json' the pattern is 'Flower#'.

Note that index 0 is counted, so your collection must start with 'Item#0'.

The image uri fields in the metadata file will be updated by createMe with the IPFS url 'ipfs://hash'. So they can be an empty string.

The 'name' field is the only one required and must be the same as the image name for that item.

Recommended metadata interface is TZIP-21. More information.
See here an example single Metadata JSON file.

## Transfer
Transfers have two options:

-Without file:

You must check the form checkbox, then a form will be enabled.

Configure from Address and then you can add Destinations, input Destination Address and Token Id with Add Destinations button.

Below the form you will see a list of destinations, you can also clear the list with the Clear button.

-With file:

You must upload the file through the Select File Transfers button.

The required file name must be 'transfers.json'

Its interface is a collection of elements in JSON Format with the following fields:

from: string; to: string; tokenId: number

See an example of 'transfers.json' here.

## Show