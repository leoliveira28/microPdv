"use client"

import { useEffect } from "react"


export const DownloadCardapio = () => {
    useEffect(() => {
        // Redireciona para a nova URL quando a página é carregada
        window.location.href = 'https://drive.google.com/file/d/15uFEFK0k2sS1EvJoViJagIPMev9JAqGO/view';
      }, []);
    return (
        <div className="w-full h-screen flex items-center justify-center">
           <p className="text-lg font-medium">Carregando...</p> 
        </div>
    )
}