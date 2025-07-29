"use client"

import { Input } from "@/components/input"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { api } from "@/lib/api"
import { CustomerDataInfo } from "../../page"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const schema = z.object({
    name: z.string().min(1, "O nome do chamado é obrigatório").max(190, "Maximo de 190 caracteres"),
    description: z.string().min(1, "A descrição é obrigatória").max(190, "Maximo de 190 caracteres")
})

type FormData = z.infer<typeof schema>

export function FormTicket({ customer }: { customer: CustomerDataInfo }) {
    const router = useRouter()
    const { register, handleSubmit, reset, formState: { errors, isLoading }} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    async function handleRegisterTicket(formData: FormData) {
        try {
            await api.post("/api/ticket", {
                name: formData.name,
                description: formData.description,
                customerId: customer.id
            })
            reset()
            toast.success("Chamado cadasrado com sucesso!")
            router.refresh()
        } catch (error) {
            toast.error("Erro ao cadastrar chamado")
        }
    }

    return (
        <form
            className="bg-slate-50 mt-6 px-4 py-6 rounded border-2 border-slate-200 shadow-lg"
            onSubmit={handleSubmit(handleRegisterTicket)}
        >
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <Input 
                register={register}
                type="text"
                placeholder="Digite o nome do chamado..."
                name="name"
                error={errors.name?.message}
            />

            <label className="mb-1 font-medium text-lg">Descrição do chamado</label>
            <textarea
                className="w-full border-2 rounded-md h-24 resize-none px-2 border-slate-200 bg-white outline-none"
                placeholder="Descreva seu problema"
                id="description"
                {...register("description")}
            ></textarea>
            {errors.description?.message && (<p className="text-red-500 mt-1 mb-4">{errors.description?.message}</p>)}

            <button 
                disabled={isLoading}
                type="submit"
                className="bg-blue-500 disabled:bg-blue-200 rounded-md w-full h-11 px-2 text-white font-bold cursor-pointer"
            >
                Cadastrar
            </button>
        </form>
    )
}