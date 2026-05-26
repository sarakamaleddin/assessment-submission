const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const jwt = require('jsonwebtoken');

const token = jwt.sign(
  {
    userId: 1,
    email: 'test@test.com'
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '1h'
  }
);

console.log(token);