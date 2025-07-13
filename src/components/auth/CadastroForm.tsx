'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, GraduationCap, Store, ArrowLeft, Mail, KeyRound, User, Phone, IdCard } from 'lucide-react'
import { customerAPI, sellerAPI, CreateCustomerRequest, CreateSellerRequest, useApiError, ClienteType } from '@/lib/api'

interface CadastroFormProps {
    tipo?: 'estudante' | 'vendedor'
}

export default function CadastroForm({ tipo: tipoInicial }: CadastroFormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [tipoSelecionado, setTipoSelecionado] = useState<'estudante' | 'vendedor'>(tipoInicial || 'estudante')
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        password: '',
        confirmPassword: '',
        // Campos para cliente/estudante
        cpf: '',
        telefone: '',
        tipoCliente: 'aluno' as ClienteType,
        // Campos específicos para vendedor
        nomeFantasia: '',
        cnpj: '',
        descricao: ''
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState('')
    
    const router = useRouter()
    const { handleApiError } = useApiError()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setIsLoading(true)

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem!')
            setIsLoading(false)
            return
        }

        try {
            if (tipoSelecionado === 'estudante') {
                const customerData: CreateCustomerRequest = {
                    name: formData.nome,
                    cpf: formData.cpf,
                    phone: formData.telefone,
                    tipo: formData.tipoCliente,
                    user: {
                        email: formData.email,
                        password: formData.password
                    }
                }
                
                await customerAPI.create(customerData)
                setSuccess('Conta de estudante criada com sucesso! Faça login para continuar.')
                
                // Redirecionar para login após 2 segundos
                setTimeout(() => {
                    router.push('/auth?mode=login')
                }, 2000)
                
            } else {
                const sellerData: CreateSellerRequest = {
                    name: formData.nome,
                    fantasyName: formData.nomeFantasia,
                    cpf: formData.cpf,
                    cnpj: formData.cnpj,
                    phone: formData.telefone,
                    description: formData.descricao,
                    user: {
                        email: formData.email,
                        password: formData.password
                    }
                }
                
                await sellerAPI.create(sellerData)
                setSuccess('Conta de vendedor criada com sucesso! Faça login para continuar.')
                
                // Redirecionar para login após 2 segundos
                setTimeout(() => {
                    router.push('/auth?mode=login')
                }, 2000)
            }
            
        } catch (error) {
            setError(handleApiError(error))
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        // Limpar erro quando usuário começar a digitar
        if (error) setError('')
        if (success) setSuccess('')
    }

    const getButtonStyle = () => {
        if (tipoSelecionado === 'estudante') return 'btn-secondary'
        if (tipoSelecionado === 'vendedor') return 'btn-primary'
        return 'btn-primary'
    }

    const getIcon = () => {
        if (tipoSelecionado === 'estudante') return <GraduationCap className="h-5 w-5" />
        if (tipoSelecionado === 'vendedor') return <Store className="h-5 w-5" />
        return <GraduationCap className="h-5 w-5" />
    }

    const getSubtitle = () => {
        if (tipoSelecionado === 'estudante') return 'Crie sua conta e descubra novas opções de comida no campus!'
        if (tipoSelecionado === 'vendedor') return 'Crie sua conta e comece a vender no Food Campus!'
        return 'Crie sua conta no Food Campus'
    }

    const passwordMatch = formData.password === formData.confirmPassword || formData.confirmPassword === ''

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-primary">
                                Criar conta no Food Campus
                            </h2>
                            <p className="text-base-content/70 mt-2">
                                {getSubtitle()}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex justify-center w-full">
                                <div className="join">
                                    <input 
                                        className="join-item btn" 
                                        type="radio" 
                                        name="tipo" 
                                        aria-label="Estudante"
                                        checked={tipoSelecionado === 'estudante'}
                                        onChange={() => setTipoSelecionado('estudante')}
                                        disabled={isLoading}
                                    />
                                    <input 
                                        className="join-item btn" 
                                        type="radio" 
                                        name="tipo" 
                                        aria-label="Vendedor"
                                        checked={tipoSelecionado === 'vendedor'}
                                        onChange={() => setTipoSelecionado('vendedor')}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <label className="input w-full">
                                <User className="h-4 w-4 opacity-70" />
                                <input
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    className="grow"
                                    placeholder="Seu nome completo"
                                    required
                                    disabled={isLoading}
                                />
                            </label>

                            <label className="input w-full">
                                <Mail className="h-4 w-4 opacity-70" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="grow"
                                    placeholder="seu@email.com"
                                    required
                                    disabled={isLoading}
                                />
                            </label>

                            {/* Campos específicos para vendedor */}
                            {tipoSelecionado === 'vendedor' && (
                                <>
                                    <label className="input w-full">
                                        <Store className="h-4 w-4 opacity-70" />
                                        <input
                                            type="text"
                                            name="nomeFantasia"
                                            value={formData.nomeFantasia}
                                            onChange={handleChange}
                                            className="grow"
                                            placeholder="Nome fantasia do estabelecimento"
                                            required
                                            disabled={isLoading}
                                        />
                                    </label>

                                    <div className="grid grid-cols-2 gap-2">
                                        <label className="input w-full">
                                            <IdCard className="h-4 w-4 opacity-70" />
                                            <input
                                                type="text"
                                                name="cpf"
                                                value={formData.cpf}
                                                onChange={handleChange}
                                                className="grow"
                                                placeholder="CPF"
                                                maxLength={11}
                                                required
                                                disabled={isLoading}
                                            />
                                        </label>

                                        <label className="input w-full">
                                            <input
                                                type="text"
                                                name="cnpj"
                                                value={formData.cnpj}
                                                onChange={handleChange}
                                                className="grow"
                                                placeholder="CNPJ"
                                                maxLength={14}
                                                required
                                                disabled={isLoading}
                                            />
                                        </label>
                                    </div>

                                    <label className="input w-full">
                                        <Phone className="h-4 w-4 opacity-70" />
                                        <input
                                            type="tel"
                                            name="telefone"
                                            value={formData.telefone}
                                            onChange={handleChange}
                                            className="grow"
                                            placeholder="Telefone"
                                            maxLength={15}
                                            required
                                            disabled={isLoading}
                                        />
                                    </label>

                                    <textarea
                                        name="descricao"
                                        value={formData.descricao}
                                        onChange={handleChange}
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Descrição do estabelecimento (opcional)"
                                        disabled={isLoading}
                                    />
                                </>
                            )}

                            {/* Campos específicos para estudante */}
                            {tipoSelecionado === 'estudante' && (
                                <>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Tipo de vínculo com a UFRN</span>
                                        </label>
                                        <select
                                            name="tipoCliente"
                                            value={formData.tipoCliente}
                                            onChange={handleChange}
                                            className="select select-bordered w-full"
                                            disabled={isLoading}
                                        >
                                            <option value="aluno">Aluno</option>
                                            <option value="professor">Professor</option>
                                            <option value="funcionario">Funcionário</option>
                                        </select>
                                    </div>

                                    <label className="input w-full">
                                        <IdCard className="h-4 w-4 opacity-70" />
                                        <input
                                            type="text"
                                            name="cpf"
                                            value={formData.cpf}
                                            onChange={handleChange}
                                            className="grow"
                                            placeholder="CPF"
                                            maxLength={11}
                                            required
                                            disabled={isLoading}
                                        />
                                    </label>

                                    <label className="input w-full">
                                        <Phone className="h-4 w-4 opacity-70" />
                                        <input
                                            type="tel"
                                            name="telefone"
                                            value={formData.telefone}
                                            onChange={handleChange}
                                            className="grow"
                                            placeholder="Telefone"
                                            maxLength={15}
                                            required
                                            disabled={isLoading}
                                        />
                                    </label>
                                </>
                            )}

                            <label className="input w-full">
                                <KeyRound className="h-4 w-4 opacity-70" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="grow"
                                    placeholder="Sua senha (mínimo 6 caracteres)"
                                    required
                                    minLength={6}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="hover:cursor-pointer p-2 rounded-full hover:shadow-inner"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 opacity-70" />
                                    ) : (
                                        <Eye className="h-4 w-4 opacity-70" />
                                    )}
                                </button>
                            </label>

                            <label className="input w-full">
                                <KeyRound className="h-4 w-4 opacity-70" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`grow ${!passwordMatch ? 'text-error' : ''}`}
                                    placeholder="Confirme sua senha"
                                    required
                                    minLength={6}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="hover:cursor-pointer p-2 rounded-full hover:shadow-inner"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    disabled={isLoading}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4 opacity-70" />
                                    ) : (
                                        <Eye className="h-4 w-4 opacity-70" />
                                    )}
                                </button>
                            </label>

                            {!passwordMatch && (
                                <div className="text-error text-sm">
                                    As senhas não coincidem
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-error">
                                    <span className="text-sm">{error}</span>
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success">
                                    <span className="text-sm">{success}</span>
                                </div>
                            )}

                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className={`btn ${getButtonStyle()} w-full`}
                                    disabled={!passwordMatch || isLoading}
                                >
                                    {isLoading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        getIcon()
                                    )}
                                    {isLoading ? 'Criando conta...' : 'Criar conta'}
                                </button>
                            </div>
                        </form>

                        <div className="text-center space-y-2">
                            <p className="text-sm text-base-content/70">
                                Já tem uma conta?{' '}
                                <button
                                    onClick={() => router.push('/auth?mode=login')}
                                    className="link link-primary"
                                    disabled={isLoading}
                                >
                                    Faça login
                                </button>
                            </p>
                            <button
                                onClick={() => router.push('/')}
                                className="btn btn-ghost btn-sm"
                                disabled={isLoading}
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 