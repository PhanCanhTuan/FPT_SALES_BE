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
    };
  }
  booking.Status = "Approved";
  await booking.save();
  return {
    status: 200,
    mes: "Approve booking successful",
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

module.exports = {
  depositProject,
  getBookingPedding,
  approveBooking,
  getBookingById,
};
