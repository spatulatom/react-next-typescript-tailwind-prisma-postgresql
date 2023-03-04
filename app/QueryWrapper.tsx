"use client"

import React, { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "react-hot-toast"



interface Props {
  children?: ReactNode
}

function QueryWrapper ({ children }: Props){

  const [queryClient] = React.useState(() => new QueryClient())
 return( 
  <QueryClientProvider client={queryClient}>
    <Toaster />
    {children}
  </QueryClientProvider>)
}

export default QueryWrapper
