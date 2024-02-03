'use client'
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const ConsumoApp = ({data}) => {

  // Estado para armazenar dados formatados
  const [consumoPorDia, setConsumoPorDia] = useState<any>([]);
  const [consumoPorSemana, setConsumoPorSemana] = useState<any>([]);
  const [consumoPorMes, setConsumoPorMes] = useState<any>([]);

  // Função para formatar os dados
  const formatarDados = () => {
    const consumoDia: any = {};
    const consumoSemana: any = {};
    const consumoMes: any = {};

    data.forEach((item: any) => {
      const data = new Date(item.data);
      const dia = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`;
      const semana = `${data.getFullYear()}-${getWeekNumber(data)}`;
      const mes = `${data.getFullYear()}-${data.getMonth() + 1}`;

      consumoDia[dia] = (consumoDia[dia] || 0) + item.valor;
      consumoSemana[semana] = (consumoSemana[semana] || 0) + item.valor;
      consumoMes[mes] = (consumoMes[mes] || 0) + item.valor;
    });

    setConsumoPorDia(Object.entries(consumoDia));
    setConsumoPorSemana(Object.entries(consumoSemana));
    setConsumoPorMes(Object.entries(consumoMes));
  };

  // Função para obter o número da semana
  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  useEffect(() => {
    formatarDados();
  }, []);

  return (
    <div>
      <div>
        <h2>Consumo por Dia</h2>
        <Chart
          options={{ xaxis: { type: 'datetime' } }}
          series={[{ name: 'Valor', data: consumoPorDia }]}
          type="bar"
          width={500}
        />
      </div>
      <div>
        <h2>Consumo por Semana</h2>
        <Chart
          options={{ xaxis: { type: 'datetime' } }}
          series={[{ name: 'Valor', data: consumoPorSemana }]}
          type="bar"
          width={500}
        />
      </div>
      <div>
        <h2>Consumo por Mês</h2>
        <Chart
          options={{ xaxis: { type: 'datetime' } }}
          series={[{ name: 'Valor', data: consumoPorMes }]}
          type="bar"
          width={500}
        />
      </div>
    </div>
  );
};

export default ConsumoApp;
