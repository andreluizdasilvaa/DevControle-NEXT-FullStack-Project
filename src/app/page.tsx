import Image from "next/image";
import imageHero from '@/assets/hero.svg'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions)
    if (session) {
        redirect('/dashboard')
    }

    return (
        <main className="flex items-center justify-center flex-col min-h-[calc(100vh-80px)]">
            <h1 className="font-medium text-2xl mb-2">Gerencia sua empresa</h1>
            <h2 className="font-bold text-3xl mb-8 text-blue-600 md:text-4xl">Atendimentos, clientes</h2>
            <Image
                src={imageHero}
                alt="Image hero"
                width={600}
                className="max-w-sm md:max-w-xl"
            />
        </main>
    );
}
