import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("testnextjs"); // Nom de ta base de données

    const testcharts = await db.collection("testcharts").find({}).toArray();

    return new Response(JSON.stringify(testcharts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erreur lors de la récupération des données" }),
      {
        status: 500,
      }
    );
  }
}
