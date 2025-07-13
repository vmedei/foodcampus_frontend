'use client'

import { Suspense } from 'react'
import AuthContent from './AuthContent'

export default function AuthPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>}>
            <AuthContent />
        </Suspense>
    )
} 