"use client"

import { createContext, ReactNode, useState } from "react"
import { TicketProps } from "@/utils/ticket.type"
import { CustomerProps } from "@/utils/customer.type"
import { ModalTicket } from "@/app/dashboard/components/modal";

interface ModalContextData {
    visible: boolean;
    handleModalVisible: () => void;
    setDetailTicket: (detail:TicketInfo) => void;
    ticket: TicketInfo | undefined;
}

interface TicketInfo {
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export const ModalContext = createContext({ } as ModalContextData)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false)
    const [ticket, setTicket] = useState<TicketInfo>()

    async function handleModalVisible() {
        setVisible(value => !value)
    }

    function setDetailTicket(detail: TicketInfo) {
        setTicket(detail)
    }

    return (
        <ModalContext.Provider
            value={{
                handleModalVisible,
                setDetailTicket,
                visible,
                ticket
            }}
        >
            {visible && <ModalTicket />}
            {children}
        </ModalContext.Provider>
    )
}
