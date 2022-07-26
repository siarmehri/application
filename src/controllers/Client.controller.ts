import { Request, RequestHandler, Response } from 'express';

import { Client } from '../model/Client';

import { Website } from '../model/website';

export class Clients {
  getAll: RequestHandler = async (req, res, next) => {
    const allClient: Client[] = await Client.findAll({});
    const allWebsite: Website[] = await Website.findAll({});

    return res
      .status(200)
      .json({
        message: 'Client data fetched',
        data: allClient,
        website: allWebsite,
      });
  };
}
export const ClientController: Clients = new Clients();
