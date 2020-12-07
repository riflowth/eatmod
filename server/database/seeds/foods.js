const foods = [
    {   
        id: 1,
        name: 'ข้าวหมูทอด',
        type: 'ข้าว',
        price: 30,
        image_url: 'link01',
        shop_id: 2
    },
    {   
        id: 2,
        name: 'ก๋วยเตี๋ยวน้ำตก',
        type: 'ก๋วยเตี๋ยว',
        price: 25,
        image_url: 'link02',
        shop_id: 3
    },
    {   
        id: 3,
        name: 'ก๋วยเตี๋ยวต้มยำ',
        type: 'ก๋วยเตี๋ยว',
        price: 25,
        image_url: 'link03',
        shop_id: 3
    },
    {   
        id: 4,
        name: 'น้ำใบเตย',
        type: 'เครื่องดื่ม',
        price: 10,
        image_url: 'link04',
        shop_id: 1
    },
    {   
        id: 5,
        name: 'ข้าวผัด',
        type: 'ข้าว',
        price: 30,
        image_url: 'link05',
        shop_id: 3
    },
    {   
        id: 6,
        name: 'ข้าวแกงกะหรี่',
        type: 'ข้าว',
        price: 35,
        image_url: 'link06',
        shop_id: 2
    }
];

exports.seed = function(knex) {
    return knex('foods').del().then(function() {
        return knex('foods').insert(foods);
    });
};
