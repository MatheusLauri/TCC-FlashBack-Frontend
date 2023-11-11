import { useState } from "react";
import ReactApexChart from "react-apexcharts";


export default function MixedChart(props) {
    const [userData,setUserData] = useState([...props.usuario])
    const [empresaData,setempresaData] = useState([...props.empresa])
    let listagem = []
    let listagemData = []
    let listagemQtd = []

    //Função que lê o response da API e cria um array listando as datas
    userData.map(item => {
        listagem.push(item.DT_CADASTRO)
    })

    //Função que pega o array de datas, transforma-os em chaves unicas e lista por qtd
    function contarCadastrosPorDia(arrayDeDatas) {
        const frequencia = {};
    
        arrayDeDatas.forEach(data => {
            if (frequencia[data]) {
                frequencia[data] += 1;
            } else {
                frequencia[data] = 1;
            }
        });
    
        const resultado = Object.entries(frequencia).map(([data, quantidade]) => {
            return { data, quantidade };
        });
        return resultado;
    }
    
    const resultado = contarCadastrosPorDia(listagem);
    resultado.forEach(item => {
        listagemData.push(item.data)
        listagemQtd.push(item.quantidade)
    })
    console.log(listagemData,listagemQtd)


    let state = {
        series: [{
          name: 'Cadastro de Clientes',
          type: 'column',
          data: listagemQtd
        },
         {
          name: 'Cadastro de Empresas',
          type: 'line',
          data: [440, 505, 414, 671, 227]
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
          },
          stroke: {
            width: [0, 4]
          },
          title: {
            text: 'Controle de Cadastros'
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [0,1],
            style: {
                colors: ['#520ad9', '#F9DD4A']
            }
          },
          labels: listagemData,
          xaxis: {
            type: 'datetime'
          },
          yaxis: [{
            title: {
              text: 'Cadastro de Clientes',
            },
          
          }, {
            opposite: true,
            title: {
              text: 'Cadastro de Empresas'
            }
          }]
        },
        
      
    }

    return(
        <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
    )
}