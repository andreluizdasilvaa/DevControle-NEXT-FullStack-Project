import type { Metadata } from "next";
import { Header } from "@/components/header";
import { AuthProviders } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "Dev Controle - Seu sistema de gerenciamento",
    description: "Gerencie seus cliente e atendimentos de forma facil",
    icons: {
        icon: [
            {
                url: '/logo.svg',
                type: 'image/svg+xml',
            }
        ],
        shortcut: '/logo.svg',
        apple: '/logo.svg',
    }
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
                    <ModalProvider>
                         <Header />
                         <Toaster position="top-center"/>
                        {children}
                    </ModalProvider>
                </AuthProviders>
            </body>
        </html>
    );
}
