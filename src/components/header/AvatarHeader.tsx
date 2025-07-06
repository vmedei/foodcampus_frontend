import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react"
import Login from "../login/Login"
import { LogOut } from "lucide-react"
import { AuthLogout } from "@/lib/actions/auth"
import Link from "next/link"
import { usePathname } from "next/navigation"

function AvatarHeader() {
    const { data: session } = useSession()
    const pathname = usePathname()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Avatar>
                    <AvatarImage src={session?.user?.image ?? "https://github.com/shadcn.png"} />
                    <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2 mt-1">
                <DropdownMenuLabel>{session ? `Bem vindo, ${session.user?.name}` : "Acesse ou crie sua conta"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session ? (
                    <>
                        <DropdownMenuItem className="cursor-pointer text-end">Seus dados</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-end">Pedidos</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-end">Favoritos</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-end"
                            variant="destructive" onClick={() => AuthLogout()}>
                            Sair <LogOut />
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem className="cursor-pointer" disabled={pathname === "/Cadastro/Usuario"}>
                            <Link href="Cadastro/Usuario">
                                Criar conta
                            </Link>
                        </DropdownMenuItem>
                        <Login />
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AvatarHeader