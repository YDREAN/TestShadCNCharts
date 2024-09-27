import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Fonction PUT pour mettre à jour un document dans MongoDB
export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("testnextjs");
    const collection = db.collection("testcharts");

    const data = await request.json();
    const { _id, month, desktop, mobile } = data;

    // Mettre à jour le document dans MongoDB
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) }, // Chercher par _id
      { $set: { month, desktop, mobile } } // Mettre à jour les champs
    );

    return NextResponse.json({
      message: "Données mises à jour avec succès",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erreur lors de la mise à jour des données",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
