import React from "react"
import Head from "next/head"
import { Box } from "@mui/material"
import { NavBar, SideBar } from "../ui"



interface Props{
    title?:string,
    children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ title = 'OpenJira', children }) => {
  return (
    <Box sx={{ flexFlow: 1}}>
        <Head>
          <title> { title } </title>
        </Head>

        <NavBar />
        <SideBar />

        <Box sx={{ padding: '10px 20px' }}>
            { children }
        </Box>
    </Box>
    // <p>aa</p>
  )
}
