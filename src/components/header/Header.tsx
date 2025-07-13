'use client'

import { Menu, X, User, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'


function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const path = usePathname()
    const router = useRouter()
    const { user, logout } = useAuth()

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

    const handleDashboardClick = () => {
        router.push('/dashboard')
        setIsOpen(false)
    }

    const handleLogoutClick = () => {
        logout()
        setIsOpen(false)
    }

    return (
        <header className="navbar bg-primary text-primary-content sticky top-0 z-50 shadow-lg">
            <div className="navbar-start">
                <Link href="/" className="btn btn-primary btn-ghost text-xl">
                    <span className="font-bold text-secondary">Food</span>
                    <span className="text-white">Campus</span>
                </Link>
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
                {/* Desktop User Menu */}
                <div className="hidden lg:block">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-secondary">
                                <User className="h-4 w-4" />
                                {user.email}
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button 
                                        onClick={handleDashboardClick}
                                        className="text-base-content hover:bg-primary hover:text-primary-content"
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        Dashboard
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={handleLogoutClick}
                                        className="text-base-content hover:bg-error hover:text-error-content"
                                    >
                                        <X className="h-4 w-4" />
                                        Sair
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <button 
                            className="btn btn-secondary"
                            onClick={handleLoginClick}
                        >
                            <User className="h-4 w-4" />
                            Login
                        </button>
                    )}
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

                    {user ? (
                        <div className="space-y-2">
                            <div className="p-2 bg-base-200 rounded-lg">
                                <p className="text-sm text-base-content/70">Logado como</p>
                                <p className="font-semibold text-primary truncate">{user.email}</p>
                            </div>
                            <button 
                                className="btn btn-primary w-full"
                                onClick={handleDashboardClick}
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </button>
                            <button 
                                className="btn btn-outline btn-error w-full"
                                onClick={handleLogoutClick}
                            >
                                <X className="h-4 w-4" />
                                Sair
                            </button>
                        </div>
                    ) : (
                        <button 
                            className="btn btn-secondary w-full"
                            onClick={handleLoginClick}
                        >
                            <User className="h-4 w-4" />
                            Login
                        </button>
                    )}
                </nav>
            </div>

        </header>
    )
}

export default Header
