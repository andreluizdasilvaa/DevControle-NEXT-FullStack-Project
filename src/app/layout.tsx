import type { Metadata } from "next";
import { Header } from "@/components/header";
import { AuthProviders } from "@/providers/auth";
import "./globals.css";

export const metadata: Metadata = {
    title: "Dev Controle - Seu sistema de gerenciamento",
    description: "Gerencie seus cliente e atendimentos de forma facil",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body
                className={`antialiased`}
            >
                <AuthProviders>
                    <Header />
                    {children}
                </AuthProviders>
            </body>
        </html>
    );
}
