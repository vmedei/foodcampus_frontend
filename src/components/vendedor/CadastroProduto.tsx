'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { Package, Save, AlertCircle, CheckCircle, Upload, X } from 'lucide-react'
import { productAPI, CreateProductRequest, useApiError } from '@/lib/api'

interface CadastroProdutoProps {
    onProdutoCriado?: () => void
}

export default function CadastroProduto({ onProdutoCriado }: CadastroProdutoProps) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        base64Image: ''
    })
    const [loading, setLoading] = useState(false)
    const [sucesso, setSucesso] = useState(false)
    const [erro, setErro] = useState('')
    const [imagemPreview, setImagemPreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { handleApiError } = useApiError()

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        
        // Limpar mensagens ao digitar
        if (erro) setErro('')
        if (sucesso) setSucesso(false)
    }

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validar tamanho da imagem (máximo 2MB para melhor performance)
        if (file.size > 2 * 1024 * 1024) {
            setErro('A imagem deve ter no máximo 2MB')
            return
        }

        // Validar tipo da imagem
        if (!file.type.startsWith('image/')) {
            setErro('Por favor, selecione apenas arquivos de imagem')
            return
        }

        const reader = new FileReader()
        reader.onload = (event) => {
            const base64String = event.target?.result as string
            
            // Criar uma imagem para redimensionar se necessário
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                
                // Redimensionar se a imagem for muito grande
                const maxWidth = 800
                const maxHeight = 800
                let { width, height } = img
                
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height)
                    width *= ratio
                    height *= ratio
                }
                
                canvas.width = width
                canvas.height = height
                
                ctx?.drawImage(img, 0, 0, width, height)
                
                // Converter para base64 com qualidade otimizada
                const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.8)
                
                setFormData(prev => ({
                    ...prev,
                    base64Image: optimizedBase64
                }))
                setImagemPreview(optimizedBase64)
            }
            
            img.src = base64String
        }
        reader.readAsDataURL(file)
    }

    const removerImagem = () => {
        setFormData(prev => ({
            ...prev,
            base64Image: ''
        }))
        setImagemPreview(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setSucesso(false)
        setErro('')

        try {
            // Validações no frontend
            if (!formData.name.trim()) {
                throw new Error('Nome do produto é obrigatório')
            }
            if (!formData.description.trim()) {
                throw new Error('Descrição do produto é obrigatória')
            }
            if (!formData.price || parseFloat(formData.price) <= 0) {
                throw new Error('Preço deve ser maior que zero')
            }
            if (!formData.base64Image) {
                throw new Error('Imagem do produto é obrigatória')
            }

            const productData: CreateProductRequest = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                price: parseFloat(formData.price),
                base64Image: formData.base64Image
            }

            await productAPI.create(productData)

            setSucesso(true)
            setFormData({
                name: '',
                description: '',
                price: '',
                base64Image: ''
            })
            setImagemPreview(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }

            // Notificar componente pai sobre o produto criado
            if (onProdutoCriado) {
                onProdutoCriado()
            }

            // Limpar mensagem de sucesso após 5 segundos
            setTimeout(() => setSucesso(false), 5000)
        } catch (error: any) {
            setErro(handleApiError(error))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
                <h2 className="card-title text-primary mb-4">
                    <Package className="h-5 w-5" />
                    Cadastrar Produto
                </h2>

                {/* Mensagem de sucesso */}
                {sucesso && (
                    <div className="alert alert-success mb-4">
                        <CheckCircle className="h-4 w-4" />
                        <span>Produto cadastrado com sucesso!</span>
                    </div>
                )}

                {/* Mensagem de erro */}
                {erro && (
                    <div className="alert alert-error mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <span>{erro}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Nome do Produto</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="input input-bordered w-full"
                            placeholder="Ex: Sanduíche de Frango"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Descrição</span>
                        </label>
                        <textarea
                            name="description"
                            className="textarea textarea-bordered h-24"
                            placeholder="Descreva os ingredientes e características do produto..."
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Preço (R$)</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            className="input input-bordered w-full"
                            placeholder="0,00"
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Imagem do Produto</span>
                        </label>
                        <div className="space-y-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="file-input file-input-bordered w-full"
                            />
                            
                            {imagemPreview && (
                                <div className="relative">
                                    <img
                                        src={imagemPreview}
                                        alt="Preview do produto"
                                        className="w-32 h-32 object-cover rounded-lg border-2 border-base-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={removerImagem}
                                        className="absolute -top-2 -right-2 btn btn-circle btn-sm btn-error"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="alert alert-info">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">
                            Certifique-se de que a imagem seja clara e mostre bem o produto. Tamanho máximo: 2MB. A imagem será otimizada automaticamente.
                        </span>
                    </div>

                    <div className="card-actions justify-end">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Cadastrando...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    Cadastrar Produto
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
} 