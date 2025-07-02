import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <header className='w-full px-6 py-10 bg-[#075933]'>
            <div className='flex items-center justify-between'>
                <h1 className='font-semibold text-white text-3xl'>
                    <span className='font-bold text-[#F29727]'>Food</span>
                    Campus
                </h1>

                <ul className='flex items-center gap-2'>
                    <li>
                        <Link href="Cadastro/Produtos" className='font-bold text-white text-lg'>
                            Cadastro de produtos
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header