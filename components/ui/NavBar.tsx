import { useContext } from 'react';

import NextLink from 'next/link';

import { AppBar, Link, IconButton, Toolbar, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { UIContext } from '../../context/ui';

export const NavBar = () => {

  const { openSideMenu } = useContext( UIContext )
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          onClick={ openSideMenu }
        >
          <MenuOutlinedIcon />
        </IconButton>
        {/* Link causa error hydration */}
        <NextLink href={ '/' } passHref color='white'  >
            {/* <Link> */}
              <Typography color='white' variant='h6'>OpenJira</Typography>
            {/* </Link> */}
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}
