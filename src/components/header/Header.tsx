'use client'

import { Menu, X, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import AvatarHeader from './AvatarHeader'
import Image from 'next/image'


function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const path = usePathname()
    const router = useRouter()

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const headerOffset = 80; // Altura aproximada do header
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setIsOpen(false)
    }

    const handleLoginClick = () => {
        router.push('/auth?mode=login')
        setIsOpen(false)
    }

    return (
<<<<<<< Updated upstream:src/components/header/Header.tsx
        <header className="w-full px-6 py-10 bg-[#075933] relative z-50">
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-white text-3xl cursor-pointer">
                    <Link href='/'>
                        <span className="font-bold text-[#F29727]">Food</span>
                        Campus
                    </Link>
                </h1>

                <div className='flex items-center gap-2'>
                    <button
                        className="cursor-pointer text-white bg-transparent"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu size={32} />
                    </button>

                    <AvatarHeader />
                </div>
=======
        <header className="navbar bg-primary text-primary-content sticky top-0 z-50 shadow-lg">
            <div className="navbar-start">
                <Link href="/" className="btn btn-primary btn-ghost text-xl">
                    <span className="font-bold text-secondary">Food</span>
                    <span className="text-white">Campus</span>
                </Link>
>>>>>>> Stashed changes:src/components/Header.tsx
            </div>

            {/* Desktop Navigation */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-4 px-1">
                    <li>
                        <button 
                            onClick={() => scrollToSection('sobre')}
                            className="btn btn-primary btn-ghost"
                        >
                            Sobre
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => scrollToSection('funcionalidades')}
                            className="btn btn-primary btn-ghost"
                        >
                            Funcionalidades
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => scrollToSection('tecnologias')}
                            className="btn btn-primary btn-ghost"
                        >
                            Tecnologias
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => scrollToSection('comecar')}
                            className="btn btn-primary btn-ghost"
                        >
                            Começar
                        </button>
                    </li>
                </ul>
            </div>

            <div className="navbar-end">
                {/* Desktop Login Button */}
                <div className="hidden lg:block">
                    <button 
                        className="btn btn-secondary"
                        onClick={handleLoginClick}
                    >
                        <User className="h-4 w-4" />
                        Login
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button
                        className="btn btn-ghost text-white"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

<<<<<<< Updated upstream:src/components/header/Header.tsx
                    <li className={`font-bold text-black text-xl transition-all duration-150 hover:scale-105
                     ${path == '/Cadastro/Clientes' && 'text-gray-700/60 pointer-events-none'}`}
                        onClick={() => setIsOpen(false)}>
                        <Link
                            href="/Cadastro/Clientes"
                        >
                            Cadastro de Clientes
                        </Link>
                    </li>
                </ul>

=======
            {/* Mobile Menu */}
            <div
                className={`
                    fixed top-0 right-0 h-full
                    bg-base-100 
                    w-80 max-w-[80vw]
                    transform transition-transform duration-300 ease-in-out
                    z-50 lg:hidden
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold text-primary">Menu</h3>
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="p-4">
                    <ul className="menu menu-vertical w-full space-y-2">
                        <li>
                            <button 
                                onClick={() => scrollToSection('sobre')}
                                className="btn btn-ghost w-full justify-start text-base-content hover:bg-primary hover:text-primary-content"
                            >
                                Sobre
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('funcionalidades')}
                                className="btn btn-ghost w-full justify-start text-base-content hover:bg-primary hover:text-primary-content"
                            >
                                Funcionalidades
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('tecnologias')}
                                className="btn btn-ghost w-full justify-start text-base-content hover:bg-primary hover:text-primary-content"
                            >
                                Tecnologias
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('comecar')}
                                className="btn btn-ghost w-full justify-start text-base-content hover:bg-primary hover:text-primary-content"
                            >
                                Começar
                            </button>
                        </li>
                    </ul>

                    <div className="divider"></div>

                    <button 
                        className="btn btn-secondary w-full"
                        onClick={handleLoginClick}
                    >
                        <User className="h-4 w-4" />
                        Login
                    </button>
                </nav>
>>>>>>> Stashed changes:src/components/Header.tsx
            </div>

        </header>
    )
}

export default Header
