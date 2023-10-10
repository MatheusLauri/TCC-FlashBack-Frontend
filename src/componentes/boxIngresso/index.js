import './index.scss'

export default function BoxIngresso(props){
    const teste = 'http://localhost:5000/' + props.imagem
    let diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    let meses = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    let datetime = new Date(props.data);
    let diaDaSemana = diasDaSemana[datetime.getUTCDay()];
    let diaDoMes = datetime.getUTCDate();
    let mes = meses[datetime.getUTCMonth()];
    let hora = datetime.getUTCHours();
    let minutos = datetime.getUTCMinutes();
    if (hora < 10) {
    hora = "0" + hora;
    }
    if (minutos < 10) {
    minutos = "0" + minutos;
    }
    let resultado = diaDaSemana + ", " + diaDoMes + " de " + mes + " - " + hora + ":" + minutos;
    console.log(teste)
    console.log(props.categoria)
  
    return(

        
        <div className='box-ingresso-main'>
            <div className='box-ingresso-bgbox'>
                <img className='box-ingresso-bg' src={teste}/>
            </div>
            <div className='box-ingresso-content'>
                <div className='box-ingresso-adress'><h1>{resultado}</h1></div>
                <div className='box-ingresso-name'>
                    <h1>{props.nome}</h1>
                    <p>{}</p>
                </div>
            </div>
        </div>
    );
}