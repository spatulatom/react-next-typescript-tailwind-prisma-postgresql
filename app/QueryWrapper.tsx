"use client"

import React, { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

interface Props {
  children?: ReactNode
}

const QueryWrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    {children}
  </QueryClientProvider>
)

export default QueryWrapper
