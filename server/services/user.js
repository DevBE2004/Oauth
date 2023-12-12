const db = require("../models");

const getUserService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({ where: { id } });
      if (!response) throw new Error("xay ra 1 loi trong qua trinh thuc hienj");
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

module.exports = getUserService;
