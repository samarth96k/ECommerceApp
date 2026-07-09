import autocannon from "autocannon";

const payload = {
    "address": {
        "firstName": "Samarth",
        "lastName": "A",
        "email": "samarth.23bce10647@vitbhopal.ac.in",
        "street": "WZ232, 12",
        "city": "DELHI",
        "state": "DELHI",
        "zipcode": "110059",
        "country": "INDIA",
        "phone": "9833232"
    },
    "items": [
        {
            "productId": "6a4bb286871712e40eba2d73",
            "name": "Adidas Ultraboost Light",
            "image": [
                "https://res.cloudinary.com/dndx8lwhb/image/upload/v1783345796/urwotjuvuor348urriev.jpg",
                "https://res.cloudinary.com/dndx8lwhb/image/upload/v1783345797/xlj9lfdgehh2oeavqmkf.jpg",
                "https://res.cloudinary.com/dndx8lwhb/image/upload/v1783345797/nrf7mclxouwhhoixeqtv.jpg",
                "https://res.cloudinary.com/dndx8lwhb/image/upload/v1783345796/evhisjifk5o4pmt7mbl5.jpg"
            ],
            "price": 2500,
            "size": "6",
            "quantity": 1
        }
    ],
    "amount": 2510,
    "paymentMethod": "cod"
};

autocannon({
  url: "https://ecommerceapp-zmuu.onrender.com/api/order/place",
  connections: 20,
  amount: 20,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNGJhZmNhODcxNzEyZTQwZWJhMmQ2ZSIsImlhdCI6MTc4MzU3OTI2MywiZXhwIjoxNzgzNTgxMDYzfQ.uP7NrKoh2oFvwpnAIRvhuHoOZJzvjdIj_-mhbXPJJbQ"
  },
  body: JSON.stringify(payload)
}, console.log);