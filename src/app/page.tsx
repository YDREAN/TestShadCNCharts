import Image from "next/image";
import { Charts1 } from "./chartstest1";
import { ChartCircle1 } from "./chartcircle1";
import { ChartDouble } from "./chartdouble";
import { ChartWave } from "./chartwave";

export default function Home() {
  return (
    <>
      <h1 className="m-5 text-3xl border-b-2  border-black inline-block">
        Premier graphique :
      </h1>
      <div className="">
        <div className="flex     bg-red-500  ">
          <div className="flex items-center justify-center   bg-blue-300 ">
            <Charts1></Charts1>
          </div>
          <div className="flex items-center justify-center  bg-blue-100   ">
            <ChartCircle1></ChartCircle1>
          </div>
          <div className=" ">
            <ChartDouble></ChartDouble>
          </div>
        </div>
        <div className="flex gap-2  p-2  ">
          <div className=" w-1/2">
            <ChartWave></ChartWave>
          </div>
          <div className="flex flex-wrap  justify-between  w-1/2">
            <Charts1></Charts1>
            <ChartCircle1></ChartCircle1>
            <ChartCircle1></ChartCircle1>
            <ChartCircle1></ChartCircle1>
          </div>
        </div>
        <div className="flex gap-2  p-2  ">
          <div className="flex flex-wrap  justify-between  w-1/2">
            <ChartCircle1></ChartCircle1>
            <ChartCircle1></ChartCircle1>
            <ChartCircle1></ChartCircle1>
            <ChartCircle1></ChartCircle1>
          </div>
          <div className=" w-1/2">
            <ChartWave></ChartWave>
          </div>
        </div>

        <div className="flex gap-2 justify-between  p-2  ">
          <div className=" ">
            <Charts1></Charts1>
          </div>
          <div className=" ">
            <ChartCircle1></ChartCircle1>
          </div>
          <div className="">
            <ChartDouble></ChartDouble>
          </div>
          <div className=" ">
            <ChartDouble></ChartDouble>
          </div>
          <div className=" ">
            <ChartDouble></ChartDouble>
          </div>
        </div>
      </div>
    </>
  );
}
