"use client"

import { MouseEvent, useContext, useRef } from "react"
import { ModalContext } from "@/providers/modal"

export function ModalTicket() {
    const { handleModalVisible, ticket } = useContext(ModalContext)
    // Criamos uma referencia de onde está o conteudo ( modal branco )
    const modalRef = useRef<HTMLDivElement | null>(null)

    const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
        // Se você clicou em uma area fora da referencia que criamos ( modal branco ), ele cai dentro do if
        if(modalRef.current && !modalRef.current.contains(e.target as Node)) {
            handleModalVisible()
        }
    }

    return (
        <div className="absolute bg-gray-900/70 w-full min-h-screen" onClick={handleModalClick}>
            <div className="absolute inset-0 flex items-center justify-center">
                <div 
                    className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded" 
                    ref={modalRef}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="font-bold text-lg md:text-2xl">Detalhes do chamado:</h1>
                        <button 
                            className="bg-red-500 font-medium p-1 px-2 text-white rounded cursor-pointer"
                            onClick={handleModalVisible}
                        >
                            Fechar
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h1 className="font-bold">Nome:</h1>
                        <p>{ticket?.ticket.name}</p>
                    </div>

                    <div className="flex flex-col flex-wrap mb-2">
                        <h1 className="font-bold">Descrição:</h1>
                        <p>{ticket?.ticket.description}</p>
                    </div>

                    <div className="w-full border-gray-300 border-b-[1px] my-4"></div>

                    <h1 className="font-bold text-lg mb-4">Detalhes do cliente</h1>
                    <div className="flex flex-wrap gap-1 mb-2">
                        <h1 className="font-bold">Nome:</h1>
                        <p>{ticket?.customer?.name}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h1 className="font-bold">Telefone:</h1>
                        <p>{ticket?.customer?.phone}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h1 className="font-bold">Email:</h1>
                        <p>{ticket?.customer?.email}</p>
                    </div>

                    {ticket?.customer?.address && (
                        <div className="flex flex-wrap gap-1 mb-2">
                            <h1 className="font-bold">Endereço:</h1>
                            <p>{ticket?.customer?.address}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}