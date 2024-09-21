import { ChartCircle2 } from "./chartcircle2";
import { Charts2 } from "./chartstest2";
import { ChartWave2 } from "./chartwave2";
import { ChartDouble2 } from "./chartdouble2";
import { ChartVertical } from "./chartvertical";
import { ChartArea } from "./chartarea";
import { LineCharts } from "./linechart";
import { RadarCharts } from "./radarchart";
import { ChartRadial } from "./chartradial";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-4xl  font-bold my-2">Test de Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Top Row */}
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <ChartCircle2></ChartCircle2>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <Charts2></Charts2>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <LineCharts></LineCharts>
          </div>
          <div className="bg-gray-800 row-span-2 p-6 rounded-lg text-center">
            <ChartVertical></ChartVertical>
          </div>

          {/* Middle Row */}
          <div className="bg-gray-800 p-6 rounded-lg col-span-3 text-center  ">
            <ChartArea></ChartArea>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg col-span-2 text-center">
            <ChartWave2></ChartWave2>
          </div>

          {/* Line Chart (spanning multiple columns) */}
          <div className="col-span-1  bg-gray-800 p-6 rounded-lg">
            <RadarCharts></RadarCharts>
          </div>

          {/* Bottom Row */}
          <div className="col-span-1 bg-gray-800 p-6 rounded-lg">
            <LineCharts></LineCharts>
          </div>

          <div className="col-span-1 bg-gray-800 p-6 rounded-lg">
            <ChartRadial></ChartRadial>
          </div>

          <div className="col-span-2 bg-gray-800 p-6 rounded-lg">
            <ChartDouble2></ChartDouble2>
          </div>
          <div className=" bg-gray-800 p-6 rounded-lg">
            <Charts2></Charts2>
          </div>
        </div>
      </div>
    </>
  );
}
