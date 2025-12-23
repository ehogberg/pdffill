import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

export async function generateBarChartImage(): Promise<Uint8Array> {
  // Create a canvas element
  const canvas = document.createElement('canvas')
  canvas.width = 500
  canvas.height = 300

  // Generate random data
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const data = labels.map(() => Math.floor(Math.random() * 100) + 20)

  // Create the chart
  const chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Random Data',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
      animation: false,
      plugins: {
        title: {
          display: true,
          text: 'Monthly Statistics',
          font: {
            size: 16,
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })

  // Wait for chart to render
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Convert canvas to blob then to Uint8Array
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob!)
    }, 'image/png')
  })

  // Clean up
  chart.destroy()
  canvas.remove()

  // Convert blob to Uint8Array
  const arrayBuffer = await blob.arrayBuffer()
  return new Uint8Array(arrayBuffer)
}
