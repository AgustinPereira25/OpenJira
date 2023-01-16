import React, { DragEvent, useContext, useMemo } from 'react'
import { List, Paper } from '@mui/material'
import { EntriesContext } from '../../context/entries';
import { EntryStatus } from '../../interfaces'
import { EntryCard } from './EntryCard'
import { UIContext } from '../../context/ui';
import styles from './EntryList.module.css';


interface Props {
  status: EntryStatus;
}

export const EntryList: React.FC<Props> = ({ status }) => {

  const { entries, updateEntry } = useContext( EntriesContext );
  
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(() => entries.filter( entry => entry.status === status ) , [ entries ])
  
  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');

    const entry =  entries.find( e => e._id === id )!; // el signo de ! es para aclarar que siempre lo voy a encontrar, no va a fallar la funcion
    entry.status = status;
    updateEntry(entry);
    endDragging(); // para que no quede la pantalla agrisada.
  }


  return (
    // TODO: aqui haremos drop
    <div
      onDrop={ onDropEntry  }
      onDragOver={ allowDrop }
      className= { isDragging ? styles.dragging : '' }
    >
        <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'auto', backgroundColor:'transparent', padding: '1px 5px'}}>
          {/* todo: cambiará dependiendo si estoy haciendo drag o no */}
            <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
              {
                entriesByStatus.map( entry => (
                  <EntryCard key= {entry._id } entry={ entry } />
                ))
              }
             
            </List>
        </Paper>
    </div>
  )
}
