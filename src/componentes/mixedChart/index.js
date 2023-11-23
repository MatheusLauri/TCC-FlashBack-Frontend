import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import './index.scss'

export default function MixedChart(props) {
    const [userData,setUserData] = useState([...props.usuario])
    const [empresaData,setempresaData] = useState([...props.empresa])
    let listagem = []
    let listagemData = []
    let listagemQtd = []

    let listagem2 = []
    let listagemData2 = []
    let listagemQtd2 = []

    let listagemDatas = []

    //Função que lê o response da API e cria um array listando as datas
    userData.map(item => {
        listagem.push(item.DT_CADASTRO)
    })
    empresaData.forEach(item => {
      listagem2.push(item.DT_CADASTRO)
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
    const resultado2 = contarCadastrosPorDia(listagem2);

    resultado.forEach(item => {
        listagemData.push(item.data)
        listagemQtd.push(item.quantidade)
    })
    resultado2.forEach(item => {
      listagemData2.push(item.data)
      listagemQtd2.push(item.quantidade)
  })

  function unirEOrdenarDatas(array1, array2) {
    // Unir os dois arrays e remover duplicatas usando um Set
    const datasUnicas = new Set([...array1, ...array2]);

    // Converter o Set de volta para um array e ordenar as datas
    const datasOrdenadas = Array.from(datasUnicas).sort((a, b) => new Date(a) - new Date(b));

    return datasOrdenadas;
}
  listagemDatas = unirEOrdenarDatas(listagemData,listagemData2)

   //console.log(listagemDatas,listagemQtd,listagemQtd2)

    let state = {
            
        series: [{
          name: 'Cadastro de Clientes',
          type: 'column',
          data: listagemQtd,
        },
         {
          name: 'Cadastro de Empresas',
          type: 'line',
          data: listagemQtd2
        }],
        options: {
         
          chart: {
            height: 350,
            type: 'line',
            
          },
          stroke: {
            width: [0, 4],
          },
          title: {
            text: 'Controle de Cadastros'
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
          },
          labels: listagemDatas,
          xaxis: {
            type: 'datetime'
          },
          yaxis: [{
            title: {
              text: '',
            },
          
          }, {
            opposite: true,
            title: {
              text: ''
            }
          }]
        },
        
      
    }

    return(
        <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
    )
}