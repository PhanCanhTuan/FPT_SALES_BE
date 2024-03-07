const db = require("../config/db");

/*
Lợi - Tạo mới một property
- Các field cần truyền là: 
+ ProjectId
+ Type
+ Floor
+ ApartmentNumber
+ ShopNumber
+ Area
+ Price
+ Description
- Các điều kiện validate
+ ProjectId phải tồn tại
+ Type không được trống
+ Floor không được trống
+ ApartmentNumber không được trống
+ ShopNumber không được trống
+ Area không được trống
+ Price không được trống
*/
const createProperty = async ({
  ProjectId,
  Type,
  Floor,
  ApartmentNumber,
  ShopNumber,
  Area,
  Price,
  Description,
}) => {
  if (
    !ProjectId ||
    !Type ||
    !Floor ||
    !ApartmentNumber ||
    !ShopNumber ||
    !Area ||
    !Price
  ) {
    return {
      status: 400,
      message: "Các trường không được để trống",
    };
  }

  const project = await db.ProjectModel.findByPk(ProjectId);
  if (!project) {
    return {
      status: 404,
      message: "Không tìm thấy dự án",
    };
  }

  await db.PropertyModel.create({
    ProjectId,
    Type,
    Floor,
    ApartmentNumber,
    ShopNumber,
    Area,
    Price,
    Description,
  });

  return {
    status: 201,
    message: "Tạo mới property thành công",
  };
};

module.exports = {
  createProperty,
};
