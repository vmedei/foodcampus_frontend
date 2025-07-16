import { ProductResponse } from "@/lib/api"
import CardProduto from "./CardListaProduto"

interface props {
    produtos: ProductResponse[]
}

function ListaProdutos() {
    return (
        <div className="flex flex-col gap-4 pb-10">
            <h2 className="text-xl font-semibold">Varias opções para você escolher! ✨</h2>
            <div className="grid grid-cols-4 gap-4 rounded-box">
                <div className="">
                    <CardProduto nome="Produto teste" descricao="Descrição do produto" vendedor="Gustavo" />
                </div>
                <div className="">
                    <CardProduto nome="Produto teste" descricao="Descrição do produto" vendedor="Gustavo" />
                </div>
                <div className="">
                    <CardProduto nome="Produto teste" descricao="Descrição do produto" vendedor="Gustavo" />
                </div>
                <div className="">
                    <CardProduto nome="Produto teste" descricao="Descrição do produto" vendedor="Gustavo" />
                </div>
                <div className="">
                    <CardProduto nome="Produto teste" descricao="Descrição do produto" vendedor="Gustavo" />
                </div>
                <div className="">
                    <CardProduto nome="Produto teste" descricao="Descrição do produto" vendedor="Gustavo" />
                </div>
                <div className="">
                    <CardProduto nome="Produto teste" descricao="Descrição do produto" vendedor="Gustavo" />
                </div>
            </div>

        </div>
    )
}

export default ListaProdutos