"use client"

import { useEffect } from "react"


export const DownloadCardapio = () => {
    useEffect(() => {
        // Redireciona para a nova URL quando a página é carregada
        window.location.href = 'https://drive.google.com/file/d/1cRZFqxzXDO-GCqfEL6M3ExvStaKNFJnL/view?usp=sharing';
      }, []);
    return (
        <div className="w-full h-screen flex items-center justify-center">
           <p className="text-lg font-medium">Carregando...</p> 
        </div>
    )
}