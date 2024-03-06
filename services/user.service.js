const db = require("../config/db");

const getAllUser = async () => {
  return await db.UserModel.findAll();
};

const updateUser = async (id, {
  password,
  role
}) => {
  if(password === undefined || role === undefined) {
    return {
      status: 400,
      message: "Password and role are required"
    }
  }

  let user = await db.UserModel.findOne({
    where: { UserId: id },
  });

  if(!user){
    return {
      status: 404,
      message: "User not found"
    }
  }

  user.Password= password ?? user.Password,
  user.Role= role ?? user.Role

  await user.save();
  return {
    status: 200,
    message: "Update user successful"
  }
}

module.exports = {
  getAllUser,
  updateUser
};
