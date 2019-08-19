const jwt = require('jsonwebtoken');
const { secret } = require('../configs/jwt');

module.exports = adminInfo => {
    const token = jwt.sign({
        name: adminInfo.name
    }, secret, { expiresIn: '1h' });
    return token;
};
