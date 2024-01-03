export const dynamic = 'force-dynamic';

import { FechamentoCaixa } from "@/components/Fechamento";
import prisma from "../../../../lib/prisma";
import { Navbar } from "@/components/Navbar";

const getFechamento = async () => {
  const result = await prisma.pedidoEncerrado.findMany();
  return result;
};

const Fechamento = async () => {
  const data = await getFechamento();
  return (
    <div className="flex p-5">
    <Navbar />
  <FechamentoCaixa data={data} />
  </div>
  );
};

export default Fechamento;