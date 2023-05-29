import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Info from "./structure";
import "../../style/infos/osu.css"

export type OsuInfo = {
	osu: number[]
  taiko: number[]
  fruits: number[]
  mania: number[]
} | undefined

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Osu() {
	const [osu, setOsu]: [OsuInfo, React.Dispatch<React.SetStateAction<OsuInfo>>] = useState()
  const getOsu = async () => {
    const response = await fetch("/.netlify/functions/osu").then(r => r.json())
    setOsu(response)
  }

  useEffect(() => {
    getOsu()
  }, [])

	if (osu === undefined) {
		return <></>
	}

	function shapeData(ranks: number[]) {
		let labels = ranks.map((r, i) => `${i + 1} days ago`).reverse()
		return {
			labels,
			datasets: [{
				id: 1,
				label: "",
				data: ranks,
        borderColor: `rgb(
          ${String(ranks[0]).slice(-2)},
          ${String(ranks[ranks.length/2]).slice(-2)},
          ${String(ranks[ranks.length-1]).slice(-2)}
        )`,
        tension: 0.5,
        fill: false,
        pointStyle: false as false
			}]
		}
	}

  let options = {
    scales: {
      y: {
        reverse: true,
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }

	return (
    <Info
      type="Rhythm games"
      websites={[{
        name: "osu!",
        link: "https://osu.ppy.sh/users/7276846/osu",
        elements: [
          <div className="bg-white w-60 mx-auto">
            <Line datasetIdKey="1" data={shapeData(osu.osu)} options={options}/>
          </div>
        ]
      }, {
        name: "osu!taiko",
        link: "https://osu.ppy.sh/users/7276846/taiko",
        elements: [
          <div className="bg-white w-60 mx-auto">
            <Line datasetIdKey="1" data={shapeData(osu.taiko)} options={options}/>
          </div>
        ]
      }, {
        name: "osu!catch",
        link: "https://osu.ppy.sh/users/7276846/fruits",
        elements: [
          <div className="bg-white w-60 mx-auto">
            <Line datasetIdKey="1" data={shapeData(osu.fruits)} options={options}/>
          </div>
        ]
      }, {
        name: "osu!mania",
        link: "https://osu.ppy.sh/users/7276846/mania",
        elements: [
          <div className="bg-white w-60 mx-auto">
            <Line datasetIdKey="1" data={shapeData(osu.mania)} options={options}/>
          </div>
        ]
      }]}
    />
	)
}
