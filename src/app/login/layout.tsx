import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function DashboardLayout({ children }: {
    children: ReactNode
}) {
    const session = await getServerSession(authOptions)
    
    if (session) {
        redirect('/dashboard')
    }


    return (
        <>
            {children}
        </>
    )
}