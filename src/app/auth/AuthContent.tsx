'use client'

import { useSearchParams } from 'next/navigation'
import { LoginForm, CadastroForm } from '@/components/auth'

export default function AuthContent() {
    const searchParams = useSearchParams()
    const mode = searchParams.get('mode') || 'login'
    const tipo = searchParams.get('tipo') as 'estudante' | 'vendedor' | null

    if (mode === 'cadastro') {
        return <CadastroForm tipo={tipo || undefined} />
    }

    return <LoginForm />
} 