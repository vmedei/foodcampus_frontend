'use client'

import Image from "next/image";
import { useRouter } from 'next/navigation'
import { ArrowRight, MapPin, ShoppingCart, Star, Users, Utensils, Globe, Code, Database, Smartphone } from "lucide-react";

export default function Home() {
    const router = useRouter()

    const handleCadastroEstudante = () => {
        router.push('/auth?mode=cadastro&tipo=estudante')
    }

    const handleCadastroVendedor = () => {
        router.push('/auth?mode=cadastro&tipo=vendedor')
    }

    const handleComecarAgora = () => {
        router.push('/auth?mode=login')
    }

    const handleSaibaMais = () => {
        const element = document.getElementById('sobre')
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

  return (
        <div className="">

            <div className="flex flex-col p-10 gap-10 max-w-6xl mx-auto">
                {/* Hero Section */}
                <section className="card bg-primary shadow-lg">
                    
                    <div className="card-body items-center text-center gap-6">

                        <div className="bg-base-100 p-10 rounded-lg shadow-lg">
                            <Image
                                src="/logo_horizontal.svg"
                                alt="Food Campus Logo"
                                width={300}
                                height={100}
                            />
                        </div>


                        <h1 className="card-title text-5xl text-primary-content">
                            Conectando <span className="text-secondary font-bold">Fome</span> e <span className="text-secondary font-bold">Sabor</span>
                        </h1>

                        <p className="text-xl max-w-3xl mx-auto opacity-90">
                            Plataforma inovadora que conecta estudantes da UFRN com Vendedores locais,
                            facilitando a descoberta e compra de alimentos no campus.
                        </p>
                        
                        <div className="flex gap-4">
                            <button 
                                className="btn btn-secondary btn-lg"
                                onClick={handleComecarAgora}
                            >
                                Começar Agora
                                <ArrowRight className="h-5 w-5" />
                            </button>
                            <button 
                                className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary"
                                onClick={handleSaibaMais}
                            >
                                Saiba Mais
                            </button>
                        </div>
                    </div>
                </section>

                {/* Sobre o Projeto */}
                <section id="sobre" className="p-10">

                    <div className="container space-y-8">

                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary">
                                Sobre o Food Campus
                            </h2>
                            <p className="text-lg text-base-content max-w-2xl mx-auto">
                                Sistema desenvolvido para facilitar o comércio de alimentos no entorno da UFRN,
                                criando uma ponte digital entre estudantes e Vendedores.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-12 items-center bg-base-200 rounded-lg border border-base-300">
                            <div className="pl-8 rounded-lg">
                                <h3 className="text-2xl font-semibold text-primary mb-6">Nossos Objetivos</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="bg-secondary p-2 rounded-full">
                                            <Users className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-base-content">Para Estudantes</h4>
                                            <p className="text-base-content opacity-70">Facilitar a busca e descoberta de opções alimentares próximas ao campus</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="bg-secondary p-2 rounded-full">
                                            <ShoppingCart className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-base-content">Para Vendedores</h4>
                                            <p className="text-base-content opacity-70">Oferecer uma plataforma centralizada para divulgação de produtos</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="bg-secondary p-2 rounded-full">
                                            <Globe className="h-5 w-5 text-white" />
                                        </div>
    <div>
                                            <h4 className="font-semibold text-base-content">Para a Comunidade</h4>
                                            <p className="text-base-content opacity-70">Criar um ecossistema digital que conecte oferta e demanda</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 bg-base-300 rounded-lg rounded-l-none">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                            <Utensils className="h-8 w-8 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-primary">Variedade</h4>
                                        <p className="text-sm text-base-content opacity-70">Múltiplas opções de comida</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                            <MapPin className="h-8 w-8 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-primary">Localização</h4>
                                        <p className="text-sm text-base-content opacity-70">Próximo ao campus</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                            <Star className="h-8 w-8 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-primary">Avaliações</h4>
                                        <p className="text-sm text-base-content opacity-70">Sistema de reviews</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                            <Smartphone className="h-8 w-8 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-primary">Fácil Uso</h4>
                                        <p className="text-sm text-base-content opacity-70">Interface intuitiva</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Funcionalidades */}
                <section id="funcionalidades" className="p-10 bg-base-200 rounded-lg border border-base-300">

                    <div className="container space-y-8">

                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary">
                                Funcionalidades
                            </h2>
                            <p className="text-lg text-base-content max-w-2xl mx-auto">
                                Ferramentas pensadas para atender tanto estudantes quanto Vendedores
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8">

                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h3 className="card-title text-primary flex items-center">
                                        <Users className="h-6 w-6 mr-2 text-secondary" />
                                        Para Estudantes
                                    </h3>
                                    <ul className="space-y-3 text-base-content">
                                        <li className="flex items-center">
                                            <ArrowRight className="h-4 w-4 mr-2 text-secondary" />
                                            Busca por alimentos por localização
                                        </li>
                                        <li className="flex items-center">
                                            <ArrowRight className="h-4 w-4 mr-2 text-secondary" />
                                            Visualização de cardápios e preços
                                        </li>
                                        <li className="flex items-center">
                                            <ArrowRight className="h-4 w-4 mr-2 text-secondary" />
                                            Sistema de avaliações e comentários
                                        </li>
                                        <li className="flex items-center">
                                            <ArrowRight className="h-4 w-4 mr-2 text-secondary" />
                                            Filtros por tipo de comida, preço e distância
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h3 className="card-title text-primary flex items-center">
                                        <ShoppingCart className="h-6 w-6 mr-2 text-secondary" />
                                        Para Vendedores
                                    </h3>
                                    <ul className="space-y-3 text-base-content">
                                        <li className="flex items-center">
                                            <ArrowRight className="h-4 w-4 mr-2 text-secondary" />
                                            Cadastro e gerenciamento de produtos
                                        </li>
                                        <li className="flex items-center">
                                            <ArrowRight className="h-4 w-4 mr-2 text-secondary" />
                                            Upload de fotos e descrições
                                        </li>
                                        <li className="flex items-center">
                                            <ArrowRight className="h-4 w-4 mr-2 text-secondary" />
                                            Controle de disponibilidade
                                        </li>
                                        <li className="flex items-center">
                                            <ArrowRight className="h-4 w-4 mr-2 text-secondary" />
                                            Dashboard de vendas
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tecnologias */}
                <section id="tecnologias" className="p-10">

                    <div className="container space-y-8">

                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary">
                                Tecnologias Utilizadas
                            </h2>
                            <p className="text-lg text-base-content max-w-2xl mx-auto">
                                Stack moderna e robusta para garantir performance e escalabilidade
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="card bg-primary text-primary-content">
                                <div className="card-body">
                                    <h3 className="card-title flex items-center">
                                        <Code className="h-6 w-6 mr-2 text-secondary" />
                                        Frontend
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span>React.js</span>
                                            <span className="text-secondary">18.x</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Next.js</span>
                                            <span className="text-secondary">14.x</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>TypeScript</span>
                                            <span className="text-secondary">5.x</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Tailwind CSS</span>
                                            <span className="text-secondary">3.x</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>DaisyUI</span>
                                            <span className="text-secondary">Latest</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-secondary text-secondary-content">
                                <div className="card-body">
                                    <h3 className="card-title flex items-center">
                                        <Database className="h-6 w-6 mr-2 text-secondary-content" />
                                        Backend
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span>Java</span>
                                            <span className="text-secondary-content">17</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Spring Boot</span>
                                            <span className="text-secondary-content">3.5.3</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Spring Security</span>
                                            <span className="text-secondary-content">6.x</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Spring Data JPA</span>
                                            <span className="text-secondary-content">3.x</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>MySQL</span>
                                            <span className="text-secondary-content">8.x</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section id="comecar" className="p-10 bg-base-200 rounded-lg border border-base-300">
                    <div className="container text-center space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Pronto para começar?
                        </h2>
                        <p className="text-xl max-w-2xl mx-auto">
                            Junte-se ao Food Campus e faça parte da revolução alimentar do campus da UFRN
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button 
                                className="btn btn-secondary btn-lg"
                                onClick={handleCadastroEstudante}
                            >
                                Cadastrar como Estudante
                            </button>
                            <button 
                                className="btn btn-primary btn-lg"
                                onClick={handleCadastroVendedor}
                            >
                                Cadastrar como Vendedor
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="footer footer-center p-10 bg-neutral text-neutral-content">
                <aside>
                    <p className="font-bold text-secondary text-lg">
                        Food<span className="text-white">Campus</span>
                    </p>
                    <p className="text-neutral-content text-sm">
                        MVP desenvolvido para a disciplina de Processos de Software - UFRN
                    </p>
                </aside>
            </footer>
    </div>
  );
}
