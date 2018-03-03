const express = require('express');
const router = express.Router();
const storeController = require('../controllers/companyController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

router.post('/login', authController.login);

// 1. Validate the registration data
// 2. register the user
// 3. we need to log them in
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
);

router.post('/reviews/:id',
  authController.isLoggedIn,
  catchErrors(reviewController.addReview)
);

module.exports = router;
