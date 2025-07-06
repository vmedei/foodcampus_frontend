import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { User } from "lucide-react"
import Link from "next/link"
import { AuthLogin } from "@/lib/actions/auth"

function Login() {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full p-2 font-normal text-start items-start justify-start cursor-pointer">Login</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-center text-center gap-2 text-2xl font-bold ">Login <User size={25} /></DialogTitle>
                        <DialogDescription className="text-center">
                            Para continuar, informe seu email e senha
                        </DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-1">
                        <div className="flex flex-col gap-3">
                            <div>
                                <Label className="font-bold">Email</Label>
                                <Input type="email" placeholder="Informe o seu email" />
                            </div>
                            <div>
                                <Label className="font-bold">Senha</Label>
                                <Input type="password" placeholder="Informe a sua senha" />
                            </div>
                            <a className="text-black font-bold text-xs" href="/">Esqueci minha senha</a>
                            <Button variant={"outline"} className="cursor-pointer mt-4">Entrar</Button>
                            <Button className="cursor-pointer bg-black hover:bg-black/80"
                                onClick={() => AuthLogin("github")}>
                                Entre com o GitHub
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                            </Button>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">Ainda nao possui um conta?
                            <Link className="text-black font-bold ml-1" href="/">Crie sua conta de graça</Link>
                        </p>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Login