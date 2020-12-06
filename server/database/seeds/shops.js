const shops = [
    {
        name: 'ร้านพี่พจน์',
        location: 'ศูนย์อาหาร',
        type: 'ร้านน้ำ',
        open: '06:00:00',
        close: '14:00:00'
    },
    {
        name: 'Calender coffee',
        location: 'ศูนย์อาหาร',
        type: 'ร้านน้ำ',
        open: '06:00:00',
        close: '16:00:00'
    },
    {
        name: 'ร้านหนุ่ย',
        location: 'ศูนย์อาหาร',
        type: 'ก๋วยเตี๋ยว',
        open: '06:00:00',
        close: '16:00:00'
    },
    {
        name: 'ร้านคุณอุ๊',
        location: 'ศูนย์อาหาร',
        type: 'ข้าวแกง',
        open: '06:00:00',
        close: '13:00:00'
    }
];

exports.seed = function(knex) {
    return knex('shops').del().then(function() {
        return knex('shops').insert(shops);
    });
};