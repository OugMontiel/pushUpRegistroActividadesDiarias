const { body, query, param } = require('express-validator');
const { ObjectId } = require('mongodb');

class UserValidator {
  validateUserData = () => {
    return [
      // Validación de nombre_usuario
      body('nombre_usuario').notEmpty().withMessage('The user name is mandatory').isString(),

      // Validación de password (asegurarse que la contraseña no esté en texto plano)
      body('password')
        .notEmpty()
        .withMessage('send a password')
        .isLength({ min: 5 })
        .withMessage('password must be at least 5 characters long'),

      // Validación de email
      body('email')
        .notEmpty()
        .withMessage('send a email')
        .isEmail()
        .withMessage('Please enter a valid email address'),

      // Validación para asegurarse de que no haya ningún query en la URL
      query().custom((value, { req }) => {
        if (Object.keys(req.query).length > 0) {
          throw new Error(`Don't send anything in the url`);
        }
        return true;
      }),
    ];
  };

  validateUserId = () => {
    return [
      // Validación del ID
      param('id').custom((value, { req }) => {
        if (!ObjectId.isValid(value)) {
          throw new Error('Submit a valid ID');
        }
        return true;
      }),

      // Validación para asegurarse de que no haya ningún query en la URL
      query().custom((value, { req }) => {
        if (Object.keys(req.query).length > 0) {
          throw new Error(`Don't send anything in the url`);
        }
        return true;
      }),

      // Validación para asegurarse de que no haya ningún dato en el body
      body().custom((value, { req }) => {
        if (Object.keys(req.body).length > 0) {
          throw new Error('Do not send anything in the body');
        }
        return true;
      }),
    ];
  };

  validateUserUpdateById = () => {
    return [
      // Validación del ID
      param('id').custom((value, { req }) => {
        if (!ObjectId.isValid(value)) {
          throw new Error('Submit a valid ID');
        }
        return true;
      }),

      // Validación de nameUser
      body('nameUser')
        .notEmpty()
        .withMessage('The name is mandatory')
        .isString()
        .isLength({ min: 5, max: 12 })
        .withMessage('The name must be between 5 and 12 characters long'),

      // Validación de FullName
      body('FullName').notEmpty().withMessage('The full name is mandatory').isString(),

      // Validación de password
      body('password')
        .notEmpty()
        .withMessage('send a password')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long'),

      // Validación de email
      body('email')
        .notEmpty()
        .withMessage('send a email')
        .isEmail()
        .withMessage('Please enter a valid email address'),

      // Validación de Gender
      body('Gender')
        .notEmpty()
        .withMessage('Gender is required')
        .isIn(['Male', 'Female'])
        .withMessage("Invalid gender. Please choose 'Male' or 'Female'"),

      // Validación para asegurarse de que no haya ningún query en la URL
      query().custom((value, { req }) => {
        if (Object.keys(req.query).length > 0) {
          throw new Error(`Don't send anything in the url`);
        }
        return true;
      }),
    ];
  };
}

module.exports = UserValidator;
