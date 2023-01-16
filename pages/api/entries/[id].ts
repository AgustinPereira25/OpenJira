import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
| { message: string }
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    // console.log(req.query);
    const { id } = req.query; //Estos query siempre son strings.

    if ( !mongoose.isValidObjectId( id ) ){
        return res.status(400).json({ message: 'El id no es valido ' + id });
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry( req, res );
    
        case 'GET':
            return getEntry( req, res); 

        case 'DELETE':
            return deleteEntry( req, res);

        default:
            return res.status(400).json({ message: 'Metodo no existe' });
    }
}



const updateEntry = async( req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById( id );

    if ( !entryToUpdate ){
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese id: ' + id})
    }
    
    const {
        description = entryToUpdate.description, //Si viene la descripcion la uso, si no viene uso entryToUpdate (la que ya estaba ingresada)
        status = entryToUpdate.status,
    } = req.body;


    try {
        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status}, { runValidators: true, new:true })  
        await db.disconnect();
        res.status(200).json( updatedEntry! );

    } catch (error: any) {
        console.log({ error })
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message });

    }

    // const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status}, { runValidators: true, new:true })
    //Otra manera de hacerlo.
    // entryToUpdate.description = description;
    // entryToUpdate.status = status;
    // entryToUpdate.save();
}

const getEntry = async( req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect();
    const entryToGet = await Entry.findById( id );
    await db.disconnect();

    if ( !entryToGet ){
        return res.status(400).json({ message: 'No hay entrada con ese id: ' + id})
    }

    return res.status(200).json( entryToGet! );
}

const deleteEntry = async( req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect();

    const entryToDelete = await Entry.findById( id );

    if ( !entryToDelete ){
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese id: ' + id})
    }


    try {
        const deletedEntry = await Entry.findByIdAndDelete( id, { runValidators: true, new:true })  
        await db.disconnect();
        res.status(200).json( deletedEntry! );

    } catch (error: any) {
        console.log({ error })
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message });

    }

    // const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status}, { runValidators: true, new:true })
    //Otra manera de hacerlo.
    // entryToUpdate.description = description;
    // entryToUpdate.status = status;
    // entryToUpdate.save();
}
