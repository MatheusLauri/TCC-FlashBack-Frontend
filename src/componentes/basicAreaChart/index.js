import ReactApexChart from "react-apexcharts";

export default function BasicAreaChart(props) {



    let state = {

        series: [{
            name: "STOCK ABC",
            data: [1,2],
        }],
        options: {
            chart: {
                type: 'area',
                height: 350,
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },

            title: {
                text: 'Análise Geral de Vendas',
                align: 'left'
            },
            subtitle: {
                text: 'Movimentação de valores',
                align: 'left'
            },
            labels: [10-12-2005,10-12-2004] ,
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                opposite: true
            },
            legend: {
                horizontalAlign: 'left'
            }
        },


    };



    return (


        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
        </div>


    );
}