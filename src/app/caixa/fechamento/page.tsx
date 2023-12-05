export const dynamic = 'force-dynamic';

import { FechamentoCaixa } from "@/components/Fechamento";
import prisma from "../../../../lib/prisma";

const getFechamento = async () => {
  const result = await prisma.pedidoEncerrado.findMany();
  return result;
};

const Fechamento = async () => {
  const data = await getFechamento();
  return <FechamentoCaixa data={data} />;
};

export default Fechamento;