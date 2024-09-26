import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Fonction POST pour insérer des données dans MongoDB
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("testnextjs"); // Nom de ta base de données
    const collection = db.collection("testcharts"); // Nom de ta collection

    // Lire les données de la requête
    const data = await request.json();

    // Insérer les données dans la collection
    const result = await collection.insertOne(data);

    // Retourner une réponse de succès
    return NextResponse.json({
      message: "Données insérées avec succès",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erreur lors de l'insertion des données",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
