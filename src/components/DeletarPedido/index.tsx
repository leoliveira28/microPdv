"use client"

import { stringify } from "querystring";

export const DeletarPedido = ({ id }) => {
    const handleDeletePedido = (id) => {
        const result = fetch('/api/deletar-pedido', {
            method: "POST",
            headers: {
                "accept": "application/json"
            },
            body: JSON.stringify(id)
        })
        window.location.reload()
      };
    return (
        <button className="p-2 bg-yellow-500 rounded-md shadow-md drop-shadow-md text-white font-medium" onClick={() => handleDeletePedido(id)}>Excluir</button>
    )
}