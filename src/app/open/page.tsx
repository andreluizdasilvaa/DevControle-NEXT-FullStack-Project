"use client"

import React from "react"
import { Input } from "@/components/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { FiSearch, FiX } from 'react-icons/fi'
import { toast } from "sonner"

import { FormTicket } from "./components/formTicket"
import { api } from "@/lib/api"

const schema = z.object({
    email: z.string().email("Digite o email do cliente para localizar.").min(1, "O campo email é obrigatório")
})

type FormData = z.infer<typeof schema>

export interface CustomerDataInfo {
    id: string;
    name: string;
}

export default function Open() {
    const [customer, setCostumer] = React.useState<CustomerDataInfo | null>(null)

    const { register, handleSubmit, reset, setValue, setError, formState: { errors, isLoading } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    function handleClearCustomer() {
        setCostumer(null)
        setValue("email", "")
    }

    async function handleSearchCustomer(data: FormData) {
        try {
            const response = await api.get("/api/customer", {
                params: {
                    email: data.email
                }
            })

            toast.success("Email encontrado")
            setCostumer({
                id: response.data.id,
                name: response.data.name
            })
        } catch (error: any) {
            if(error?.response?.data?.error === "Muitas tentativas. Tente novamente mais tarde.") {
                toast.error("Muitas tentativas. Tente novamente mais tarde.")
                reset();
                return;
            }
            toast.error("Email não encontrado")
            setError("email", { type: "custom", message: "Cliente não foi encontrado"})
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-2">
            <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>

            <main className="flex flex-col mt-4 mb-2">
                {customer ? (
                    <div className="flex items-center justify-between bg-slate-50 py-3 px-3 rounded border-2 border-slate-100 shadow-md">
                        <p className="text-lg"><strong>Cliente selecionado: </strong>{customer.name}</p>

                        <button onClick={handleClearCustomer} className="h-8 px-1 flex items-center justify-center rounded cursor-pointer">
                            <FiX size={30} color="#e31d1d" />
                        </button>
                    </div>
                ) : (
                    <form
                        className="bg-slate-50 py-6 px-2 rounded border-2 border-slate-100 shadow-md"
                        onSubmit={handleSubmit(handleSearchCustomer)}
                    >
                        <div className="flex flex-col gap-3">
                            <Input 
                                name="email"
                                placeholder="Digite o email do cliente..."
                                type="text"
                                error={errors.email?.message}
                                register={register}
                            />

                            <button 
                                disabled={isLoading}
                                type="submit"
                                className="bg-blue-500 flex flex-row gap-3 px-2 h-11 items-center justify-center text-white font-bold rounded cursor-pointer disabled:bg-blue-200 disabled:cursor-progress"
                            >
                                Procurar cliente
                                <FiSearch size={24} color="#fff" />
                            </button>
                        </div>
                    </form>
                )}

                {customer !== null && (
                    <FormTicket customer={customer} />
                )}
            </main>
        </div>
    )
}