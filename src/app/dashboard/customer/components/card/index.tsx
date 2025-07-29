"use client"

import { CustomerProps } from "@/utils/customer.type"
import { toast } from "sonner"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"

export function CardCustumer({ customer }: { customer: CustomerProps }) {
    const router = useRouter()
    async function handleDeleteCustomer() {
        try {
            await api.delete('/api/customer', {
                params: {
                    id: customer.id
                }
            })
            router.refresh()
            toast.success('Deletado com sucesso!')
        } catch (error: any) {
            if(error?.response?.data?.error) {
                toast.error("Este cliente ainda tem chamados abertos")
                return;
            }
            toast.error("Erro ao deletar cliente")
        }
    }

    return (
        <article className="flex flex-col bg-gray-50 p-2 rounded-lg gap-2 transition-all duration-100 hover:scale-101 hover:bg-gray-100">
            <h2>
                <a className="font-bold">Nome:</a> {customer.name}
            </h2>
            <p><a className="font-bold">Email:</a> {customer.email}</p>
            <p><a className="font-bold">Telefone:</a> {customer.phone}</p>

            <button 
                onClick={handleDeleteCustomer}
                className="cursor-pointer bg-red-500 px-4 rounded text-white mt-2 self-start"
            >
                Deletar
            </button>
        </article>
    )
}
