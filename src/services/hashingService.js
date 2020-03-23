const bcrypt = require("bcrypt");

exports.generateHashSync = plainTextPassword => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(plainTextPassword, salt);
  return hash;
};

exports.compareHash = (plainTextPassword, passwordHash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainTextPassword, passwordHash, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
