"use client";

import { useEffect, useState } from "react";
import { ChartMongo } from "./chartscomp/chartmongo";
import InsertDataComponent from "./insertdatacomponent";
import Charts from "@/components/charts-01";
import { Button } from "@/components/ui/button";

interface ChartData {
  _id: string;
  month: string;
  desktop: number;
  mobile: number;
}

export default function Home() {
  const [testcharts, setTestcharts] = useState<ChartData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editableItem, setEditableItem] = useState<ChartData | null>(null); // Ajout d'un état pour l'élément modifiable

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/api/getdatacharts");

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
  }, []);

  const handleEdit = (item: ChartData) => {
    setEditableItem({ ...item });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editableItem) {
      setEditableItem({ ...editableItem, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (!editableItem) return;

    try {
      // Convertir les champs en nombre avant de les envoyer à MongoDB
      const updatedItem = {
        ...editableItem,
        desktop: Number(editableItem.desktop),
        mobile: Number(editableItem.mobile),
      };

      const res = await fetch("http://localhost:3000/api/updatedata", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la mise à jour des données");
      }

      // Rafraîchir les données locales après la mise à jour
      setTestcharts((prevCharts) =>
        prevCharts.map((chart) =>
          chart._id === editableItem._id ? updatedItem : chart
        )
      );

      setEditableItem(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données", error);
    }
  };

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
                {editableItem && editableItem._id === item._id ? (
                  // Afficher les champs modifiables
                  <div className="text-black">
                    <input
                      type="text"
                      name="month"
                      value={editableItem.month}
                      onChange={handleChange}
                    />
                    <input
                      type="number"
                      name="desktop"
                      value={editableItem.desktop}
                      onChange={handleChange}
                    />
                    <input
                      type="number"
                      name="mobile"
                      value={editableItem.mobile}
                      onChange={handleChange}
                    />
                    <Button
                      variant={"outline"}
                      className="text-white mx-2"
                      onClick={handleSave}
                    >
                      Enregistrer
                    </Button>
                  </div>
                ) : (
                  // Afficher les données en lecture seule
                  <div onClick={() => handleEdit(item)}>
                    {item.month}: Desktop: {item.desktop}, Mobile: {item.mobile}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <InsertDataComponent />
        </div>
        <ChartMongo chartData={testcharts} />
      </div>
    </>
  );
}
