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
const createPaymentOptionForProject = async (
  projectId,
  paymentMethod,
  paymentOptions
) => {
  // Kiểm tra xem nếu paymentMethod không có thì return lỗi
  if (!paymentMethod) {
    return {
      status: 400,
      message: "Yêu cầu nhập phương thức thanh toán",
    };
  }

  const project = await db.ProjectModel.findByPk(projectId);
  if (!project) {
    return {
      status: 404,
      message: "Không tìm thấy dự án",
    };
  }

  // Kiểm tra xem nếu đã tồn tại phương thức thanh toán rồi thì không cho tạo
  const existedPaymentOption = await db.PaymentOptionForProjectModel.findOne({
    where: { ProjectId: projectId, PaymentMethod: paymentMethod },
  });
  if (existedPaymentOption) {
    return {
      status: 400,
      message: "Phương thức thanh toán đã tồn tại",
    };
  }

  // Tạo mới phương án thanh toán
  for (const option of paymentOptions) {
    const temp = await db.PaymentOptionModel.create({
      Batch: option.batch,
      Date: option.date,
      Note: option.note,
      Percentage: option.percentage,
    });
    await db.PaymentOptionForProjectModel.create({
      ProjectId: projectId,
      PaymentMethod: paymentMethod,
      PaymentOptionId: temp.PaymentOptionId,
    });
  }

  return {
    status: 201,
    message: "Tạo phương án thanh toán thành công",
  };
};

// Lấy danh sách tất cả phương án thanh toán của một dự án theo từng phương thức thanh toán
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

  // Gôm các phương án thanh toán theo từng phương thức thanh toán
  const paymentOptionsGroupByMethod = {};
  for (const option of paymentOptions) {
    if (!paymentOptionsGroupByMethod[option.PaymentMethod]) {
      paymentOptionsGroupByMethod[option.PaymentMethod] = [];
    }
    paymentOptionsGroupByMethod[option.PaymentMethod].push(option);
  }

  return {
    status: 200,
    data: paymentOptionsGroupByMethod,
  };
};

// Cập nhật thông tin phương án thanh toán theo từng phương thức thanh toán
// Và kiểm tra xem phương án đã được sử dụng chưa
// Nếu sử dụng rồi thì không cho update, sử dụng rồi ở đây tức là paymentMethod đã được sử dụng trong bảng PaymentProcess
// Nếu chưa sử dụng thì cho update
const updatePaymentOptionForProject = async (
  projectId,
  paymentMethod,
  paymentOptions
) => {
  const project = await db.ProjectModel.findByPk(projectId);
  if (!project) {
    return {
      status: 404,
      message: "Không tìm thấy dự án",
    };
  }

  const existedPaymentOption = await db.PaymentOptionForProjectModel.findOne({
    where: { ProjectId: projectId, PaymentMethod: paymentMethod },
  });
  if (!existedPaymentOption) {
    return {
      status: 404,
      message: "Không tìm thấy phương thức thanh toán",
    };
  }

  // Kiểm tra xem phương án thanh toán đã được sử dụng chưa
  const paymentProcess = await db.PaymentProcessModel.findOne({
    where: { PaymentOptionId: existedPaymentOption.PaymentOptionId },
  });
  if (paymentProcess) {
    return {
      status: 400,
      message: "Phương án thanh toán đã được sử dụng",
    };
  }

  // Cập nhật phương án thanh toán
  for (const option of paymentOptions) {
    const temp = await db.PaymentOptionModel.create({
      Batch: option.batch,
      Date: option.date,
      Note: option.note,
      Percentage: option.percentage,
    });
    await db.PaymentOptionForProjectModel.update(
      {
        PaymentOptionId: temp.PaymentOptionId,
      },
      {
        where: { ProjectId: projectId, PaymentMethod: paymentMethod },
      }
    );
  }

  return {
    status: 200,
    message: "Cập nhật phương án thanh toán thành công",
  };
};
module.exports = {
  createOpeningForSale,
  createPaymentOptionForProject,
  getPaymentOptionsForProject,
};
