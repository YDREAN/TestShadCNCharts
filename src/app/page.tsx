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
      <div className="p-4">
        <div className="flex gap-2 h-full  p-2  ">
          <div className=" w-1/3">
            <Charts1></Charts1>
          </div>
          <div className=" w-1/3">
            <ChartCircle1></ChartCircle1>
          </div>
          <div className=" w-1/3">
            <ChartDouble></ChartDouble>
          </div>
        </div>
        <div className="flex gap-2 h-full  p-2  ">
          <div className=" w-1/2">
            <ChartWave></ChartWave>
          </div>
          <div className=" w-1/2">
            <ChartWave></ChartWave>
          </div>
        </div>

        <div className="flex gap-2 h-full justify-between  p-2  ">
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
