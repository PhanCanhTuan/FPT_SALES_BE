const db = require("../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Tải biến môi trường từ tệp .env

// Đăng ký tài khoản
const register = async ({
  username,
  password,
  fullname,
  phone,
  address,
  email,
}) => {
  try {
    const [user, created] = await db.UserModel.findOrCreate({
      where: { Username: username },
      defaults: {
        Username: username,
        Password: password,
        Role: "customer",
      },
    });

    if (created) {
      const customer = await db.CustomerModel.create({
        UserId: user.UserId,
        FullName: fullname,
        PhoneNumber: phone,
        Address: address,
        Email: email,
      });

      if (customer) {
        const token = jwt.sign(
          {
            id: user.id,
            Username: user.Username,
            Role: user.Role,
            Email: customer.Email,
            PhoneNumber: customer.PhoneNumber,
            Address: customer.Address,
            FullName: customer.FullName,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );

        return {
          status: 201,
          mes: "register successful",
          token: `${token}`,
        };
      } else {
        // Xóa user nếu không tạo được customer
        await db.UserModel.destroy({ where: { UserId: user.UserId } });
      }
    }

    return { status: 400, mes: "User already exists", data: null };
  } catch (error) {
    throw error;
  }
};

// Đăng nhập tài khoản
const login = async ({ username, password }) => {
  try {
    const user = await db.UserModel.findOne({
      where: { Username: username },
    });

    // tìm kiếm customer theo UserId
    const customer = await db.CustomerModel.findOne({
      where: { UserId: user.UserId },
      include: [
        {
          model: db.UserModel,
          as: "User",
        },
      ],
    });
    if (user && customer) {
      // so sánh password
      if (user.Password === password) {
        const token = jwt.sign(
          {
            id: user.UserId,
            Username: user.Username,
            Role: user.Role,
            Email: customer.Email,
            PhoneNumber: customer.PhoneNumber,
            Address: customer.Address,
            FullName: customer.FullName,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );

        return {
          status: 200,
          mes: "login successful",
          token: `${token}`,
        };
      }
    }

    return {
      status: 400,
      mes: "Username or password is incorrect",
      data: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  register,
  login,
};
