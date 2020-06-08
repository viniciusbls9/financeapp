export default (tag) => {
    let iconRevenue = null

    switch(tag) {
        case 'Salário':
            iconRevenue = require('../../assets/money.png');
            break;
        case 'Prêmio':
            iconRevenue = require('../../assets/premium.png');
            break;
        case 'Investimento':
            iconRevenue = require('../../assets/growth.png');
            break;
        case 'Presente':
            iconRevenue = require('../../assets/gift.png');
        break;
        case 'Outros':
            iconRevenue = require('../../assets/more-balls.png');
        break;
        case 'Alimentação':
            iconRevenue = require('../../assets/food-white.png');
        break;
        case 'Educação':
            iconRevenue = require('../../assets/book.png');
        break;
        case 'Lazer':
            iconRevenue = require('../../assets/recreation.png');
        break;
        case 'Moradia':
            iconRevenue = require('../../assets/home-white.png');
        break;
        case 'Pagamentos':
            iconRevenue = require('../../assets/payment.png');
        break;
        case 'Roupas':
            iconRevenue = require('../../assets/tshirt.png');
        break;
        case 'Saúde':
            iconRevenue = require('../../assets/medicine.png');
        break;
        case 'Transporte':
            iconRevenue = require('../../assets/transportation.png');
        break;
        case 'Educação':
            iconRevenue = require('../../assets/book.png');
        break;
        case 'Celular':
            iconRevenue = require('../../assets/smartphone.png');
        break;

    }

    return iconRevenue
}
