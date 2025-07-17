import { ProductResponse } from "@/lib/api"
import CardProduto from "./CardProduto"

interface props {
    produtos: ProductResponse[]
}

function CarrouselProdutos() {
    return (
        <div className="flex flex-col gap-4 pb-10">
            <h2 className="text-xl font-semibold">Varias opções para você escolher! ✨</h2>
            <div className="carousel rounded-box gap-3">
                <div className="carousel-item">
                    <CardProduto nome="Produto teste" descricao="Descrição do produto" vendedor="Gustavo" />
                </div>
                <div className="carousel-item">
                    <CardProduto nome="Produto teste" descricao="Descrição do produto" vendedor="Gustavo" />
                </div>
                <div className="carousel-item">
                    <CardProduto nome="Produto teste" descricao="Descrição do produto" vendedor="Gustavo" />
                </div>
                <div className="carousel-item">
                    <CardProduto nome="Produto teste" descricao="Descrição do produto" vendedor="Gustavo" />
                </div>
                <div className="carousel-item">
                    <CardProduto nome="Produto teste" descricao="Descrição do produto" vendedor="Gustavo" />
                </div>
                <div className="carousel-item">
                    <CardProduto nome="Produto teste" descricao="Descrição do produto" vendedor="Gustavo" />
                </div>
                <div className="carousel-item">
                    <CardProduto nome="Produto teste" descricao="Descrição do produto" vendedor="Gustavo" />
                </div>
            </div>

        </div>
    )
}

export default CarrouselProdutos