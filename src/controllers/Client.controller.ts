import { Request, RequestHandler, Response } from 'express';

import { Client } from '../model/Client';
import { ClientContact } from '../model/ClientContact';

import { Website } from '../model/website';

export class Clients {
  GetClientById: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const client = await Client.scope('full').findByPk(id);
    return res.send(client);
    /* const allClient: Client[] = await Client.findAll({});
    const allWebsite: Website[] = await Website.findAll({});

    return res
      .status(200)
      .json({
        message: 'Client data fetched',
        data: allClient,
        website: allWebsite,
      }); */
  };
}
export const ClientController: Clients = new Clients();
