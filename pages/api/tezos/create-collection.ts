import { NextApiResponse } from 'next/types';
import initRoute from "../../../lib/init-route";
import { createCollection } from '../../../lib/tezos/create-collection';
import initTezosTK from '../../../lib/tezos/init-tezos-tk';

const tz = initTezosTK();

const metadataDefault =  {
    name: "",
    description: "",
    homepage: '',
    authors: [],
    version: '1.0.0',
    license: { name: 'MIT' },
    interfaces: ['TZIP-016', 'TZIP-012', 'TZIP-021'],
    source: {
      tools: ['LIGO'],
      location: ''
    },
    exhibition: {
      date: "",
      topic: "",
      location: ""
    }
  };

let apiRoute = initRoute((e, _, res) => {
  res.status(501).json(JSON.stringify(e))
});

interface RequestExtended extends NextApiResponse {
  body: {
    metadata: {
      name: string;
      description: string;
      homepage: string;
      authors: string;
      license: string;
      version: string;
    },
    exhibition: {
      date: string;
      topic: string;
      location: string;
    }
  }
}


apiRoute.post(async (req: RequestExtended, res) => {

  const { metadata: reqMetadata, exhibition } = req.body;
  const authors = reqMetadata.authors.replace(" ", "").split(",")

  if (reqMetadata.homepage === "") {
    reqMetadata.homepage = `https://creatMe.io/collection/${reqMetadata.name}`
  }

  const metadata = {
    ...metadataDefault,
    name: reqMetadata.name,
    description: reqMetadata.description,
    homepage: reqMetadata.homepage,
    authors: authors,
    license: reqMetadata.license,
    version: reqMetadata.version,
    source: reqMetadata.homepage,
    exhibition: {
      ...exhibition
    }
  }

  let hash = await createCollection(tz, JSON.stringify(metadata))

  res.status(200).json({ contractHash: hash })

})

export default apiRoute