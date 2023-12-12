const loginSuccessServices = require("../services/auth");
const db = require('../models')
const loginSuccess = async (req, res) => {
  try {
    const { id, tokenUrl } = req.body;
    if (!id && !tokenUrl) throw new Error("khong co id");
    const response = await loginSuccessServices(id, tokenUrl);
    await db.User.update({ tokenUrl: "" }, { where: { id } });
    return res.json(response);
  } catch (error) {
    return {
      success: false,
      mes: "failed",
    };
  }
};
module.exports = {
  loginSuccess,
};
