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

// Investor tạo hàng loạt các phương án thanh toán cho một dự án
// Ban đầu sẽ tạo trước các phương án option và sẽ thêm vào project
const createPaymentOptionForProject = async (projectId, paymentOptions) => {
  const project = await db.ProjectModel.findByPk(projectId);
  if (!project) {
    return {
      status: 404,
      message: "Không tìm thấy dự án",
    };
  }

  // Tạo mới phương án thanh toán
  for (const option of paymentOptions) {
    await db.PaymentOptionModel.create({
      Batch: option.batch,
      Date: option.date,
      Note: option.note,
    });
    await db.PaymentOptionForProjectModel.create({
      ProjectId: projectId,
      PaymentOptionId: option.batch,
    });
  }

  return {
    status: 201,
    message: "Tạo phương án thanh toán thành công",
  };
};

// Lấy danh sách tất cả phương án thanh toán của một dự án
const getPaymentOptionsForProject = async (projectId) => {
  const project = await db.ProjectModel.findByPk(projectId);
  if (!project) {
    return {
      status: 404,
      message: "Không tìm thấy dự án",
    };
  }

  const paymentOptions = await db.PaymentOptionForProjectModel.findAll({
    where: { ProjectId: projectId },
    include: db.PaymentOptionModel,
  });

  return {
    status: 200,
    paymentOptions,
  };
};

module.exports = {
  createOpeningForSale,
  createPaymentOptionForProject,
  getPaymentOptionsForProject,
};
