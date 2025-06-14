"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ProductAnalyticsChartProps {
  data: Record<string, { count: number; views: number; interests: number }>
}

export function ProductAnalyticsChart({ data }: ProductAnalyticsChartProps) {
  const categories = Object.keys(data)

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Products",
        data: categories.map((cat) => data[cat].count),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Views",
        data: categories.map((cat) => data[cat].views),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Interests",
        data: categories.map((cat) => data[cat].interests),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Product Analytics by Category",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="h-64 w-full">
      <Bar data={chartData} options={options} />
    </div>
  )
}
