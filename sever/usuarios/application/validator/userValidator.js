const { body, query, param } = require('express-validator');
const { ObjectId } = require('mongodb');

class UserValidator {
  validateUserData = () => {
    return [
      // Validación de FullName
      body('FullName').notEmpty().withMessage('The full name is mandatory').isString(),

      // Validación de password (asegurarse que la contraseña no esté en texto plano)
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
        .optional()
        .isIn(['Male', 'Female']) // Solo permite 'Male' o 'Female' si está presente
        .withMessage("Invalid gender. Please choose 'Male' or 'Female'"), // Mensaje si el valor no es válido

      // Validación de fecha_nacimiento
      body('fecha_nacimiento')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format. Use ISO8601'),

      // Validación de compras_realizadas
      body('compras_realizadas')
        .optional()
        .isArray()
        .withMessage('compras_realizadas must be an array'),

      // Validación de favoritos
      body('favoritos').optional().isArray().withMessage('favoritos must be an array'),

      // Validación de carrito
      body('carrito').optional().isArray().withMessage('carrito must be an array'),

      // Validación de talleres_educativos
      body('talleres_educativos')
        .optional()
        .isArray()
        .withMessage('talleres_educativos must be an array'),

        // para fotos
      body('foto')
      .optional() // Permite que el campo sea opcional
      .isURL() // Verifica que, si está presente, sea una URL válida
      .withMessage('Invalid URL for foto. Please provide a valid URL.'),

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
