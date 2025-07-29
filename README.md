# DevControle - Sistema de Gerenciamento de Tickets

## Objetivo do Projeto

Este projeto foi desenvolvido como uma aplicação prática de estudos em **Next.js 15**, com o objetivo de explorar e implementar as principais funcionalidades do framework moderno de React. O DevControle é um sistema completo de gerenciamento de tickets e clientes, demonstrando conceitos avançados de desenvolvimento full-stack com Next.js.

## Funcionalidades Implementadas

- ✅ **Sistema de Autenticação** - Login com Google via NextAuth.js
- ✅ **Dashboard Administrativo** - Visualização e gerenciamento de tickets
- ✅ **Gerenciamento de Clientes** - CRUD completo de clientes
- ✅ **Sistema de Tickets** - Criação, visualização e atualização de chamados
- ✅ **Portal Público** - Abertura de tickets por clientes não autenticados
- ✅ **API Routes** - Endpoints RESTful para todas as operações
- ✅ **Rate Limiting** - Proteção contra spam em endpoints públicos
- ✅ **Validação de Dados** - Validação robusta com Zod
- ✅ **Interface Responsiva** - Design adaptável com Tailwind CSS
- ✅ **Notificações** - Sistema de feedback com Sonner
- ✅ **Banco de Dados** - Persistência com MongoDB via Prisma

## Principais Conceitos de Next.js Aplicados

### App Router (Next.js 13+)
- Estrutura de pastas baseada em rotas
- Layouts aninhados e compartilhados
- Loading states e error boundaries

### Server e Client Components
- **Server Components**: Páginas do dashboard, busca de dados
- **Client Components**: Formulários, interações e estado local
- Uso estratégico de `"use client"` para otimização

### Server Actions
- Formulários nativos com `action` attribute
- Processamento server-side sem API routes
- Validação e redirecionamento automático

### API Routes
- Endpoints RESTful para operações CRUD
- Middleware de autenticação
- Rate limiting e validação de entrada

### Renderização e Otimização
- **SSR**: Páginas do dashboard com dados dinâmicos
- **Static Generation**: Páginas públicas
- Otimização de imagens com `next/image`

### Autenticação e Sessões
- Integração com NextAuth.js
- Proteção de rotas server-side
- Callbacks personalizados para sessão

## Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js 18+ instalado
- MongoDB Atlas ou local
- Conta Google para OAuth

### Configuração

1. **Clone o repositório**
```bash
git clone https://github.com/andreluizdasilvaa/DevControle-NEXT-FullStack-Project
cd devcontrole
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env.local` na raiz do projeto:
```env
# Database
DATABASE_URL="sua_string_conexao_mongodb"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="seu_secret_aqui"

# Google OAuth
AUTH_GOOGLE_ID="seu_google_client_id"
AUTH_GOOGLE_SECRET="seu_google_client_secret"
```

4. **Configure o banco de dados**
```bash
npx prisma generate
npx prisma db push
```

5. **Execute o projeto**
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

### Scripts Disponíveis
- `npm run dev` - Executa em modo desenvolvimento com Turbopack
- `npm run build` - Gera build de produção
- `npm run start` - Executa versão de produção
- `npm run lint` - Executa verificação de código

## Tecnologias e Ferramentas Usadas

### Core
- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Framework de CSS utility-first

### Banco de Dados e ORM
- **Prisma 6** - ORM moderno para TypeScript
- **MongoDB** - Banco de dados NoSQL

### Autenticação
- **NextAuth.js** - Autenticação completa para Next.js
- **@auth/prisma-adapter** - Adaptador Prisma para NextAuth

### Formulários e Validação
- **React Hook Form** - Gerenciamento de formulários performático
- **Zod** - Validação de schemas TypeScript-first
- **@hookform/resolvers** - Integração RHF + Zod

### HTTP e APIs
- **Axios** - Cliente HTTP para requisições
- **Rate Limiting** - Proteção personalizada contra spam

### UI/UX
- **React Icons** - Biblioteca de ícones
- **Sonner** - Sistema de notificações toast
- **Design Responsivo** - Mobile-first approach

## Estrutura do Projeto

```
src/
├── app/                    # App Router
│   ├── api/               # API Routes
│   ├── dashboard/         # Área administrativa
│   ├── login/            # Página de login
│   ├── open/             # Portal público
│   └── layout.tsx        # Layout principal
├── components/           # Componentes reutilizáveis
├── lib/                 # Utilitários e configurações
├── providers/           # Context providers
└── utils/              # Tipos e interfaces
```

## Conceitos Avançados Implementados

### Rate Limiting Personalizado
- Implementação própria de rate limiting
- Proteção específica para endpoints públicos
- Headers informativos de limite e reset

### Validação em Camadas
- Validação client-side com React Hook Form
- Validação server-side com Zod
- Sanitização de dados de entrada

### Gerenciamento de Estado
- Estado local com React hooks
- Estado global com Context API
- Sincronização server-client otimizada

---

**Desenvolvido com 💙 utilizando Next.js 15**