import ReactApexChart from "react-apexcharts";

export default function BasicAreaChart(props) {
    const dadosDaApi = props.v

    const quantidades = [];
    const datas = [];

    if (dadosDaApi){
        dadosDaApi.forEach(item => {
            quantidades.push(item.QTD_ITENS);
            datas.push(item.DT_INGRESSO);
        });
    }
    
      
      


    let state = {

        series: [{
            name: "Vendas",
            data: quantidades,
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
            labels: datas,
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
            <ReactApexChart options={state.options} series={state.series} type="area" height={550} width={'150%'}/>
        </div>


    );
}