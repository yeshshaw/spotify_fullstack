const {body , validationResult} = require("express-validator") ;

const registerUserValidationRules = [

  body ("username")
]