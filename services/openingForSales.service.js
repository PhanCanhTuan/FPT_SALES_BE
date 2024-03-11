const db = require("../config/db");

// Lấy thông tin các đợt mở bán của dự án
const getOpeningForSalesByProject = async (projectId) => {
  const openingForSales = await db.OpeningForSalesModel.findAll({
    where: { ProjectId: projectId },
    include: [db.ProjectModel],
  });

  return {
    status: 200,
    message: "Lấy danh sách đợt mở bán thành công",
    data: openingForSales,
  };
};

module.exports = {
  getOpeningForSalesByProject,
};
