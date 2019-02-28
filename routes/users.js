var express = require('express');
var router = express.Router();
const User = require('../schema/User');

router.get('/account', async (req, res, next) => {
  try {
    const loggedUser = await User.findById({_id: req.session._id});

    res.render('account', { loggedUser });
  } catch (e) {
    next(e)
  }
});

module.exports = router;
