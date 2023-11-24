import ReactApexChart from "react-apexcharts";

export default function BarChart() {

    let state = {

        series: [{
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                    'United States', 'China', 'Germany'
                ],
            },
            title: {
                text: 'Ingressos Mais Vendidos',
                floating: true,
                offsetY: 330,
                align: 'center',
                style: {
                    color: '#444'
                }
            }
        },


    };



    return (


        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="bar" height={350} width={`230%`}/>
        </div>
    
    )
}