const db = require("../config/db");

/*

Thực hiện việc đặt cọc một project
Các thông tin cần truyền là:
+ ProjectId 
+ CustomerId
+ AgencyId
+ SelectionMethod
+ AmountDeposit
*/

const depositProject = async ({
  projectId,
  customerId,
  agencyId,
  selectionMethod,
  AmountDeposit,
}) => {
  // Kiểm tra xem có project đó chưa và có customerId và agencyId đó không
  const project = await db.ProjectModel.findByPk(projectId);
  const customer = await db.CustomerModel.findByPk(customerId);
  const agency = await db.AgencyModel.findByPk(agencyId);
  if (!project) {
    return {
      status: 404,
      mes: "Project not found",
    };
  }
  if (!customer) {
    return {
      status: 404,
      mes: "Customer not found",
    };
  }
  if (!agency) {
    return {
      status: 404,
      mes: "Agency not found",
    };
  }

  // Validate nếu không có selectionMethod và AmountDeposit thì trả về lỗi 400
  if (!selectionMethod || !AmountDeposit) {
    return {
      status: 400,
      mes: "SelectionMethod and AmountDeposit is required",
    };
  }

  // Trả về thông tin booking
  const bookingData = await db.BookingModel.create({
    ProjectId: projectId,
    CustomerId: customerId,
    AgencyId: agencyId,
    SelectionMethod: selectionMethod,
    Status: "Pedding",
    IsSelected: false,
    BookingDate: new Date(),
    AmountDeposit: AmountDeposit,
  });
  return {
    status: 201,
    mes: "Deposit project successful",
    data: bookingData,
  };
};

// Lấy ra những booking nào có trạng thái là pedding
const getBookingPedding = async () => {
  const booking = await db.BookingModel.findAll({
    where: {
      Status: "Pedding",
    },
    include: [
      {
        model: db.ProjectModel,
      },
      {
        model: db.CustomerModel,
      },
      {
        model: db.AgencyModel,
      },
    ],
  });
  return {
    status: 200,
    mes: "Get booking pedding successful",
    data: booking,
  };
};

// Thay đổi trạng thái của booking thành approved
const approveBooking = async (bookingId) => {
  const booking = await db.BookingModel.findByPk(bookingId);
  if (!booking) {
    return {
      status: 404,
      mes: "Booking not found",
      data: null,
    };
  }

  //  Nếu là trạng thái đã approved thì trả về lỗi 400
  if (booking.Status === "Approved") {
    return {
      status: 400,
      mes: "Booking is already approved",
      data: null,
    };
  }

  booking.Status = "Approved";
  await booking.save();
  return {
    status: 200,
    mes: "Approve booking successful",
    data: null,
  };
};

// Lấy 1 booking cụ thể theo bookingID
const getBookingById = async (bookingId) => {
  const booking = await db.BookingModel.findByPk(bookingId, {
    include: [
      {
        model: db.ProjectModel,
      },
      {
        model: db.CustomerModel,
      },
      {
        model: db.AgencyModel,
      },
    ],
  });
  if (!booking) {
    return {
      status: 404,
      mes: "Booking not found",
    };
  }
  return {
    status: 200,
    mes: "Get booking successful",
    data: booking,
  };
};

// Lấy ra những booking nào có trạng thái là approved
const getBookingApproved = async () => {
  const booking = await db.BookingModel.findAll({
    where: {
      Status: "Approved",
    },
    include: [
      {
        model: db.ProjectModel,
      },
      {
        model: db.CustomerModel,
      },
      {
        model: db.AgencyModel,
      },
    ],
  });
  return {
    status: 200,
    mes: "Get booking approved successful",
    data: booking,
  };
};

// Lấy danh sách booking hiện có
const getAllBooking = async () => {
  const bookings = await db.BookingModel.findAll({
    include: [
      {
        model: db.ProjectModel,
      },
      {
        model: db.CustomerModel,
      },
      {
        model: db.AgencyModel,
      },
    ],
  });
  return {
    status: 200,
    mes: "Lấy thành công danh sách booking hiện có",
    data: bookings,
  };
};

/*
Lợi - API Rejected Booking
*/
const rejectBooking = async (bookingId) => {
  const booking = await db.BookingModel.findByPk(bookingId);
  if (!booking) {
    return {
      status: 404,
      mes: "Booking not found",
      data: null,
    };
  }

  //  Nếu là trạng thái đã approved thì trả về lỗi 400
  if (booking.Status === "Approved") {
    return {
      status: 400,
      mes: "Booking is already approved",
      data: null,
    };
  }

  booking.Status = "Rejected";
  await booking.save();
  return {
    status: 200,
    mes: "Reject booking successful",
    data: null,
  };
};

/*
Lợi - API Rejected Booking With status "Approved" -> "Rejected"
*/
const rejectApprovedBooking = async (bookingId) => {
  const booking = await db.BookingModel.findByPk(bookingId);
  if (!booking) {
    return {
      status: 404,
      mes: "Booking not found",
      data: null,
    };
  }

  //  Nếu là trạng thái là "Approved" thì trả về đổi trạng thái thành "Rejected"
  if (booking.Status === "Approved" && booking.IsSelected === false) {
    booking.Status = "Rejected";
    await booking.save();
    return {
      status: 200,
      mes: "Reject booking successful",
      data: null,
    };
  }
  return {
    status: 400,
    mes: "Booking is not approved or is selected",
    data: null,
  };
};

// Lấy ra các paymentOption của một booking từ bảng PaymentProcess
const getPaymentOptionByBooking = async (bookingId) => {
  const paymentProcess = await db.PaymentProcessModel.findOne({
    where: { BookingId: bookingId },
  });
  if (!paymentProcess) {
    return {
      status: 404,
      mes: "Không tìm thấy đợt trả nợ",
    };
  }

  // Lấy ra được Booking và đi tìm Project
  const booking = await db.BookingModel.findByPk(bookingId);
  const project = await db.ProjectModel.findByPk(booking.ProjectId);
  if (!project) {
    return {
      status: 404,
      mes: "Không tìm thấy dự án",
    };
  }

  // Lấy được ProjectId, và ở bảng paymentProcess có paymentMethod rồi
  // Lấy ra phương thức thanh toán của dự án đó
  const paymentOptions = await db.PaymentOptionForProjectModel.findAll({
    where: { ProjectId: project.ProjectId },
    include: db.PaymentOptionModel,
  });

  // Và filter theo paymentMethod của paymentProcess
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

module.exports = {
  depositProject,
  getBookingPedding,
  approveBooking,
  getBookingById,
  getBookingApproved,
  getAllBooking,
  rejectBooking,
  rejectApprovedBooking,
  getPaymentOptionByBooking,
};
