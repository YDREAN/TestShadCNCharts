import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Définir les types de props
interface InsertDataProps {
  setTestcharts: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function InsertDataComponent({
  setTestcharts,
}: InsertDataProps) {
  const [month, setMonth] = useState("");
  const [desktop, setDesktop] = useState(0);
  const [mobile, setMobile] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Créer un objet de données
    const data = { month, desktop, mobile };

    try {
      // Envoyer la requête POST
      const res = await fetch("/api/insertdata", {
        next: {
          revalidate: 3,
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Gérer la réponse de l'API
      const result = await res.json();
      setMessage(result.message);

      if (res.ok) {
        // Ajouter les nouvelles données à testcharts pour forcer le rerender
        setTestcharts((prev) => [...prev, { ...data, _id: result.insertedId }]);
      }
    } catch (error) {
      setMessage("Erreur lors de l'envoi des données");
    }
  };

  return (
    <div className="text-black">
      <h1 className="text-white">Ajouter des données à MongoDB</h1>
      <form onSubmit={handleSubmit} className="text-white">
        <Input
          type="text"
          placeholder="Mois"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Desktop"
          value={desktop}
          onChange={(e) => setDesktop(Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(Number(e.target.value))}
        />
        <Button variant={"outline"} type="submit">
          Envoyer
        </Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
