const db = require("../config/db");
const { Op } = require("sequelize");

const getAllAgency = async () => {
  return await db.AgencyModel.findAll({
    include: [db.UserModel],
  });
};

// Lấy danh sách bookong thuộc về Angency
const getBookingByAgency = async (AgencyId) => {
  const response = await db.BookingModel.findAll({
    where: { AgencyId: AgencyId },
    include: [db.CustomerModel, db.ProjectModel],
  });

  // Return response và message
  return {
    status: 200,
    message: "Lấy danh sách booking thuộc về Agency thành công",
    data: response,
  };
};

/*
API - Lợi
2. Thêm property cho bảng OpeningForSalesDetail
- Check xem booking đó phải khác isSelected !== true thì mới được thêm vào 
- Check xem là có bảng openingForSalesDetail thì báo lỗi
- Thêm số đợt thanh toán, và tạo ra số paymentProcess tương ứng
- Xem agency đó có thuộc về project đó không
*/
const createOpeningForSalesDetail = async ({
  AgencyId,
  OpeningForSalesId,
  PropertyId,
  BookingId,
  NumberInstallments,
}) => {
  // Kiểm tra xem có propery đó không
  const property = await db.PropertyModel.findByPk(PropertyId);
  if (!property) {
    return {
      status: 404,
      message: "Không tìm thấy property",
    };
  }

  const booking = await db.BookingModel.findByPk(BookingId);
  if (!booking) {
    return {
      status: 404,
      message: "Không tìm thấy booking",
    };
  }

  if (booking.isSelected === true) {
    return {
      status: 400,
      message: "Booking đã được chọn",
    };
  }

  // Và kiểm tra trạng thái của booking phải là Approved
  if (booking.Status !== "Approved") {
    return {
      status: 400,
      message: "Booking chưa được duyệt",
    };
  }

  // Kiểm tra xem có đợt mở bán đó không
  const openingForSales = await db.OpeningForSalesModel.findByPk(
    OpeningForSalesId
  );
  if (!openingForSales) {
    return {
      status: 404,
      message: "Không tìm thấy đợt mở bán",
    };
  }

  // Kiểm tra xem đợt mở bán đó Status có Opening không
  if (openingForSales.Status !== "Opening") {
    return {
      status: 400,
      message: "Đợt mở bán đã đóng",
    };
  }

  // Kiểm tra xem là angency đó có thuộc về project đó không
  // const agencyProject = await db.AgencyProjectModel.findOne({
  //   AgencyId: AgencyId,
  // });
  // if (!agencyProject) {
  //   return {
  //     status: 400,
  //     message: "Agency không thuộc về project",
  //   };
  // }

  const openingForSalesDetail = await db.OpeningForSalesDetailModel.findByPk(
    booking.OpeningForSalesDetailId
  );

  // Kiểm tra xem có bảng openingForSalesDetail thì báo lỗi
  if (openingForSalesDetail) {
    return {
      status: 400,
      message: "Booking đã được thêm vào đợt mở bán",
    };
  }

  // Kiểm tra xem là property mới chưa được thêm vào đợt mở bán
  const ListAllOpeningForSalesDetail =
    await db.OpeningForSalesDetailModel.findAll({
      where: { PropertyId: PropertyId },
    });
  if (ListAllOpeningForSalesDetail && ListAllOpeningForSalesDetail.length > 0) {
    return {
      status: 400,
      message:
        "Property đã được thêm vào đợt mở bán, vui lòng chọn property khác",
    };
  }

  // Kiểm tra nếu trạng thái booking isSlected = true thì không thể thêm vào đợt mở bán
  if (booking.IsSelected === true) {
    return {
      status: 400,
      message: "Booking đã được chọn",
    };
  }

  const NewOpeningForSalesDetail = await db.OpeningForSalesDetailModel.create({
    OpeningForSalesId: OpeningForSalesId,
    PropertyId: PropertyId,
  });

  // Update trạng thái của booking isSlected = true
  await db.BookingModel.update(
    {
      IsSelected: true,
      OpeningForSalesDetailId: NewOpeningForSalesDetail.OpeningForSalesDetailId,
    },
    { where: { BookingId: BookingId } }
  );

  // Tạo ra số paymentProcess tương ứng
  const paymentProcess = await db.PaymentProcessModel.create({
    BookingId: BookingId,
    TotalAmount: property.Price,
    NumberInstallments: NumberInstallments,
    PaymentDate: new Date(),
    Description: "Không có ghi chú",
    Status: "Not Yet Paid",
  });

  // Tạo ra số paymentProcessDetail tương ứng
  for (let i = 1; i <= NumberInstallments; i++) {
    await db.PaymentProcessDetailModel.create({
      PaymentProcessId: paymentProcess.PaymentProcessId,
      Time: i,
      Amount: property.Price / NumberInstallments,
      Status: "Not Yet Paid",
      Description: "Không có ghi chú",
    });
  }

  return {
    status: 201,
    message: "Thêm booking vào đợt mở bán thành công",
  };
};

