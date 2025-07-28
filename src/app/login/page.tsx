"use client"

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'

export default function Login() {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session) {
            router.push('/dashboard')
        }
    }, [session, router])

    async function handleGoogleSignIn() {
        await signIn('google', {
            callbackUrl: '/dashboard'
        })
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="cursor-cell font-bold text-4xl text-black hover:tracking-widest duration-300">
                        <span className="text-blue-500">DEV </span>
                        CONTROLE
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Faça login para gerenciar seus projetos
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            Bem-vindo de volta!
                        </h2>
                        <p className="text-gray-600">
                            Entre com sua conta Google para continuar
                        </p>
                    </div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full cursor-pointer flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:shadow-md"
                    >
                        <FcGoogle size={24} />
                        Continuar com Google
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Ao continuar, você concorda com nosso
                            <Link href="#" className="text-blue-500 hover:underline">
                                Termos de Serviço
                            </Link>
                            e
                            <Link href="#" className="text-blue-500 hover:underline">
                                Política de Privacidade
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <Link
                        href="/"
                        className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
                    >
                        ← Voltar para a página inicial
                    </Link>
                </div>
            </div>
        </div>
    )
}
