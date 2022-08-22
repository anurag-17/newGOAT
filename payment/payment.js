// 'use strict';

var ApiContracts = require("authorizenet").APIContracts;
var ApiControllers = require("authorizenet").APIControllers;
var utils = require("./utils.js");
var constants = require("./Constant.js");
const user = require("../models/User.js");
const catchAsyncerror = require("../middleware/catchAsyncerror.js");

exports.test = catchAsyncerror(async (req, res, next) => {
// console.log("hi");

  const {
    username,
    email,
    password,
    dob,
    gender,
    Name_of_card,
    card_no,
    Expiry,
    cvc,
    packages,
  } = req.body;
  console.log(req.body);
let month;
  console.log(req.body.Expiry);
  console.log(new Date(req.body.Expiry).getMonth())
  if (new Date(req.body.Expiry).getMonth() === 0) {
    month = "01";
  } else if (new Date(req.body.Expiry).getMonth() === 1) {
    month = "02";
  } else if (new Date(req.body.Expiry).getMonth() === 2) {
    month = "03";
  } else if (new Date(req.body.Expiry).getMonth() === 3) {
    month = "04";
  } else if (new Date(req.body.Expiry).getMonth() === 4) {
    month = "05";
  } else if (new Date(req.body.Expiry).getMonth() === 5) {
    month = "06";
  } else if (new Date(req.body.Expiry).getMonth() === 6) {
    month = "07";
  } else if (new Date(req.body.Expiry).getMonth() === 7) {
    month = "08";
  } else if (new Date(req.body.Expiry).getMonth() === 8) {
    month = "09";
  } else if (new Date(req.body.Expiry).getMonth() === 9) {
    month = "10";
  } else if (new Date(req.body.Expiry).getMonth() === 10) {
    month = "11";
  } else if (new Date(req.body.Expiry).getMonth() === 11) {
    month = "12";
  }
  // console.log(month);
  // console.log(new Date(req.body.Expiry).getFullYear() % 100);
  let Expiry_month = `${month}${new Date(req.body.Expiry).getFullYear() % 100}`;
  // console.log(req.body.Expiry_month);
  var merchantAuthenticationType =
    new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(constants.apiLoginKey);
  merchantAuthenticationType.setTransactionKey(constants.transactionKey);
console.log(req.body.Expiry_month);
  var creditCard = new ApiContracts.CreditCardType();
  creditCard.setCardNumber(`${card_no}`);
  creditCard.setExpirationDate(`${Expiry_month}`);
  creditCard.setCardCode("656");
console.log(Expiry_month);
  var paymentType = new ApiContracts.PaymentType();
  paymentType.setCreditCard(creditCard);

  var customerAddress = new ApiContracts.CustomerAddressType();
  customerAddress.setFirstName("test");
  customerAddress.setLastName("scenario");
  customerAddress.setAddress("123 Main Street");
  customerAddress.setCity("Bellevue");
  customerAddress.setState("WA");
  customerAddress.setZip("98004");
  customerAddress.setCountry("USA");
  customerAddress.setPhoneNumber("000-000-0000");

  var customerPaymentProfileType =
    new ApiContracts.CustomerPaymentProfileType();
  customerPaymentProfileType.setCustomerType(
    ApiContracts.CustomerTypeEnum.INDIVIDUAL
  );
  customerPaymentProfileType.setPayment(paymentType);
  customerPaymentProfileType.setBillTo(customerAddress);

  var paymentProfilesList = [];
  paymentProfilesList.push(customerPaymentProfileType);

  var customerProfileType = new ApiContracts.CustomerProfileType();
  customerProfileType.setMerchantCustomerId(
    "M_" + utils.getRandomString("cust")
  );
  customerProfileType.setDescription("Profile description here");
  customerProfileType.setEmail(utils.getRandomString("cust") + "@anet.net");
  customerProfileType.setPaymentProfiles(paymentProfilesList);

  var createRequest = new ApiContracts.CreateCustomerProfileRequest();
  createRequest.setProfile(customerProfileType);
  createRequest.setValidationMode(ApiContracts.ValidationModeEnum.TESTMODE);
  createRequest.setMerchantAuthentication(merchantAuthenticationType);

  //pretty print request
  //console.log(JSON.stringify(createRequest.getJSON(), null, 2));

  var ctrl = new ApiControllers.CreateCustomerProfileController(
    createRequest.getJSON()
  );

  ctrl.execute(function () {
    var apiResponse = ctrl.getResponse();

    var response = new ApiContracts.CreateCustomerProfileResponse(apiResponse);

    //pretty print response
    //console.log(JSON.stringify(response, null, 2));

    if (response != null) {
      if (
        response.getMessages().getResultCode() ==
        ApiContracts.MessageTypeEnum.OK
      ) {
        console.log(
          "Successfully created a customer profile with id: " +
            response.getCustomerProfileId()
        );
      } else {
        console.log("Result Code: " + response.getMessages().getResultCode());
        console.log(
          "Error Code: " + response.getMessages().getMessage()[0].getCode()
        );
        console.log(
          "Error message: " + response.getMessages().getMessage()[0].getText()
        );
      }
    } else {
      console.log("Null response received");
    }
  });

  if (require.main === module) {
    createCustomerProfile(function () {
      console.log("createCustomerProfile call complete.");
    });
  }
});