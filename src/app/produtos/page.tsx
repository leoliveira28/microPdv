import { CadastroCategoria } from "@/components/Produtos/CadastroCategoria";
import { PrismaClient } from "../../../generated/client";
import CategoryTable from "@/components/Produtos/TabelaCategoria";
const prisma = new PrismaClient()
const getCategorias = async () => {
    const response = await prisma.categoria.findMany()
    return response
}
const Produtos = async () => {
    const dataCategoria = await getCategorias()
  return (
    <div>
      <div className="container mx-auto p-5">
        <div className="flex flex-col gap-4 bg-slate-200 p-5 rounded-md shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">
            Gerenciar Produtos
          </h1>
            <div className="flex flex-col gap-5">
                <strong>Categorias cadastradas: </strong>
                {/* <ul>
                    {dataCategoria.map(
                        (categoria, i) =>
                        <li key={i}>
                            {categoria.nome}
                        </li>
                    )}
                </ul> */}
                <CategoryTable data={dataCategoria}/>
                <CadastroCategoria  />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Produtos;
