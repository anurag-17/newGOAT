// // 'use strict';

// var ApiContracts = require("authorizenet").APIContracts;
// var ApiControllers = require("authorizenet").APIControllers;
// var utils = require("./utils.js");
// var constants = require("./Constant.js");
// const user = require("../models/User.js");
// const catchAsyncerror = require("../middleware/catchAsyncerror.js");


//   exports.test = catchAsyncerror(async (req, res, next) => {
//     const create_payment_json = {
//       "intent": "sale",
//       "payer": {
//           "payment_method": "paypal"
//       },
//       "redirect_urls": {
//           "return_url": "http://localhost:3000/success",
//           "cancel_url": "http://localhost:3000/cancel"
//       },
//       "transactions": [{
//           "item_list": {
//               "items": [{
//                   "name": "Red Sox Hat",
//                   "sku": "001",
//                   "price": "25.00",
//                   "currency": "USD",
//                   "quantity": 1
//               }]
//           },
//           "amount": {
//               "currency": "USD",
//               "total": "25.00"
//           },
//           "description": "Hat for the best team ever"
//       }]
//   };
  
  
//     paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//       if (error) {
//           console.log(error.response);
//           throw error;
//       } else {
//           console.log(JSON.stringify(payment));
//           res.send('Success');
//       }
//   });
//   });
  
//     paypal.payment.create(create_payment_json, function (error, payment) {
//         if (error) {
//             throw error;
//         } else {
//             for(let i = 0;i < payment.links.length;i++){
//               if(payment.links[i].rel === 'approval_url'){
//                 res.redirect(payment.links[i].href);
//               }
//             }
//         }
//       });
      
      
//    exports.success = catchAsyncerror(async (req, res, next) => {
//         const payerId = req.query.PayerID;
//         const paymentId = req.query.paymentId;
      
//         const execute_payment_json = {
//           "payer_id": payerId,
//           "transactions": [{
//               "amount": {
//                   "currency": "USD",
//                   "total": "25.00"
//               }
//           }]
//         };
//       })
