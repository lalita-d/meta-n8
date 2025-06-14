"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

interface UserStatsChartProps {
  data: Record<string, number>
}

export function UserStatsChart({ data }: UserStatsChartProps) {
  const chartData = {
    labels: Object.keys(data).map((key) => key.charAt(0).toUpperCase() + key.slice(1)),
    datasets: [
      {
        label: "Users by Type",
        data: Object.values(data),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "User Distribution by Type",
      },
    },
  }

  return (
    <div className="h-64 w-full">
      <Pie data={chartData} options={options} />
    </div>
  )
}