/*
Lợi - Đóng đợt mở bán với Status là Closed
*/
const closeOpeningForSales = async (OpeningForSalesId) => {
  const openingForSales = await db.OpeningForSalesModel.findByPk(
    OpeningForSalesId
  );
  if (!openingForSales) {
    return {
      status: 404,
      message: "Không tìm thấy đợt mở bán",
    };
  }

  // Kiểm tra xem đợt mở bán đó Status có Opening không
  if (openingForSales.Status !== "Opening") {
    return {
      status: 400,
      message: "Đợt mở bán đã đóng",
    };
  }

  openingForSales.Status = "Closed";
  await openingForSales.save();
  return {
    status: 200,
    message: "Đóng đợt mở bán thành công",
  };
};

// Tạo mới Agency
const createAgency = async ({
  Username,
  Password,
  Name,
  Email,
  PhoneNumber,
}) => {
  const [user, created] = await db.UserModel.findOrCreate({
    where: { Username },
    defaults: {
      Username,
      Password,
      Role: "agency",
    },
  });
  if (created) {
    const agencies = await db.AgencyModel.findAll();
    if (agencies !== undefined && agencies.length > 0) {
      for (const agency of agencies) {
        if (agency.dataValues.Email === Email) {
          await db.UserModel.destroy({ where: { UserId: user.UserId } });
          return {
            status: 400,
            message: "Email đã được sử dụng",
          };
        }
        if (agency.dataValues.PhoneNumber === PhoneNumber) {
          await db.UserModel.destroy({ where: { UserId: user.UserId } });
          return {
            status: 400,
            message: "Số điện thoại đã được sử dụng",
          };
        }
      }
    }
    const agency = await db.AgencyModel.create({
      UserId: user.UserId,
      Name,
      Email,
      PhoneNumber,
      Status: "Active",
    });
    if (!agency) {
      await db.UserModel.destroy({ where: { UserId: user.UserId } });
    }
    return {
      status: 201,
      message: "Tạo agency thành công",
      data: agency,
    };
  }

  return {
    status: 400,
    message: `Agency với Username ${Username} đã tồn tại`,
  };
};

// Lấy agency theo AgencyId
const getAgencyById = async (AgencyId) => {
  const agency = await db.AgencyModel.findByPk(AgencyId, {
    include: [db.UserModel],
  });
  if (!agency) {
    return {
      status: 404,
      message: "Không tìm thấy Agency",
    };
  }
  return {
    status: 200,
    message: "Lấy Agency thành công",
    data: agency,
  };
};

