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
import Info from "./structures/info";
import "../style/osu.css"

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
      title="osu!"
      link="https://osu.ppy.sh/users/7276846"
      description="Rhythm games"
      elements={[
        <div>
          <a href="https://osu.ppy.sh/users/7276846/osu" target="_blank" className="gamemode-title">
            <img src="mode-osu.png"></img>
            <h2><strong>osu!</strong></h2>
          </a>
          <div className="bg-white">
            <Line datasetIdKey="1" data={shapeData(osu.osu)} options={options}/>
          </div>
        </div>,
        <div className="mt-6">
          <a href="https://osu.ppy.sh/users/7276846/taiko" target="_blank" className="gamemode-title">
            <img src="mode-taiko.png"></img>
            <h2>osu!<strong>taiko</strong></h2>
          </a>
          <div className="bg-white">
            <Line datasetIdKey="1" data={shapeData(osu.taiko)} options={options}/>
          </div>
        </div>,
      <div className="mt-6">
        <a href="https://osu.ppy.sh/users/7276846/fruits" target="_blank" className="gamemode-title">
          <img src="mode-fruits.png"></img>
          <h2>osu!<strong>catch</strong></h2>
        </a>
        <div className="bg-white">
          <Line datasetIdKey="1" data={shapeData(osu.fruits)} options={options}/>
        </div>
      </div>,
      <div className="mt-6">
        <a href="https://osu.ppy.sh/users/7276846/mania" target="_blank" className="gamemode-title">
          <img src="mode-mania.png"></img>
          <h2>osu!<strong>mania</strong></h2>
        </a>
        <div className="bg-white">
          <Line datasetIdKey="1" data={shapeData(osu.mania)} options={options}/>
        </div>
      </div>
      ]}
    />
	)
}
