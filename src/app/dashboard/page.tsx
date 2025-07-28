import { Container } from "@/components/container"
import Link from "next/link"
import { Ticket } from "./components/ticket"

export default async function Dashboard() {
    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Chamados</h1>
                    <Link href="/dashboard/new" className="bg-blue-500 px-4 py-1 rounded text-white">
                        Abrir chamado
                    </Link>
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
                            <Ticket />
                            <Ticket />
                        </tbody>
                    </table>
                </div>
            </main>
        </Container>
    )
}