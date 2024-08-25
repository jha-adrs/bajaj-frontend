"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Toaster } from "@/components/ui/sonner"

interface ProvidersProps {
    children: React.ReactNode
}

const client = new QueryClient()
export const Providers = ({ children }: ProvidersProps) => {
    return (
        <QueryClientProvider client={client}>
            {children}
            <Toaster theme='dark' richColors />
        </QueryClientProvider>
    )
}