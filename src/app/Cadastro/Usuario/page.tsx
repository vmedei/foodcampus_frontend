import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function CadastroUsuario() {
    return (
        <div className='bg-gray-300/30 px-22 py-10 rounded-lg'>
            <h2 className="font-bold text-2xl text-center mb-10">Crie sua conta</h2>
            <form className="flex flex-col gap-6">
                <div>
                    <Label>Nome</Label>
                    <Input type="text" placeholder="Informe o seu nome completo" />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Informe o seu email" />
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                    <div>
                        <Label>Telefone celular</Label>
                        <Input type="tel" placeholder="Informe o seu número de celular" />
                    </div>

                    <div>
                        <Label>Data de nascimento</Label>
                        <Input type="date" />
                    </div>
                </div>

                <div>
                    <Label>Senha</Label>
                    <Input type="password" placeholder="Informe a sua senha" />
                </div>

                <div>
                    <Label>Confirmação de senha</Label>
                    <Input type="password" placeholder="Digite novamente a sua senha" />
                </div>

                <div className="text-center">
                    <Button className="w-1/4 cursor-pointer" size={"lg"}>Criar conta</Button>
                </div>
            </form>
        </div>
    )
}

export default CadastroUsuario