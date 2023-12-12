const db = require("../models");
const JWT = require("jsonwebtoken");
const loginSuccessServices = async (id,tokenUrl) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({ where: { id ,tokenUrl} });
      const accesstoken =
        response &&
        JWT.sign(
          {
            id: response.dataValues.id,
            email: response.dataValues.email,
            role: response.dataValues.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "5d" }
        );
      resolve({
        success: accesstoken ? true : false,
        mes: response ? "done" : "user not exists",
        accesstoken,
      });
    } catch (error) {
      reject({ success: false, mes: "failed" + error });
    }
  });
module.exports = loginSuccessServices;
