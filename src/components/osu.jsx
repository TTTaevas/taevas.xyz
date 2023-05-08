import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

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
	const [osu, setOsu] = useState({})
  const getOsu = async () => {
    const response = await fetch("/.netlify/functions/osu").then(r => r.json())
    setOsu(response)
  }

  useEffect(() => {
    getOsu()
  }, [])

	if (osu.osu === undefined) {
		return <></>
	}

	function shapeData(ranks) {
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
        pointStyle: false
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
		<div id="osu">
			<Line datasetIdKey="1" data={shapeData(osu.osu)} options={options}/>
      <Line datasetIdKey="1" data={shapeData(osu.taiko)} options={options}/>
      <Line datasetIdKey="1" data={shapeData(osu.fruits)} options={options}/>
      <Line datasetIdKey="1" data={shapeData(osu.mania)} options={options}/>
		</div>
	)
}
