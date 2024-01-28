const db = require("../config/db");

const getAll = async () => {
  return await db.Property.findAll();
};

const findPropertyById = async (property_id) => {
  // Tìm dữ liệu từ bảng Property theo property_id
  const property = await db.Property.findByPk(property_id);

  if (!property) {
    return null; // Trả về null nếu không tìm thấy property
  }

  // Lấy project_id từ kết quả property
  const project_id = property.project_id;
  console.log(project_id);

  // Sử dụng project_id để tìm dữ liệu từ bảng Project
  const project = await db.Project.findByPk(project_id);

  const items = await db.Item.findAll();
  const propertyItems = await db.PropertyItem.findAll();

  const matchingItems = [];

  // Duyệt qua mỗi propertyItem từ bảng PropertyItem
  propertyItems.forEach((propertyItem) => {
    // So sánh property_id từ PropertyItem với property_id từ Property
    if (propertyItem.property_id == property_id) {
      // Tìm item tương ứng với item_id từ PropertyItem
      const item = items.find((item) => item.item_id == propertyItem.item_id);
      if (item) {
        // Thêm item vào mảng matchingItems nếu tìm thấy
        matchingItems.push(item);
      }
    }
  });

  // Thêm dữ liệu từ bảng Project vào kết quả của bảng Property
  if (project) {
    property.dataValues.project = project;
    property.dataValues.items = matchingItems;
  }

  return property;
};

module.exports = {
  getAll,
  findPropertyById,
};
