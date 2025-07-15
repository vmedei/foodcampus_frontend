# 🍕 Food Campus - Frontend

> Frontend do sistema Food Campus - Plataforma para comércio de alimentos no entorno da UFRN

[![Frontend](https://img.shields.io/badge/Frontend-Production-brightgreen)](https://foodcampusfrontend-production.up.railway.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Desenvolvimento](#desenvolvimento)

## 🎯 Sobre o Projeto

O **Food Campus Frontend** é a interface web do sistema destinado ao comércio e venda de alimentos no entorno da UFRN. Desenvolvido com Next.js 15 e React 19, oferece uma experiência moderna e responsiva para estudantes e ambulantes.

### 🎯 Objetivos

- **Interface Intuitiva**: Design moderno e responsivo para todos os dispositivos
- **Performance**: Otimizado para carregamento rápido e experiência fluida
- **Acessibilidade**: Interface acessível para todos os usuários
- **Mapas Interativos**: Visualização geográfica dos setores e vendedores

## ✨ Funcionalidades

### 🧑‍🎓 Para Estudantes
- **Mapa Interativo**: Visualização dos setores de venda no campus
- **Busca por Localização**: Filtros por proximidade e tipo de alimento
- **Perfis de Vendedores**: Informações detalhadas e produtos disponíveis
- **Interface Responsiva**: Funciona perfeitamente em mobile e desktop

### 🛒 Para Ambulantes
- **Dashboard de Produtos**: Gerenciamento completo de produtos
- **Upload de Imagens**: Sistema de fotos para produtos
- **Controle de Disponibilidade**: Gerenciamento de estoque e horários
- **Agendamento de Setores**: Sistema de reserva de espaços

## 🛠️ Tecnologias

### Core
- **Next.js 15.3.4** - Framework React com App Router
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript 5** - Tipagem estática para JavaScript

### Estilização
- **Tailwind CSS 4.1.11** - Framework CSS utilitário
- **DaisyUI 5.0.46** - Biblioteca de componentes UI
- **tw-animate-css 1.3.4** - Animações CSS

### Mapas e Geografia
- **Leaflet 1.9.4** - Biblioteca para mapas interativos
- **React Leaflet 5.0.0** - Componentes React para Leaflet

### Autenticação e UX
- **NextAuth.js 5.0.0-beta.29** - Sistema de autenticação
- **Lucide React 0.525.0** - Biblioteca de ícones modernos

## 🚀 Instalação

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para Instalação

```bash
# Clone o repositório
git clone https://github.com/vmedei/foodcampus_frontend.git
cd foodcampus_frontend

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

### Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Compila para produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa linter
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── auth/              # Páginas de autenticação
│   ├── home/              # Página inicial
│   ├── globals.css        # Estilos globais
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   ├── auth/             # Componentes de autenticação
│   ├── header/           # Cabeçalho da aplicação
│   ├── home/             # Componentes da página inicial
│   ├── mapa/             # Componentes de mapas
│   └── vendedor/         # Componentes do painel vendedor
├── hooks/                # Custom hooks
├── lib/                  # Utilitários e configurações
└── public/               # Arquivos estáticos
```

## 💻 Desenvolvimento

### Configuração do Ambiente

1. **Variáveis de Ambiente**: Configure as variáveis necessárias para autenticação e API
2. **Backend**: Certifique-se de que o backend Spring Boot está rodando
3. **Banco de Dados**: MySQL deve estar configurado e acessível

### Padrões de Desenvolvimento

- **TypeScript**: Uso obrigatório para todos os arquivos
- **Componentes**: Funcionais com hooks
- **Estilização**: Tailwind CSS + DaisyUI
- **Estado**: Hooks nativos do React
- **Roteamento**: App Router do Next.js 15

### Deploy

O projeto está configurado para deploy na **Railway**:
- **URL de Produção**: https://foodcampusfrontend-production.up.railway.app/
- **Branch**: `main`
- **Build**: Automático via Railway

---

## 🔗 Links Úteis

- **Backend**: [foodcampus_backend](https://github.com/vmedei/foodcampus_backend)
- **Documentação**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/vmedei/foodcampus_frontend/issues)

---

<div align="center">
  <p>Feito com ❤️ pela equipe Food Campus</p>
  <p>UFRN - 2024</p>
</div>
