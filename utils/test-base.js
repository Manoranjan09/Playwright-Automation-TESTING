const base = require('@playwright/test');

exports.customtest =  base.test.extend({
    testDataForOrder :
    {
        email: "kashyapking507@gmail.com",
        password: "Mano123@",
        productName: "ZARA COAT 3"
    } 
}) 