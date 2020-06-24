export default (color) => {
    let bgColor = null

    switch(color) {
        case 'Alimentação':
            bgColor = '#c71818'
        break;
        case 'Educação':
            bgColor = '#03a1fc'
        break;
        case 'Lazer':
            bgColor = '#009908'
        break;
        case 'Moradia':
            bgColor = '#e3ae00'
        break;
        case 'Pagamentos':
            bgColor = '#9044cf'
        break;
        case 'Roupas':
            bgColor = '#00bfa3'
        break;
        case 'Saúde':
            bgColor = '#153dcf'
        break;
        case 'Transporte':
            bgColor = '#cf0072'
        break;
        case 'Educação':
            bgColor = '#008acf'
        break;
        default:
            bgColor = ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
        break;
    }
    return bgColor;
}
