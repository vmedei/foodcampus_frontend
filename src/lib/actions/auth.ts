"use server"

import { signIn, signOut } from "@/auth"

export const AuthLogin = async (provider: string) => {
    await signIn(provider, { redirectTo: "/" })
}

export const AuthLogout = async () => {
    await signOut({ redirect: true })
}