import { useState } from "react";
import ReactApexChart from "react-apexcharts";


export default function ColumnChart(props) {
    console.log(props.cat)
    const [qtd,setQtd] = useState([...props.cat])

            let state = {

                series: [{
                    name: 'Vendas por Categoria',
                    data: [qtd[1] || '0', qtd[2] || '0', qtd[3] || '0', qtd[4] || '0', qtd[5] || '0']
                }],
                options: {
                    chart: {
                        height: 350,
                        type: 'bar',
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 10,
                            dataLabels: {
                                position: 'top', // top, center, bottom
                            },
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function (val) {
                            return val;
                        },
                        offsetY: -20,
                        style: {
                            fontSize: '12px',
                            colors: ["#304758"]
                        }
                    },

                    xaxis: {
                        categories: ["Festas e Shows", "Teatros", "Festa Junina", "Palestras e Congressos", "Infantil"],
                        position: 'top',
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        },
                        crosshairs: {
                            fill: {
                                type: 'gradient',
                                gradient: {
                                    colorFrom: '#D8E3F0',
                                    colorTo: '#BED1E6',
                                    stops: [0, 100],
                                    opacityFrom: 0.4,
                                    opacityTo: 0.5,
                                }
                            }
                        },
                        tooltip: {
                            enabled: true,
                        }
                    },
                    yaxis: {
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false,
                        },
                        labels: {
                            show: false,
                        }

                    },
                    title: {
                        text: 'Vendas por Categoria',
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
                    <ReactApexChart options={state.options} series={state.series} type="bar" height={350} width={`200%`}/>
                </div>


            );
}