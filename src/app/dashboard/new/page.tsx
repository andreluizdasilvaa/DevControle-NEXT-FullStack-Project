import { Container } from "@/components/container"
import Link from "next/link"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prismaClient from '@/lib/prisma'
import { redirect } from "next/navigation"

export default async function NewTicket() {
    const session = await getServerSession(authOptions)

    if(!session || !session.user) redirect('/')

    const costumers = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        }
    })

    async function handleRegisterTicket(formData: FormData) {
        "use server"

        const name = formData.get('name')
        const description = formData.get('description')
        const customerId = formData.get('customer')

        if(!name || !description || !customerId) {
            return;
        }

        await prismaClient.ticket.create({
            data: {
                name: name as string,
                description: description as string,
                customerId: customerId as string,
                status: "ABERTO",
                userId: session?.user.id
            }
        })

        redirect("/dashboard")
    }

    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="text-white px-4 py-1 rounded bg-gray-900">
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">Novo ticket</h1>
                </div>

                <form 
                    className="flex flex-col mt-6"
                    action={handleRegisterTicket}
                >
                    <label className="mb-1 font-medium text-lg">Nome do chamado</label>
                    <input 
                        type="text"
                        placeholder="Digite o nome do chamado"
                        required
                        disabled={costumers.length === 0}
                        className="w-full border-2 border-slate-300 rounded-md h-11 px-2 outline-none"
                        name="name"
                    />

                    <label className="mb-1 font-medium text-lg">Descreva o problema</label>
                    <textarea
                        placeholder="Digite o nome do chamado"
                        required
                        className="w-full border-2 border-slate-300 rounded-md h-24 px-2 outline-none resize-none"
                        disabled={costumers.length === 0}
                        name="description"
                    ></textarea>


                    {costumers.length !== 0 && (
                        <>
                            <label className="mb-1 font-medium text-lg">Selecione o cliente</label>
                            <select
                                className="w-full border-2 border-slate-300 bg-white rounded-md h-11 px-2 outline-none resize-none"
                                name="customer"
                            >
                                {costumers.map(client => (
                                    <option 
                                        key={client.id} 
                                        value={client.id}
                                    >
                                        {client.name}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    {costumers.length === 0 && (
                        <Link href="/dashboard/customer/new">
                            Você ainda não tem nenhum cliente, <span className="text-blue-500 font-medium">Cadastrar cliente</span>
                        </Link>
                    )}

                    <button
                        type="submit"
                        className="bg-blue-500 cursor-pointer text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={costumers.length === 0} // Se não tiver cliente bloqueia o botão
                    >
                        Cadastrar
                    </button>
                </form>
            </main>
        </Container>
    )
}
