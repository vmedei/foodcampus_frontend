'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft, Mail, KeyRound } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const router = useRouter()
    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            await login({
                email: formData.email,
                password: formData.password
            })
            
            // Login bem-sucedido - redirecionamento será feito pelo hook useAuth
            console.log('Login realizado com sucesso!')
            
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro desconhecido')
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        // Limpar erro quando usuário começar a digitar
        if (error) setError('')
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="w-full max-w-md">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body space-y-4">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold text-primary">
                                Login
                            </h2>
                            <p className="text-base-content/70">
                                Acesse sua conta no Food Campus
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
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

                            <label className="input w-full">
                                <KeyRound className="h-4 w-4 opacity-70" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="grow"
                                    placeholder="Sua senha"
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

                            {error && (
                                <div className="alert alert-error">
                                    <span className="text-sm">{error}</span>
                                </div>
                            )}

                            <div className="form-control">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        <Mail className="h-5 w-5" />
                                    )}
                                    {isLoading ? 'Entrando...' : 'Entrar'}
                                </button>
                            </div>
                        </form>

                        <div className="divider">ou</div>

                        <button 
                            className="btn btn-outline btn-neutral w-full"
                            disabled={isLoading}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continuar com Google
                        </button>

                        <div className="text-center space-y-2">
                            <p className="text-sm text-base-content/70">
                                Não tem uma conta?{' '}
                                <button
                                    onClick={() => router.push('/auth?mode=cadastro')}
                                    className="link link-primary"
                                    disabled={isLoading}
                                >
                                    Cadastre-se
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