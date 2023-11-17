
//Formatar Preços


export default function FormatPreco(vl) {
    const precoTipoFormatado = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(vl)
    return precoTipoFormatado
}