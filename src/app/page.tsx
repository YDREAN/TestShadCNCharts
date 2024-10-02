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
  const [editableItem, setEditableItem] = useState<string | null>(null); // Store the generated ID

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

  const handleEdit = (uniqueId: string) => {
    // Passe uniquement cet élément en mode édition
    setEditableItem(uniqueId);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    uniqueId: string
  ) => {
    setTestcharts((prevCharts) =>
      prevCharts.map((chart, index) =>
        `${index}` === uniqueId
          ? { ...chart, [e.target.name]: e.target.value }
          : chart
      )
    );
  };

  const handleSave = async (e: React.FormEvent, uniqueId: string) => {
    e.preventDefault();

    const itemIndex = testcharts.findIndex(
      (_, index) => `${index}` === uniqueId
    );
    if (itemIndex === -1) return;

    const itemToSave = testcharts[itemIndex];

    try {
      // Convertir les champs en nombre avant de les envoyer à MongoDB
      const updatedItem = {
        ...itemToSave,
        desktop: Number(itemToSave.desktop),
        mobile: Number(itemToSave.mobile),
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
        prevCharts.map((chart, index) =>
          `${index}` === uniqueId ? updatedItem : chart
        )
      );

      // Réinitialiser l'élément en mode édition après la sauvegarde
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
            {testcharts.map((item, index) => {
              // Génère un ID unique basé sur l'index
              const uniqueId = `${index}`;

              return (
                <li key={uniqueId}>
                  {editableItem === uniqueId ? (
                    // Afficher les champs modifiables seulement pour l'élément sélectionné
                    <div className="text-black">
                      <input
                        type="text"
                        name="month"
                        value={item.month}
                        onChange={(e) => handleChange(e, uniqueId)}
                      />
                      <input
                        type="number"
                        name="desktop"
                        value={item.desktop}
                        onChange={(e) => handleChange(e, uniqueId)}
                      />
                      <input
                        type="number"
                        name="mobile"
                        value={item.mobile}
                        onChange={(e) => handleChange(e, uniqueId)}
                      />
                      <Button
                        variant={"outline"}
                        className="text-white mx-2"
                        onClick={(e) => handleSave(e, uniqueId)}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : (
                    // Afficher les données en lecture seule
                    <div onClick={() => handleEdit(uniqueId)}>
                      {item.month}: Desktop: {item.desktop}, Mobile:{" "}
                      {item.mobile}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          {/* Passer setTestcharts comme prop */}
          <InsertDataComponent setTestcharts={setTestcharts} />
        </div>
        <ChartMongo chartData={testcharts} />
      </div>
    </>
  );
}
