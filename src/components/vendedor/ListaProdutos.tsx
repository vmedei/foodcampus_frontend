'use client'

import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { Package, Eye, Edit, AlertCircle, DollarSign } from 'lucide-react'
import { productAPI, ProductResponse } from '@/lib/api'

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

    const abrirModal = (produto: ProductResponse) => {
        setProdutoSelecionado(produto)
        const modal = document.getElementById('modal-produto') as HTMLDialogElement
        modal?.showModal()
    }

    const fecharModal = () => {
        setProdutoSelecionado(null)
        const modal = document.getElementById('modal-produto') as HTMLDialogElement
        modal?.close()
    }

    const formatarPreco = (preco: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(preco)
    }

    return (
        <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="card-title text-primary">
                        <Package className="h-5 w-5" />
                        Meus Produtos
                    </h2>
                    <button 
                        onClick={carregarProdutos}
                        className="btn btn-ghost btn-sm"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            'Atualizar'
                        )}
                    </button>
                </div>

                {/* Mensagem de erro */}
                {erro && (
                    <div className="alert alert-error mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <span>{erro}</span>
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center items-center py-8">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                )}

                {/* Lista de produtos */}
                {!loading && produtos.length === 0 && (
                    <div className="text-center py-8">
                        <Package className="h-12 w-12 text-base-content/30 mx-auto mb-4" />
                        <p className="text-base-content/60">Nenhum produto cadastrado ainda</p>
                        <p className="text-sm text-base-content/40 mt-2">
                            Use o formulário ao lado para cadastrar seus primeiros produtos
                        </p>
                    </div>
                )}

                {!loading && produtos.length > 0 && (
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
                                            onClick={() => abrirModal(produto)}
                                            className="btn btn-ghost btn-sm"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de detalhes do produto */}
            <dialog id="modal-produto" className="modal">
                <div className="modal-box max-w-2xl">
                    {produtoSelecionado && (
                        <>
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <img
                                        src={produtoSelecionado.base64Image}
                                        alt={produtoSelecionado.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-primary mb-2">
                                            {produtoSelecionado.name}
                                        </h3>
                                        <p className="text-base-content/70">
                                            {produtoSelecionado.description}
                                        </p>
                                    </div>
                                    
                                    <div className="bg-secondary/10 p-4 rounded-lg">
                                        <p className="text-secondary font-semibold text-2xl flex items-center gap-2">
                                            <DollarSign className="h-6 w-6" />
                                            {formatarPreco(produtoSelecionado.price)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
})

ListaProdutos.displayName = 'ListaProdutos'

export default ListaProdutos 