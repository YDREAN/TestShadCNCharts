import { ChartArea } from "./chartscomp/chartarea";
import { ChartMongo } from "./chartscomp/chartmongo";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/getdatacharts");

  // Vérification si la réponse est OK
  if (!res.ok) {
    console.error(
      "Erreur lors de la récupération des données:",
      res.statusText
    );
    return <div>Erreur lors de la récupération des données</div>;
  }

  const testcharts = await res.json();
  console.log(testcharts);

  return (
    <>
      <div className="flex gap-3    items-center justify-center bg-slate-700 w-full h-screen text-white">
        <div>
          <h1 className=" text-3xl  font-bold">Données de MongoDB :</h1>
          <ul className=" m-3">
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
