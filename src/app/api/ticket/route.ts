import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/lib/auth";
import PrismaClient from '@/lib/prisma'

// Atualizar status do Ticket para "FECHADO"
export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions)

    if(!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 })
    }

    // Pego id vindo do body
    const { id } = await request.json()

    if(!id) return NextResponse.json({ error: "Failed, id is required" }, { status: 400 })

    const findTicket = await PrismaClient.ticket.findFirst({
        where: {
            id: id as string
        }
    })

    if(!findTicket) {
        return NextResponse.json({ error: "Failed update ticket" }, { status: 400 })
    }

    try {
        await PrismaClient.ticket.update({
            where: {
                id: id as string
            },
            data: {
                status: 'FECHADO'
            }
        })

        return NextResponse.json({ error: "Chamado atualizado com sucesso!" })
    } catch (error) {
        return NextResponse.json({ error: "Failed update ticket" }, { status: 400 })
    }
}

// Cria um ticket com o usuário sem authenticação.
export async function POST(request: Request) {
    const { customerId, name, description } = await request.json()

    if(!customerId || !name || !description) {
        return NextResponse.json({ error: "Failed create new ticket" }, { status: 400 })
    }

    try {
        await PrismaClient.ticket.create({
            data: {
                name,
                customerId,
                description,
                status: "ABERTO"
            }
        })

        return NextResponse.json({ message: "Cadastrado com sucesso" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Failed create new ticket" }, { status: 400 })
    }
}