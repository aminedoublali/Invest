// 必要なモジュールを読み込みます
const { Chart, PieController, ArcElement, CategoryScale, Legend, Tooltip, LineController, LineElement, PointElement, LinearScale } = require('chart.js');
const ChartDataLabels = require('chartjs-plugin-datalabels');

// 両方のコントローラーと要素を登録します
Chart.register(PieController, ArcElement, LineController, LineElement, PointElement, CategoryScale, Legend, Tooltip, LinearScale);

// Canvasのcontextを取得します
let ctx1 = document.getElementById('myChart').getContext('2d');
let ctx2 = document.getElementById('goldPriceChart').getContext('2d');

// Pie Chart
let myChart = new Chart(ctx1, {
    type: 'pie',
    data: {
        labels: ['GBP', 'USD', 'CHF','EUR','MAD'],
        datasets: [{
            data: [1000, 1000, 1000,1200,1000],
            backgroundColor: [
                '#4650dd',
                '#3787ff',
                ' #ff4958',
                ' #8890ff',
                '#ff6b78'
            ]
        }]
    },
    options: {
        responsive: false,
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                        sum += data;
                    });
                    let percentage = (value*100 / sum).toFixed(2)+"%";
                    return percentage;
                },
                color: '#fff',
            }
        }
    }
});

// Line Chart
let goldPriceChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Gold holdings',
            data: [2178,2288,2143,2210,2106,2095,2206,1787,1912,1361,1591,2199],
            backgroundColor: 'rgba(255, 221, 0, 1)',
            borderColor: 'rgba(255, 153, 0, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                type: 'linear',
            }
        }
    }
});
