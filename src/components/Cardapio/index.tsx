"use client"

import { useEffect } from "react"


export const DownloadCardapio = () => {
    useEffect(() => {
        // Redireciona para a nova URL quando a página é carregada
        window.location.href = 'https://drive.google.com/file/d/1z244aJ4neni8I9v8rE8qlT05eYHNrVLj/view';
      }, []);
    return (
        <div className="w-full h-screen flex items-center justify-center">
           <p className="text-lg font-medium">Carregando...</p> 
        </div>
    )
}