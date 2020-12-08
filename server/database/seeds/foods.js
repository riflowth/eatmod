const foods = [
    {
        id: '1',
        name: 'กาแฟสด',
        type: 'beverage',
        price: '10',
        shop_id: '1'
    },
    {
        id: '2',
        name: 'ชาเขียว',
        type: 'beverage',
        price: '10',
        shop_id: '1'
    },
    {
        id: '3',
        name: 'ชาเย็น',
        type: 'beverage',
        price: '10',
        shop_id: '2'
    },
    {
        id: '4',
        name: 'ชามะนาว',
        type: 'beverage',
        price: '10',
        shop_id: '2'
    },
    {
        id: '5',
        name: 'น้ำใบเตย',
        type: 'beverage',
        price: '10',
        shop_id: '2'
    },
    {
        id: '6',
        name: 'น้ำลำใย',
        type: 'beverage',
        price: '10',
        shop_id: '2'
    },
    {
        id: '7',
        name: 'น้ำกระเจี๊ยบ',
        type: 'beverage',
        price: '10',
        shop_id: '2'
    },
    {
        id: '8',
        name: 'แกงเขียวหวานไก่',
        type: 'food',
        price: '25',
        shop_id: '3'
    },
    {
        id: '9',
        name: 'แกงข่า',
        type: 'food',
        price: '25',
        shop_id: '3'
    },
    {
        id: '10',
        name: 'ข้าวหมูกรอบ',
        type: 'food',
        price: '30',
        shop_id: '4'
    },
    {
        id: '11',
        name: 'บะหมี่เกี๊ยวหมูกรอบ/หมูแดง',
        type: 'noodle',
        price: '25',
        shop_id: '4'
    },
    {
        id: '12',
        name: 'ก๋วยเตี๊ยวต้มยำ',
        type: 'noodle',
        price: '25',
        shop_id: '4'
    },
    {
        id: '13',
        name: 'ก๋วยเตี๊ยวเย็นตาโฟ',
        type: 'noodle',
        price: '25',
        shop_id: '4'
    },
    {
        id: '14',
        name: 'หมูสามชั้นทอด',
        type: 'rice',
        price: '30',
        shop_id: '5'
    },
    {
        id: '15',
        name: 'ผัดเผ็ดปลาดุกใบยี่หร่า',
        type: 'rice',
        price: '30',
        shop_id: '5'
    },
    {
        id: '16',
        name: 'ข้าวไก่ทอดราดแกงกะหรี่',
        type: 'rice',
        price: '30',
        shop_id: '6'
    },
    {
        id: '17',
        name: 'มัสมั่น',
        type: 'rice',
        price: '30',
        shop_id: '6'
    },
    {
        id: '18',
        name: 'ไก่ย่างซอสกะเพรา',
        type: 'rice',
        price: '30',
        shop_id: '6'
    },
    {
        id: '19',
        name: 'ไก่ย่างมัสมั่นไก่',
        type: 'rice',
        price: '30',
        shop_id: '6'
    },
    {
        id: '20',
        name: 'ข้าวหมกไก่',
        type: 'rice',
        price: '30',
        shop_id: '6'
    },
    {
        id: '21',
        name: 'หมูเกาหลี',
        type: 'rice',
        price: '35',
        shop_id: '7'
    },
    {
        id: '22',
        name: 'แกงกะหรี่',
        type: 'rice',
        price: '35',
        shop_id: '7'
    },
    {
        id: '23',
        name: 'ไก่แซ่บ',
        type: 'rice',
        price: '30',
        shop_id: '7'
    },
    {
        id: '24',
        name: 'ไก่ทอดผัดซอส',
        type: 'rice',
        price: '25',
        shop_id: '8'
    },
    {
        id: '25',
        name: 'ยำผักรวมทอด',
        type: 'rice',
        price: '25',
        shop_id: '8'
    },
    {
        id: '26',
        name: 'ปลานึ่งมะนาว',
        type: 'rice',
        price: '20',
        shop_id: '8'
    },
    {
        id: '27',
        name: 'ไก่ทอด',
        type: 'rice',
        price: '25',
        shop_id: '8'
    },
    {
        id: '28',
        name: 'แกงยอดมะพร้าว',
        type: 'rice',
        price: '25',
        shop_id: '8'
    },
    {
        id: '29',
        name: 'ไข่ตุ๋น',
        type: 'rice',
        price: '25',
        shop_id: '8'
    },
    {
        id: '30',
        name: 'ข้าวไก่ย่างน้ำจิ้มแจ่ว',
        type: 'rice',
        price: '30',
        shop_id: '9'
    },
    {
        id: '31',
        name: 'ข้าวแกงกะหรี่ไก่ทอด',
        type: 'rice',
        price: '30',
        shop_id: '9'
    },
    {
        id: '32',
        name: 'ขนมจีนแกงเขียวหวานไก่',
        type: 'rice',
        price: '25',
        shop_id: '9'
    },
    {
        id: '33',
        name: 'ไก่ทอดซอสเปรี้ยวหวาน',
        type: 'rice',
        price: '25',
        shop_id: '9'
    },
    {
        id: '34',
        name: 'ผัดเผ็ดปลาดุก',
        type: 'rice',
        price: '25',
        shop_id: '10'
    },
    {
        id: '35',
        name: 'ไก่คั่วพริก',
        type: 'rice',
        price: '25',
        shop_id: '10'
    },
    {
        id: '36',
        name: 'ผัดกะเพราหมูสับ',
        type: 'rice',
        price: '25',
        shop_id: '10'
    },
    {
        id: '37',
        name: 'น้ำส้ม',
        type: 'beverage',
        price: '10',
        shop_id: '11'
    },
    {
        id: '38',
        name: 'น้ำมะนาว',
        type: 'beverage',
        price: '10',
        shop_id: '11'
    },
    {
        id: '39',
        name: 'น้ำมะพร้าว',
        type: 'beverage',
        price: '10',
        shop_id: '11'
    }
]

exports.seed = function (knex) {
    return knex('foods').del().then(function () {
        return knex('foods').insert(foods);
    });
};
