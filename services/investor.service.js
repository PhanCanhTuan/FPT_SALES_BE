const db = require("../config/db");

// Investor được xem như là một admin

// 1. Investor tạo ra đợt mở bán (OpeningForSales) cho một project
const createOpeningForSale = async (projectId, startTime, endTime) => {
  const project = await db.ProjectModel.findByPk(projectId);
  if (!project) {
    return {
      status: 404,
      message: "Không tìm thấy dự án",
    };
  }

  // Kiểm tra thời gian endTime không được nhỏ hơn startTime và cả 2 không được nhở hơn thời gian hiện tại
  if (endTime < startTime || startTime < new Date()) {
    return {
      status: 400,
      message: "Thời gian không hợp lệ",
    };
  }

  // Kiểm tra xem dự án đã có đợt mở bán nào chưa
  const openingForSale = await db.OpeningForSalesModel.findOne({
    where: { ProjectId: projectId },
  });
  if (openingForSale) {
    return {
      status: 400,
      message: "Dự án đã có đợt mở bán",
    };
  }

  // Tạo mới đợt mở bán
  await db.OpeningForSalesModel.create({
    ProjectId: projectId,
    StartDate: startTime,
    EndDate: endTime,
    Status: "Opening",
  });

  return {
    status: 201,
    message: "Tạo đợt mở bán thành công",
  };
};

module.exports = {
  createOpeningForSale,
};
