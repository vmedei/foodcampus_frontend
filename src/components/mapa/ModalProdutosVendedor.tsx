'use client'

import { useState, useEffect } from 'react'
import { X, Package, DollarSign, AlertCircle } from 'lucide-react'
import { productAPI, ProductResponse } from '@/lib/api'
import { VendedorAgendado } from '@/hooks/useSetores'

interface ModalProdutosVendedorProps {
    vendedor: VendedorAgendado | null
    isOpen: boolean
    onClose: () => void
}

export default function ModalProdutosVendedor({ vendedor, isOpen, onClose }: ModalProdutosVendedorProps) {
    const [produtos, setProdutos] = useState<ProductResponse[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (isOpen && vendedor?.storeCode) {
            carregarProdutos()
        }
    }, [isOpen, vendedor])

    const carregarProdutos = async () => {
        if (!vendedor?.storeCode) return

        try {
            setLoading(true)
            setError('')
            const response = await productAPI.getAll(vendedor.storeCode)
            setProdutos(response.products || [])
        } catch (err: any) {
            setError('Erro ao carregar produtos do vendedor')
            console.error('Erro ao carregar produtos:', err)
        } finally {
            setLoading(false)
        }
    }

    const formatarPreco = (preco: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(preco)
    }

    if (!isOpen || !vendedor) return null

    return (
        <div className="modal modal-open z-[9999]">
            <div className="modal-box max-w-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Package className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="font-bold text-lg">Produtos de {vendedor.nomeFantasia}</h3>
                            <p className="text-sm text-base-content/70">{vendedor.descricao}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="btn btn-ghost btn-sm btn-circle"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Conteúdo */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <span className="loading loading-spinner loading-md text-primary"></span>
                            <span className="ml-3 text-base-content/70">Carregando produtos...</span>
                        </div>
                    ) : error ? (
                        <div className="alert alert-error">
                            <AlertCircle className="h-5 w-5" />
                            <span>{error}</span>
                        </div>
                    ) : produtos.length > 0 ? (
                        <div className="grid gap-4">
                            {produtos.map((produto, index) => (
                                <div key={index} className="card bg-base-200 shadow-sm">
                                    <div className="card-body p-4">
                                        <div className="flex items-start gap-4">
                                            {/* Imagem do produto */}
                                            {produto.base64Image && (
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={`${produto.base64Image}`}
                                                        alt={produto.name}
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                    />
                                                </div>
                                            )}
                                            
                                            {/* Informações do produto */}
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-base mb-1">
                                                    {produto.name}
                                                </h4>
                                                <p className="text-sm text-base-content/70 mb-2">
                                                    {produto.description}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="h-4 w-4 text-success" />
                                                    <span className="font-bold text-success">
                                                        {formatarPreco(produto.price)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-5xl mb-3">📦</div>
                            <p className="text-base-content/50 font-medium">
                                Nenhum produto disponível
                            </p>
                            <p className="text-base-content/40 text-sm">
                                Este vendedor ainda não cadastrou produtos
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="modal-action">
                    <button
                        onClick={onClose}
                        className="btn btn-primary"
                    >
                        Fechar
                    </button>
                </div>
            </div>
            
            {/* Overlay para fechar ao clicar fora */}
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    )
} 