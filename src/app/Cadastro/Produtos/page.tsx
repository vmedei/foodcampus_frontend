import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function CadastroProdutos() {
    return (
        <section className='flex flex-col gap-6'>
            <h2 className='text-black text-3xl font-bold'>Cadastro de produtos</h2>
            <form className='flex flex-col gap-7'>
                <div className='flex flex-col gap-1'>
                    <Label>Nome</Label>
                    <Input type='text' />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1'>
                        <Label>Valor do produto</Label>
                        <Input type='number' placeholder='R$'></Input>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Label>Imagem do produto</Label>
                        <Input type='file' placeholder='Imagem do produto' className='cursor-pointer' />
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <Label>Descrição</Label>
                    <Textarea className='h-[8em]'></Textarea>
                </div>
                <div className='text-end'>
                    <Button className='cursor-pointer' size={'lg'}>Confimar</Button>
                </div>
            </form>
        </section>
    )
}

export default CadastroProdutos