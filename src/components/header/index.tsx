"use client"

import Link from "next/link"
import { FiUser, FiLogOut, FiLoader, FiLogIn } from 'react-icons/fi'
import { signIn, signOut, useSession } from "next-auth/react"

export function Header() {
    const { data, status } = useSession()

    async function handleLogin() {
        await signIn();
    }

    async function handleLogout() {
        await signOut();
    }

    return (
        <header className="w-full flex items-center py-4 bg-white h-20 shadow-sm">
            <div className="w-full flex items-center justify-between max-w-7xl mx-auto px-4">
                <h1 className="font-bold text-2xl text-black hover:tracking-widest duration-300 cursor-cell">
                    <span className="text-blue-500">DEV </span>
                    CONTROLE
                </h1>

                {status === 'loading' && (
                    <button className="animate-spin cursor-progress">
                        <FiLoader size={26} color="#4b5563" />
                    </button>
                )}

                {status === 'unauthenticated' && (
                    <button className="flex transition-all duration-100 hover:scale-105 items-center justify-center gap-2 font-medium text-[#4b5563] cursor-pointer" onClick={handleLogin}>
                        <FiLogIn size={26} color="#4b5563" />
                        Acessar
                    </button>
                )}

                {status === "authenticated" && (
                    <div className="flex items-baseline gap-6">
                        <Link href="/dashboard">
                            <FiUser size={26} color="#4b5563" />
                        </Link>
                        <button className="cursor-pointer" onClick={handleLogout}>
                            <FiLogOut size={26} color="#d92626" />
                        </button>
                    </div>
                )}

            </div>
        </header>
    )
}
