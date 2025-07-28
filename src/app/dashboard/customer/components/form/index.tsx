"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/input"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const scheme = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    email: z.string().email("Digite um email valido").min(1, "O email é obrigatório"),
    phone: z.string().refine((value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, { 
        message: "O numero de telegone deve estar (DD) 123456789"
    }),
    address: z.string(),
})

type FormData = z.infer<typeof scheme>

export function NewCustomerForm({ userId }: { userId: string }) {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(scheme)
    })

    async function handleRegister(data: FormData) {
        try {
            const response = await api.post('/api/customer', {
                name: data.name,
                phone: data.phone,
                email: data.email,
                address: data.address,
                userId: userId
            })
            
            toast.success("Cliente cadastrado com sucesso!")
            router.refresh()
            router.replace('/dashboard/customer')
        } catch (error) {
            toast.error("Erro ao cadastrar cliente")
        }
    }

    return (
        <form 
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col mt-6"
        >
            <label className="mb-1 text-lg font-medium">Nome completo</label>
            <Input 
                name="name" 
                placeholder="Digite o nome completo" 
                register={register} 
                type="text" 
                error={errors.name?.message}
            />

            <section className="flex gap-2 flex-col sm:flex-row my-2">
                <div className="flex flex-col flex-1">
                    <label className="mb-1 text-lg font-medium">Telefone</label>
                    <Input 
                        name="phone" 
                        placeholder="Digite seu telefone" 
                        register={register} 
                        type="text" 
                        error={errors.phone?.message}
                    />
                </div>

                <div className="flex flex-col flex-1">
                    <label className="mb-1 text-lg font-medium">Email</label>
                    <Input 
                        name="email" 
                        placeholder="Digite seu email" 
                        register={register} 
                        type="text" 
                        error={errors.email?.message}
                    />
                </div>
                
            </section>

            <label className="mb-1 text-lg font-medium">Endereço completo</label>
            <Input 
                name="address" 
                placeholder="Digite endereço do cliente" 
                register={register} 
                type="text" 
                error={errors.address?.message}
            />

            <button
                className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold cursor-pointer"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </button>
        </form>
    )
}
