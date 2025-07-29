"use client"

import { useContext } from 'react'
import { ModalContext } from '@/providers/modal'
import { FiCheckSquare, FiFile } from 'react-icons/fi'
import { TicketProps } from '@/utils/ticket.type'
import { CustomerProps } from '@/utils/customer.type'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

interface TicketItemProps {
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export function Ticket({ customer, ticket }: TicketItemProps) {
    const { handleModalVisible, setDetailTicket } = useContext(ModalContext)
    const router = useRouter()

    async function handleChangeStatus() {
        try {
            await api.patch("/api/ticket", {
                id: ticket.id
            })

            toast.success("Chamado atualizado com sucesso!")
            router.refresh()
        } catch (error) {
            toast.error("Erro ao atualizar chamado")
        }
    }

    function handleOpenModal() {
        handleModalVisible()
        setDetailTicket({
            ticket: ticket,
            customer: customer
        })
    }

    return (
        <>
            <tr className='border-b-2 border-slate-200 h-14 last:border-b-0 bg-slate-50 hover:bg-slate-100'>
                <td className='text-left p-2 max-w-30 break-words overflow-hidden'>
                    {customer?.name} 
                </td>

                <td className='text-left hidden sm:table-cell'>
                    {ticket.createdAt.toLocaleDateString("pt-br")}
                </td>

                <td className='text-left'>
                    <span className="text-white shadow-sm font-medium bg-green-500 px-2 py-1 rounded">
                        {ticket.status}
                    </span>
                </td>

                <td className='text-left'>
                    <button className='mr-3 cursor-pointer' onClick={handleChangeStatus}>
                        <FiCheckSquare size={24} color='#66ef44' />
                    </button>
                     <button onClick={handleOpenModal} className='cursor-pointer'>
                        <FiFile size={24} color='#3b82f6' />
                    </button>
                </td>
            </tr>
        </>
    )
}