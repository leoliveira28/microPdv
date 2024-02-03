export const dynamic = "force-dynamic";

import { FechamentoCaixa } from "@/components/Fechamento";
import prisma from "../../../../lib/prisma";
import { Navbar } from "@/components/Navbar";
import ConsumoApp from "@/components/ResumoGrafico";

const getFechamento = async () => {
  const result = await prisma.pedidoEncerrado.findMany({});
  // console.log(result)
  return result;
};

const Fechamento = async () => {
  const data = await getFechamento();
  return (
    <div className="flex p-5">
      <Navbar />
      <div className="flex flex-col">
      <FechamentoCaixa data={data} />
      <ConsumoApp data={data} />
      </div>

    </div>
  );
};

export default Fechamento;
