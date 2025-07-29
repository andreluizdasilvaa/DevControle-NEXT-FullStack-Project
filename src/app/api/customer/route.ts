import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'
import { rateLimit, getClientIdentifier } from '@/lib/rateLimit'
import { z } from 'zod'

// Schema de validação para o email
const emailSchema = z.object({
    email: z.string().email("Email inválido").min(1, "Email é obrigatório")
})

// Lista o customer com base no email dele
export async function GET(request: Request) {
    // RATE LIMITING
    const clientId = getClientIdentifier(request);
    const rateLimitResult = rateLimit(clientId, 10, 60000); // 10 requests por minuto

    if (!rateLimitResult.success) {
        return NextResponse.json(
            { 
                error: "Muitas tentativas. Tente novamente mais tarde.",
                retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
            }, 
            { 
                status: 429,
                headers: {
                    'X-RateLimit-Limit': '10',
                    'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
                    'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
                    'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
                }
            }
        )
    }

    const { searchParams } = new URL(request.url)
    const customerEmail = searchParams.get('email')

    if (!customerEmail) {
        return NextResponse.json({ error: "Email é obrigatório" }, { status: 400 })
    }

    // VALIDAÇÃO DE INPUT
    try {
        emailSchema.parse({ email: customerEmail })
    } catch (validationError) {
        return NextResponse.json(
            { error: "Email inválido" }, 
            { status: 400 }
        )
    }

    try {
        // BUSCA CUSTOMER PELO EMAIL (ACESSO PÚBLICO LIMITADO - APENAS PARA VALIDAÇÃO)
        const customer = await prismaClient.customer.findFirst({
            where: {
                email: customerEmail
            },
            select: {
                id: true,
                name: true
            }
        })

        if (!customer) {
            return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 })
        }

        // HEADERS DE RATE LIMITING
        return NextResponse.json(
            {
                id: customer.id,
                name: customer.name
            },
            {
                headers: {
                    'X-RateLimit-Limit': '10',
                    'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
                    'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
                }
            }
        )
    } catch (error) {
        console.error('[API] Customer GET error:', error);
        return NextResponse.json(
            { error: "Internal error" }, 
            { status: 500 }
        )
    }
}

// -- /api/customer - POST
export async function POST(request: Request) {
    // Verifica se o usuário está logado para acessar essa rota
    const session = await getServerSession(authOptions)
    if(!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 })
    }

    // Pega os dados do body
    const { name, email, phone, address, userId } = await request.json()

    if(!name || !email || !phone || !userId) return NextResponse.json({ error: "Failed, name, email, phone, userId is required" }, { status: 400 })

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

export async function DELETE(request:Request) {
    // Verifica se o usuário está logado para acessar essa rota
    const session = await getServerSession(authOptions)
    if(!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    // Pegando o paramentro da url: /api/customer?id=123
    const customerId = searchParams.get('id') // 123

    if(!customerId) {
        return NextResponse.json({ error: "Failed, id required" }, { status: 400 })
    }

    const customerToDelete = await prismaClient.customer.findFirst({
        where: {
            id: customerId,
            userId: session.user.id 
        }
    })

    if (!customerToDelete) {
        return NextResponse.json({ error: "Customer not found or not authorized" }, { status: 404 })
    }

    const findTickets = await prismaClient.ticket.findFirst({
        where: {
            customerId: customerId,
            status: "ABERTO" 
        }
    })
    
    // Se o cliente que queremos deletar estiver em um chamado com status em aberto, retorna erro
    if(findTickets) {
        return NextResponse.json({ error: "Failed, client has a open ticket" }, { status: 400 })
    }
    
    try {
        await prismaClient.customer.delete({
            where: {
                id: customerId as string
            }
        })

        return NextResponse.json({ message: "Cliente deletado com sucesso!" })
    } catch (error) {
        return NextResponse.json({ error: "Failed delete customer" }, { status: 500 })
    }
}