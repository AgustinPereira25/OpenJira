import { DragEvent, useContext } from "react"
import { useRouter } from "next/router"
import { Card } from "@mui/material"
import CardActionArea from "@mui/material/CardActionArea"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { UIContext } from "../../context/ui"
import { Entry } from "../../interfaces"
import { dateFunctions } from '../../utils';



interface Props {
  entry: Entry;
}

export const EntryCard:React.FC<Props> = ({ entry }) => {


  const { startDragging, endDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (event: DragEvent ) => {
    event.dataTransfer.setData('text', entry._id);

    startDragging() //pone el boolean en true, en el UIContext.
  }

  const onDragEnd = (event: DragEvent) => {
    endDragging() //pone el boolean en false, en el UIContext.
  }

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      // Eventos de drag
      draggable
      onDragStart={ onDragStart }
      onDragEnd={ onDragEnd }
      onClick={ onClick }
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}> {entry.description} </Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'> { dateFunctions.getFormatDistanceToNow( entry.createdAt ) } </Typography>
        </CardActions>
      </CardActionArea>
      
    </Card>

  )
}

