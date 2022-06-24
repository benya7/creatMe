import cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { ErrorHandler } from "next-connect";

export default function initRoute(onError: ErrorHandler<NextApiRequest, NextApiResponse>) {
  const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
  };

  let apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError,
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });

  apiRoute.use(cors(options));

  return apiRoute;
}
