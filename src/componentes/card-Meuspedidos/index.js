import formatData from '../../componentsFunctions/formatData';
import formatHorario from '../../componentsFunctions/formatHorario';
import './index.scss'


export default function Card(props) {

let url = `http://localhost:5000/${props.imagem}`
const verificarDisponibilidade = (datetimeDaAPI) => {
    // Cria um objeto Date para o datetime da API e para o tempo atual
    const datetimeAPI = new Date(datetimeDaAPI);
    const agora = new Date();
    console.log(datetimeAPI)
    // Compara os dois objetos Date
    if (datetimeAPI.getTime() > agora.getTime()) {
      // O datetime da API é posterior ao tempo atual
      return 'Sim';
    } else {
      // O datetime da API é anterior ou igual ao tempo atual
      return 'Não';
    }
  };
  
  // Exemplo de uso
  const datetimeDaAPI = props.data // Substitua isso pelo datetime real da API
  const disponibilidade = verificarDisponibilidade(datetimeDaAPI);



return (
    <div className='primaria'>
            
            <div className='card-info-img'>
                <img src={url} />

                <div className='informacoes-left'>

                    <p>COLOCAR A DATA DPS</p>

                    <div className='infos-filhos'>
                        <h3>{props.evento}</h3>
                        <p>{props.rua} - São Paulo, SP </p>
                    </div>
                </div>
            </div>

            <div className='card-info'>
                <div className='informacoes-rigth'>
                        <div className='filhos-left'>
                                <h3>Disponivel:</h3>
                                <p>{disponibilidade}</p>
                        </div>

                        <div className='filhos-rigth'>
                                <h3>Status:</h3>
                                <p>{props.situacao == true ? 'Pago' : 'Não pago'}</p>
                        </div>
                </div>

                <button onClick={() => props.f('tipos', props.id)}> Visualizar </button>
            </div>
    </div>
);

}