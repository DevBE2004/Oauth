const getUserService =require('../services/user')
const getUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) throw new Error("khong co id");
    const response = await getUserService(id);
    return res.json({
      success: true,
      response,
    });
  } catch (error) {
    return res.json({
      success: false,
      mes: "loi ",
    });
  }
};
module.exports = {
  getUser,
};
