const db = require("../config/db");

// Lấy thông tin các đợt mở bán của dự án
const changePaymentStatus = async (PaymentProcessId) => {
  const paymentProcessDetail = await db.PaymentProcessDetailModel.findByPk(
    PaymentProcessId,
    {
      include: [db.PaymentProcessModel],
    }
  );

  if (!paymentProcessDetail) {
    return {
      status: 404,
      message: "Không tìm thấy paymentProcessDetail",
    };
  }

  paymentProcessDetail.Status = "Paid";

  await paymentProcessDetail.save();

  return {
    status: 200,
    message: "Cập nhật thành công trạng thái của paymentProcessDetail",
    data: paymentProcessDetail,
  };
};

module.exports = {
  changePaymentStatus,
};