// Cập nhật thông tin Agency
const updateAgency = async (AgencyId, { Name, Email, PhoneNumber }) => {
  const agency = await db.AgencyModel.findByPk(AgencyId, {
    include: [db.UserModel],
  });
  if (!agency) {
    return {
      status: 404,
      message: "Không tìm thấy Agency",
    };
  }
  const agencies = await db.AgencyModel.findAll({
    where: {
      AgencyId: {
        [Op.ne]: AgencyId,
      },
    },
  });
  if (agencies !== undefined && agencies.length > 0) {
    for (const agency of agencies) {
      if (agency.dataValues.Email === Email) {
        return {
          status: 400,
          message: "Email đã được sử dụng",
        };
      }
      if (agency.dataValues.PhoneNumber === PhoneNumber) {
        return {
          status: 400,
          message: "Số điện thoại đã được sử dụng",
        };
      }
    }
  }

  agency.Name = Name ?? agency.Name;
  agency.Email = Email ?? agency.Email;
  agency.PhoneNumber = PhoneNumber ?? agency.PhoneNumber;

  await agency.save();
  return {
    status: 200,
    message: "Cập nhật thông tin Agency thành công",
    data: agency,
  };
};

// Xóa Agency
const deleteAgency = async (AgencyId) => {
  // Bắt đầu một transaction
  const transaction = await db.sequelize.transaction();
  try {
    const agency = await db.AgencyModel.findByPk(AgencyId, { transaction });
    if (!agency) {
      // Rollback transaction nếu có lỗi
      await transaction.rollback();

      return {
        status: 404,
        message: "Không tìm thấy Agency",
      };
    }

    // Xóa tất cả các User thuộc về Agency cụ thể
    await db.UserModel.destroy({
      where: { UserId: agency.UserId },
      transaction,
    });

    const checkAgencyProjectHaveAgency = await db.AgencyProjectModel.findOne({
      where: { AgencyId },
      transaction,
    });
    if (checkAgencyProjectHaveAgency) {
      // Rollback transaction nếu có lỗi
      await transaction.rollback();

      return {
        status: 400,
        message: "Tồn tại Agency trong AgencyProject. Không thể xóa!",
      };
    }
    const checkBookingHaveAgency = await db.BookingModel.findOne({
      where: { AgencyId },
      transaction,
    });
    if (checkBookingHaveAgency) {
      // Rollback transaction nếu có lỗi
      await transaction.rollback();

      return {
        status: 400,
        message: "Tồn tại Agency trong Booking. Không thể xóa",
      };
    }
    // Thực hiện xóa agency
    await agency.destroy({ transaction });

    // Commit transaction nếu mọi thứ diễn ra thành công
    await transaction.commit();

    // Trả về thông báo thành công
    return {
      status: 200,
      message: "Đã xóa Agency thành công",
    };
  } catch (error) {
    // Rollback transaction nếu có lỗi
    await transaction.rollback();

    // Trả về thông báo lỗi
    return {
      status: 500,
      message: "Đã xảy ra lỗi khi xóa Agency: " + error.message,
    };
  }
};

/*
API - Lợi: Chuyển đổi Status của Agency từ Active sang Inactive, và ngược lại
*/
const changeStatusAgency = async (AgencyId) => {
  const agency = await db.AgencyModel.findByPk(AgencyId);
  if (!agency) {
    return {
      status: 404,
      message: "Không tìm thấy Agency",
    };
  }

  // Nếu trạng thái hiện tại là Active thì chuyển sang Inactive
  if (agency.Status === "Active") {
    agency.Status = "Inactive";
    await agency.save();
    return {
      status: 200,
      message:
        "Chuyển đổi trạng thái Agency thành công, trạng thái hiện tại là Inactive",
    };
  } else if (agency.Status === "Inactive") {
    agency.Status = "Active";
    await agency.save();
    return {
      status: 200,
      message:
        "Chuyển đổi trạng thái Agency thành công, trạng thái hiện tại là Active",
    };
  }

  return {
    status: 400,
    message: "Chuyển đổi trạng thái Agency không thành công",
  };
};

module.exports = {
  getAllAgency,
  getBookingByAgency,
  createOpeningForSalesDetail,
  closeOpeningForSales,
  createAgency,
  getAgencyById,
  updateAgency,
  deleteAgency,
  changeStatusAgency,
};
