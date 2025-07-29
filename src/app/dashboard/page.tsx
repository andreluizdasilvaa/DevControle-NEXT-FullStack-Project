import { Container } from "@/components/container"
import Link from "next/link"
import { Ticket } from "./components/ticket"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import PrismaClient from "@/lib/prisma"
import { redirect } from "next/navigation"
import { ButtonRefresh } from "./components/buttonRefresh"

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if(!session || !session.user) redirect("/")

    const tickets = await PrismaClient.ticket.findMany({
        where: {
            status: "ABERTO",
            customer: {
                userId: session.user.id
            }
        },
        include: {
            customer: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Chamados</h1>
                    <div className="flex items-center gap-3">
                        <ButtonRefresh />
                        <Link href="/dashboard/new" className="bg-blue-500 px-4 py-1 rounded text-white">
                            Abrir chamado
                        </Link>
                    </div>
                </div>

                <div className="p-2 rounded bg-slate-200 mt-2">
                    <table className="w-full my-2 p-">
                        <thead>
                            <tr>
                                <th className="font-medium text-left pl-1">CLIENTE</th>
                                <th className="font-medium text-left pl-1 hidden sm:table-cell">DATA CADASTRO</th>
                                <th className="font-medium text-left pl-1">STATUS</th>
                                <th className="font-medium text-left pl-1">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(ticket => (
                                <Ticket 
                                    key={ticket.id}
                                    ticket={ticket}
                                    customer={ticket.customer}
                                />
                            ))}
                        </tbody>
                    </table>
                    {tickets.length === 0 && (
                        <p className="w-full text-center text-gray-500 font-medium">Você não tem chamados abertos</p>
                    )}
                </div>
            </main>
        </Container>
    )
}