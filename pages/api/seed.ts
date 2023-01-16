import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database';
import { Entry } from '../../models';
import { seedData } from '../../database';


/**
 * 
 *  NOTA: ESTE ARCHIVO DEBE EXCLUIRSE EN PRODUCCIÓN ya que borraria todas las entradas y crearia las entradas
 * de prueba..
 */
type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    if (process.env.NODE_ENV === 'production'){
        return res.status(401).json({ message: 'No tiene acceso a este servicio. ' });
    }
    
    await db.connect();
    await Entry.deleteMany();
    await Entry.insertMany( seedData.entries );
    await db.disconnect();

    res.status(200).json({ message: 'Proceso realizado correctamente.' });
}