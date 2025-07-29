export interface TicketProps {
    id: string;
    name: string;
    userId: string | null;
    status: string;
    description: string;
    customerId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

