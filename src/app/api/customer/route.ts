import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth' 
import prismaClient from '@/lib/prisma'

// -- /api/customer - POST
export async function POST(request: Request) {
    // Verifica se o usuário está logado para acessar essa rota
    const session = await getServerSession(authOptions)
    if(!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 })
    }

    // Pega os dados do body
    const { name, email, phone, address, userId } = await request.json()

    try {
        // cadastra no prisma
        await prismaClient.customer.create({
            data: {
                name, 
                email, 
                phone,
                address: address ? address : "",
                userId
            }
        })

        // retorna msg de sucesso
        return NextResponse.json({ message: "cliente cadastrado com sucesso!" })

    } catch (error) {
        return NextResponse.json({ error: "Failed create new customer" }, { status: 401 })
    }
}


// Deletar um costumer
export async function DELETE(request:Request) {
    // Verifica se o usuário está logado para acessar essa rota
    const session = await getServerSession(authOptions)
    if(!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    // Pegando o paramentro da url: /api/customer?id=123
    const userId = searchParams.get('id') // 123

    if(!userId) {
        return NextResponse.json({ error: "Failed, id required" }, { status: 400 })
    }

    const findTickets = await prismaClient.ticket.findFirst({
        where: {
            customerId: userId
        }
    })
    
    // Se o cliente que queremos deletar estiver em um chamado com status em aberto, retorna erro
    if(findTickets) {
        return NextResponse.json({ error: "Failed, client has a open ticket" }, { status: 400 })
    }
    
    try {
        await prismaClient.customer.delete({
            where: {
                id: userId as string
            }
        })

        return NextResponse.json({ message: "Cliente deletado com sucesso!" })
    } catch (error) {
        return NextResponse.json({ error: "Failed delete customer" }, { status: 500 })
    }
}