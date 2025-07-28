"use client"

import { SessionProvider, SessionProviderProps } from 'next-auth/react'

export const AuthProviders = ({ children }: SessionProviderProps) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}