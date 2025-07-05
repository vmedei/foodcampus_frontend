'use client'

import { Menu, User, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import AvatarHeader from './AvatarHeader'

function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const path = usePathname()
    const { data: session } = useSession()

    return (
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
                        <Menu size={30} />
                    </button>

                    <AvatarHeader />
                </div>
            </div>


            <div
                className={`
                  fixed top-0 right-0 h-screen
                  bg-white rounded-l-lg
                  px-7 py-8
                  flex flex-col items-end gap-3
                  transition-all duration-500 ease-in-out
                  overflow-hidden z-50
                  ${isOpen ? 'w-[25em] opacity-100 pointer-events-auto' : 'w-0 opacity-0 pointer-events-none'}
                `}
            >
                <div className="text-end w-full flex justify-end">
                    <button
                        className="cursor-pointer text-black bg-transparent"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={30} />
                    </button>
                </div>

                <ul className="flex flex-col items-end gap-5 mt-4 w-full">
                    <li className={`font-bold text-black text-xl transition-all duration-150 hover:scale-105
                     ${path == '/Cadastro/Produtos' && 'text-gray-700/60 pointer-events-none'}`}
                        onClick={() => setIsOpen(false)}>
                        <Link
                            href="/Cadastro/Produtos"
                        >
                            Cadastro de Produtos
                        </Link>
                    </li>

                    <li className={`font-bold text-black text-xl transition-all duration-150 hover:scale-105
                     ${path == '/Cadastro/Vendedores' && 'text-gray-700/60 pointer-events-none'}`}
                        onClick={() => setIsOpen(false)}>
                        <Link
                            href="/Cadastro/Vendedores"
                        >
                            Cadastro de Vendedores
                        </Link>
                    </li>

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

            </div>

        </header>
    )
}

export default Header
