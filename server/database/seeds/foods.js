const foods = [
    {   
        id: 1,
        name: 'ข้าวหมูทอด',
        type: 'ข้าว',
        price: 30,
        image_url: '2_1',
        shop_id: 2
    },
    {   
        id: 2,
        name: 'ก๋วยเตี๋ยวน้ำตก',
        type: 'ก๋วยเตี๋ยว',
        price: 25,
        image_url: '1_2',
        shop_id: 1
    },
    {   
        id: 3,
        name: 'ก๋วยเตี๋ยวต้มยำ',
        type: 'ก๋วยเตี๋ยว',
        price: 25,
        image_url: '3_3',
        shop_id: 3
    },
    {   
        id: 4,
        name: 'น้ำใบเตย',
        type: 'เครื่องดื่ม',
        price: 10,
        image_url: '1_4',
        shop_id: 1
    },
    {   
        id: 5,
        name: 'น้ำยาต้านเวทย์',
        type: 'potion',
        price: 20000,
        image_url: '11_5',
        shop_id: 11
    },
    {   
        id: 6,
        name: 'น้ำยาต้านสถานะ',
        type: 'potion',
        price: 20000,
        image_url: '11_6',
        shop_id: 11
    }
];

exports.seed = function(knex) {
    return knex('foods').del().then(function() {
        return knex('foods').insert(foods);
    });
};
