import { Check, PencilLine, ShieldUser } from "lucide-react"

interface CardProdutoProps {
    nome: string,
    image?: string,
    descricao: string,
    vendedor: string
}

function CardProduto({ nome, image, descricao, vendedor }: CardProdutoProps) {
    return (
        <div className="">
            <div>
                <figure>
                    <img
                        src={image ? image : "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"} alt="Imagem do produto"
                    />
                </figure>
                <div className="card-body px-3 bg-white">
                    <h2 className="card-title">{nome}</h2>
                    <p className="flex items-center gap-1">{descricao} <PencilLine className="w-4 h-4" /></p>
                    <p className="flex items-center gap-1 text-black font-bold">
                        <ShieldUser className="w-4 h-4" /> {vendedor}
                        <span className="text-gray-500">- vendedor</span>
                    </p>
                    <div className="card-actions items-center justify-between mt-4">
                        <button className="btn btn-outline btn-sm">Reservar <Check /></button>
                        <button className="btn btn-primary btn-sm">Ver Detalhes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProduto