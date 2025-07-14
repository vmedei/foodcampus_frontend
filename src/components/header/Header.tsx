'use client'

import { Menu, X, User, LayoutDashboard, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const { user, logout } = useAuth()
    
    // Mostrar navegação apenas na página principal
    const isHomePage = pathname === '/'

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const headerOffset = 80
            const elementPosition = element.offsetTop
            const offsetPosition = elementPosition - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
        setIsOpen(false)
    }

    const handleNavigation = {
        login: () => {
            router.push('/auth?mode=login')
            setIsOpen(false)
        },
        home: () => {
            router.push('/home')
            setIsOpen(false)
        },
        logout: () => {
            logout()
            setIsOpen(false)
        }
    }

    const getUserDisplayName = () => user?.name || user?.email || 'Usuário'
    
    const getPageTitle = () => {
        if (pathname === '/auth') return 'Autenticação'
        return null
    }

    return (
        <header className="navbar bg-primary text-primary-content sticky top-0 z-50 shadow-lg">
            <div className="navbar-start">
                <Link 
                    href={user ? "/home" : "/"} 
                    className="btn btn-primary btn-ghost text-xl hover:bg-primary-focus"
                >
                    <span className="font-bold text-secondary">Food</span>
                    <span className="text-white">Campus</span>
                </Link>
            </div>

            {/* Desktop Navigation */}
            {/* Centro do navbar */}
            <div className="navbar-center hidden lg:flex">
                {isHomePage ? (
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
                ) : getPageTitle() ? (
                    <h1 className="text-lg font-semibold text-white">
                        {getPageTitle()}
                    </h1>
                ) : null}
            </div>

            <div className="navbar-end">
                {/* Desktop User Menu */}
                <div className="hidden lg:block">
                    {user ? (
                        <details className="dropdown dropdown-end">
                            <summary className="btn btn-secondary hover:btn-secondary-focus flex items-center gap-2 m-2">
                                <User className="h-4 w-4" />
                                <span className="hidden md:inline">{getUserDisplayName()}</span>
                            </summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 gap-2 shadow-sm">
                                <li>
                                    <button
                                        onClick={handleNavigation.home}
                                        className="text-base-content hover:bg-primary hover:text-primary-content flex items-center gap-2"
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        Home
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handleNavigation.logout}
                                        className="text-base-content hover:bg-error hover:text-error-content flex items-center gap-2"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Sair
                                    </button>
                                </li>
                            </ul>
                        </details>
                    ) : (
                        <button
                            className="btn btn-secondary hover:btn-secondary-focus"
                            onClick={handleNavigation.login}
                        >
                            <User className="h-4 w-4" />
                            <span className="hidden md:inline ml-2">Login</span>
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button
                        className="btn btn-ghost text-white hover:bg-primary-focus"
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
                    <h3 className="text-lg font-semibold text-primary">
                        {getPageTitle() || 'Menu'}
                    </h3>
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="p-4">
                    {/* Navegação - apenas na página principal */}
                    {isHomePage && (
                        <>
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
                        </>
                    )}

                    {/* Área do usuário */}
                    {user ? (
                        <div className="space-y-2">
                            <div className="p-2 bg-base-200 rounded-lg">
                                <p className="text-sm text-base-content/70">Logado como</p>
                                <p className="font-semibold text-primary truncate">{getUserDisplayName()}</p>
                            </div>
                            <button 
                                className="btn btn-primary w-full"
                                onClick={handleNavigation.home}
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Home
                            </button>
                            <button 
                                className="btn btn-outline btn-error w-full"
                                onClick={handleNavigation.logout}
                            >
                                <LogOut className="h-4 w-4" />
                                Sair
                            </button>
                        </div>
                    ) : (
                        <button 
                            className="btn btn-secondary w-full"
                            onClick={handleNavigation.login}
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
