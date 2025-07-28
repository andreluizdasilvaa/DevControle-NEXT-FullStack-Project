import { Container } from "@/components/container"
import { CardCustumer } from "./components/card"
import Link from "next/link"
import PrismaClient from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Customer() {
    const session = await getServerSession(authOptions)
        
    if (!session || !session.user) {
        redirect('/login')
    }

    const costumers = await PrismaClient.customer.findMany({
        where: {
            userId: session.user.id
        }
    })


    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Meus clientes</h1>
                    {costumers.length > 0 && (
                        <Link href="/dashboard/customer/new" className="bg-blue-500 text-white px-4 py-1 rounded">  
                            Novo cliente
                        </Link>
                    )}
                    
                </div>

                <section 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-gray-200 gap-2 p-4 rounded mt-2 min-h-16"
                >
                    {costumers.length <= 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center h-full min-h-16">
                            <span className="text-gray-600 text-lg mb-4 font-bold">Você ainda não tem clientes</span>
                            <Link href="/dashboard/customer/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">  
                                Criar novo cliente
                            </Link>
                        </div>
                    )}
                    {costumers.map(client => (
                        <CardCustumer key={client.id} customer={client} />
                    ))}
                </section>
            </main>
        </Container>
    )
}