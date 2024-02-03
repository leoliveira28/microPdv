"use client"
import Link from "next/link";
import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface Resultados {
  [formaPagamento: string]: number;
}

interface Transaction {
  id: number;
  mesaId: number;
  valor: number;
  formaPagamento: string;
  data: string;
}

export const FechamentoCaixa = ({ data: transacoes }: { data: Transaction[] }) => {
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(new Date());
  
  const resultados: Resultados = transacoes
    .filter(item => {
      const dataItem = new Date(item.data);
      return (
        dataSelecionada &&
        dataItem.getDate() === dataSelecionada.getDate() &&
        dataItem.getMonth() === dataSelecionada.getMonth() &&
        dataItem.getFullYear() === dataSelecionada.getFullYear()
      );
    })
    .reduce((acc, item) => {
      const { formaPagamento, valor } = item;

      if (!acc[formaPagamento]) {
        acc[formaPagamento] = 0;
      }

      acc[formaPagamento] += valor;

      return acc;
    }, {});
  return (
    <div className="container mx-auto">
        <div className="flex flex-col gap-4 p-5 bg-slate-100 rounded-md">
      <h2 className="font-medium text-xl text-gray-800">Total por Forma de Pagamento:</h2>
      <div>
        <strong>Data: </strong>
        <DatePicker
          selected={dataSelecionada}
          onChange={(date: Date | null) => setDataSelecionada(date)}
          dateFormat="dd/MM/yyyy"
          className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          calendarClassName="absolute mt-2 bg-white border rounded-md shadow-md p-2"
        />
      </div>
      <ul className="list-disc list-inside p-2 flex flex-col gap-2">
        <strong>Total por forma de pagamento: </strong>
        {Object.entries(resultados).map(([formaPagamento, total]) => (
          <li key={formaPagamento}>
            {formaPagamento}: R$ {total.toFixed(2)}
          </li>
        ))}
      </ul>
      <Link href={"/caixa"}>
      
      <button className="bg-green-500 text-xl font-medium text-gray-800 w-1/4 rounded-md p-2 hover:brightness-95 transition-all duration-300">Voltar</button>
      </Link>
        </div>
    </div>
  );
};
