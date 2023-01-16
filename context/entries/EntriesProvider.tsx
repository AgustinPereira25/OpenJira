import { useEffect, useReducer } from 'react';
import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { SnackbarProvider, useSnackbar } from 'notistack'

export interface EntriesState {
    entries: Entry[];

}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [],

}

interface Props{
    children: React.ReactNode
}

export const EntriesProvider: React.FC<Props> = ({ children }) => {


    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async( description:string ) => {

        const { data } = await entriesApi.post<Entry>('/entries', { description: description });
        dispatch({ type:'[Entry] Add-Entry', payload: data});
    
        
    }

    const updateEntry = async({ _id, description, status }: Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {description: description, status: status});
            //data: es la entrada actualizada con los datos nuevos
            dispatch({ type: '[Entry] Entry-Updated', payload: data });
            if ( showSnackbar ){
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                });
            }




        } catch (error) {
            console.log({ error })
        }
    
    }

    const getEntry = async( { _id }:Entry ) => {
        try {
            const { data } = await entriesApi.get<Entry>(`/entries/${_id}`);
            //data: es la entrada con los datos solicitados
            dispatch({ type: '[Entry] Get-Entry', payload: data });
 
        } catch (error) {
            console.log(error);
        }
    }

    const deleteEntry = async({ _id }: Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${_id}`);
            //data: es la entrada actualizada con los datos nuevos
            dispatch({ type: '[Entry] Entry-Deleted', payload: data });
            if ( showSnackbar ){
                enqueueSnackbar('Entrada eliminada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                });
            }

        } catch (error) {
            console.log({ error })
        }
    
    }

    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch( { type: '[Entry] Refresh-Data', payload: data } ); 
    } 

    useEffect(() => {
      refreshEntries();
    }, []);
    
    
  return (

   <EntriesContext.Provider value={{
       ...state,

       //Methods
       addNewEntry,
       updateEntry,
       getEntry,
       deleteEntry,
   }}>
        { children }
   </EntriesContext.Provider>
  )
}