const shops = [    
    {
        id: 1,
        name: 'Calender coffee',
        location: 'ศูนย์อาหาร',
        type: 'ร้านน้ำ',
        open: '06:00:00',
        close: '16:00:00'
    },
    {
        id: 2,
        name: 'ร้านพี่พจน์',
        location: 'ศูนย์อาหาร',
        type: 'ร้านน้ำ',
        open: '06:00:00',
        close: '14:00:00'
    },
    {
        id: 3,
        name: 'ร้านครัวกรุงศรี ฮาล้าลฟู้ด',
        location: 'ศูนย์อาหาร',
        type: 'ก๋วยเตี๋ยว',
        open: '07:00:00',
        close: '15:00:00'
    },
    {
        id: 4,
        name: 'ร้านหนุ่ย',
        location: 'ศูนย์อาหาร',
        type: 'ก๋วยเตี๋ยวและอาหารจานเดียว',
        open: '06:00:00',
        close: '16:00:00'
    },
    {
        id: 5,
        name: 'ร้านครัวคุณอุ๊หาดใหญ่',
        location: 'ศูนย์อาหาร',
        type: 'ข้าวแกง',
        open: '06:00:00',
        close: '13:00:00'
    },
    {
        id: 6,
        name: 'ส.วงศเสงี่ยม ฮาล้าล ฟู้ดส์',
        location: 'ศูนย์อาหาร',
        type: 'ข้าวแกงและอาหารจานเดียว',
        open: '06:00:00',
        close: '18:00:00'
    },
    {
        id: 7,
        name: 'ติ๋ว 6',
        location: 'ศูนย์อาหาร',
        type: 'ข้าวแกง',
        open: '06:00:00',
        close: '13:00:00'
    },
    {
        id: 8,
        name: 'ร้านป้าสมจิตต์',
        location: 'ศูนย์อาหาร',
        type: 'ข้าวแกงและอาหารจานเดียว',
        open: '07:00:00',
        close: '15:00:00'
    },
    {
        id: 9,
        name: 'ครัวสุดารัตน์',
        location: 'ศูนย์อาหาร',
        type: 'ข้าวแกง',
        open: '07:00:00',
        close: '16:00:00'
    },
    {
        id: 10,
        name: 'ครัวคุณอู๋',
        location: 'ศูนย์อาหาร',
        type: 'ข้าวแกง',
        open: '06:00:00',
        close: '18:00:00'
    },
    {
        id: 11,
        name: 'จิรพัทธุ์ เครื่องดื่ม',
        location: 'ศูนย์อาหาร',
        type: 'ร้านน้ำ',
        open: '06:00:00',
        close: '18:00:00'
    }
];

exports.seed = function(knex) {
    return knex('shops').del().then(function() {
        return knex('shops').insert(shops);
    });
};