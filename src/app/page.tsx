"use client";

import { useEffect, useState } from "react";

import { ChartMongo } from "./chartscomp/chartmongo";

interface ChartData {
  _id: string;
  month: string;
  desktop: number;
  mobile: number;
}

export default function Home() {
  const [testcharts, setTestcharts] = useState<ChartData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/api/getdatacharts");

        // Vérification si la réponse est OK
        if (!res.ok) {
          throw new Error(
            "Erreur lors de la récupération des données: " + res.statusText
          );
        }

        const data: ChartData[] = await res.json();
        setTestcharts(data);
      } catch (err) {
        setError((err as Error).message);
      }
    }

    fetchData();
  }, []); // Dépendances vides pour exécuter uniquement au montage

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="flex gap-3 items-center justify-center bg-slate-700 w-full h-screen text-white">
        <div>
          <h1 className="text-3xl font-bold">Données de MongoDB :</h1>
          <ul className="m-3">
            {testcharts.map((item) => (
              <li key={item._id}>
                {item.month}: Desktop: {item.desktop}, Mobile: {item.mobile}
              </li>
            ))}
          </ul>
        </div>
        <ChartMongo chartData={testcharts}></ChartMongo>
      </div>
    </>
  );
}
