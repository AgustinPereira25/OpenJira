import { useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {


    //const [isAdding, setIsAdding] = useState(false);
    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext) 

    const [inputValue, setInputValue] = useState('');

    const [touched, setTouched] = useState(false);

    const onTextFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const { addNewEntry } = useContext(EntriesContext)

    const onSave = () => {
        if (inputValue.length === 0) return;
        addNewEntry(inputValue)

        //setIsAdding(false)
        setIsAddingEntry(false) //Se pasó el add tarea a UIContext 
        setInputValue('')
        setTouched(false)        
    }

    const onCancel = () => {
        // setIsAdding(false)
        setIsAddingEntry(false)
        setInputValue('')
        setTouched(false)
    }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2}}>
        {
            // isAdding ? (
            isAddingEntry ? (
                <>
                    <TextField 
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        placeholder= 'Nueva entrada'
                        autoFocus
                        multiline
                        label='Nueva entrada'
                        helperText={ inputValue.length <= 0  && touched && 'Ingrese un valor'}
                        error= { inputValue.length <= 0  && touched ? true : false }
                        value={ inputValue }
                        onChange={ onTextFieldChanged }
                        onBlur={ () => setTouched(true) }
                    />

                    <Box display='flex' justifyContent='space-between' >

                        <Button
                            variant='text' 
                            // onClick={ () => setIsAdding( false )}
                            onClick= { onCancel }
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant='outlined' 
                            color='secondary'
                            endIcon= { <SaveOutlinedIcon /> }
                            onClick= { onSave }
                        >
                            Guardar
                        </Button>
                    </Box>
                </>
            ) : (
                <Button
                    startIcon={ <AddCircleOutlineOutlinedIcon/> }
                    fullWidth
                    variant='outlined'
                    //onClick={ () => setIsAdding( true ) }
                    onClick={ () => setIsAddingEntry( true ) }

                >
                    Agregar tarea
                </Button>
            )
        }
    </Box>
  )
}
