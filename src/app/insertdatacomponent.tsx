import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function InsertDataComponent() {
  const [month, setMonth] = useState("");
  const [desktop, setDesktop] = useState(0);
  const [mobile, setMobile] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    // Créer un objet de données
    const data = { month, desktop, mobile };

    try {
      // Envoyer la requête POST
      const res = await fetch("/api/insertdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Gérer la réponse de l'API
      const result = await res.json();
      setMessage(result.message);
    } catch (error) {
      setMessage("Erreur lors de l'envoi des données");
    }
  };

  return (
    <div className="  text-black">
      <h1 className=" text-white">Ajouter des données à MongoDB</h1>
      <form onSubmit={handleSubmit} className="   text-white">
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
