import { Container } from "@/components/container"
import Link from "next/link"

export function DashboardHeader() {
    return (
        <Container>
            <header className="w-full bg-gray-900 my-4 p-3 rounded flex gap-4">
                <Link className="text-white hover:underline" href="/dashboard">
                    Chamados
                </Link>
                <Link className="text-white hover:underline" href="/dashboard/customer">
                    Clientes
                </Link>
            </header>
        </Container>
    )
}
