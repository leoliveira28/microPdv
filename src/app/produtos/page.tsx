
import { TabelaProdutos } from "@/components/Produtos/TabelaProdutos"
import { PrismaClient } from "../../../generated/client"
import { CadastroProduto } from "@/components/Produtos/CadastroProduto"
import { Navbar } from "@/components/Navbar"
const prisma = new PrismaClient()

const getProduto = async () => {
    const response = await prisma.produto.findMany()
    return response
}
const getCategorias = async () => {
    const response = await prisma.categoria.findMany()
    return response
}
const Produtos = async () => {
    const dataProduto = await getProduto()
    const dataCategoria = await getCategorias()

    return (
      <div className="flex p-5">
      <Navbar />
        <div className="container mx-auto p-5">
          <div className="flex flex-col gap-4 bg-slate-200 p-5 rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-gray-800">
              Gerenciar Produtos
            </h1>
              <div className="flex flex-col gap-5">
                  <strong>Produtos Cadastrados</strong>
              </div>
          <TabelaProdutos data={dataProduto} categoria={dataCategoria} />
          <CadastroProduto categoria={dataCategoria} />
          </div>
        </div>
      </div>
    )
}

export default Produtos