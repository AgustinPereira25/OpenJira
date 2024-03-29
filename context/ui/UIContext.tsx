import { createContext } from 'react';


interface contextProps{
     sidemenuOpen: boolean;
     isAddingEntry: boolean;
     isDragging: boolean;
     
     //Methods
     openSideMenu: () => void,
     closeSideMenu: () => void,

     setIsAddingEntry: (isAddingEntry: boolean) => void,

     startDragging: () => void,
     endDragging: () => void,
}

export const UIContext = createContext({} as contextProps)