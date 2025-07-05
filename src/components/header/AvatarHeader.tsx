import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react"
import Login from "../login/Login"

function AvatarHeader() {
    const { data: session } = useSession()

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
                        <DropdownMenuItem className="cursor-pointer">Seus dados</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Pedidos</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Favoritos</DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem className="cursor-pointer">Criar conta</DropdownMenuItem>
                        <Login />
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AvatarHeader