'use client'

import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { productAPI, ProductResponse } from '@/lib/api'
import { Package, Eye, Edit, AlertCircle, DollarSign } from 'lucide-react'
import CardProduto from "./CardListaProduto"

export interface ListaProdutosRef {
    recarregarProdutos: () => void
}

const ListaProdutos = forwardRef<ListaProdutosRef>((props, ref) => {
    const [produtos, setProdutos] = useState<ProductResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState('')
    const [produtoSelecionado, setProdutoSelecionado] = useState<ProductResponse | null>(null)

    const carregarProdutos = async () => {
        try {
            setLoading(true)
            setErro('')
            const response = await productAPI.getAll()
            setProdutos(response.products || [])
        } catch (error: any) {
            setErro('Erro ao carregar produtos')
            console.error('Erro ao carregar produtos:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        carregarProdutos()
    }, [])

    useImperativeHandle(ref, () => ({
        recarregarProdutos: carregarProdutos
    }))

    const formatarPreco = (preco: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(preco)
    }


    return (
        <div>
            {!loading && produtos.length === 0 && (
                <div className="text-center py-12">
                    <Package className="h-12 w-12 text-base-content/30 mx-auto mb-4" />
                    <p className="text-lg text-base-content/60">Nenhum produto disponível no momento</p>
                </div>
            )}

            {!loading && produtos.length > 0 && (
                <div className="flex flex-col gap-4 pb-10">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {produtos.map((produto, index) => (
                            <div key={index} className="card bg-base-200 shadow-sm hover:shadow-md transition-all duration-200">
                                <figure className="px-4 pt-4">
                                    <img
                                        src={produto.base64Image}
                                        alt={produto.name}
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h3 className="card-title text-base">{produto.name}</h3>
                                    <p className="text-sm text-base-content/70 line-clamp-2">
                                        {produto.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-lg font-bold text-primary flex items-center gap-1">
                                            <DollarSign className="h-4 w-4" />
                                            {formatarPreco(produto.price)}
                                        </span>
                                        <button
                                            onClick={() => {}}
                                            className="btn btn-ghost btn-sm"
                                        >
                                            Reservar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
})

export default ListaProdutos