"use client";
import { useEffect, useState } from "react";
import { getServerPros } from "../_service/api";

export default function Predicao() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            const result = await getServerPros();
            setData(result);
        }
        fetchData();
    }, []);

    useEffect(()=>{
        console.log(data)
    },[data])
    
    return (
        <div className="w-full h-screen flex items-center justify-center">
            
        </div>
    );
}
