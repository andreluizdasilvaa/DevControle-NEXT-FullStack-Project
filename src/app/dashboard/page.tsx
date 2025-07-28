import { Container } from "@/components/container"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect('/')
    }

    return (
        <Container>
            <h1>teste dash</h1>
        </Container>
    )
}