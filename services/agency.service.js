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

*/
const createOpeningForSalesDetail = async (
  OpeningForSalesId,
  PropertyId,
  BookingId
) => {
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

  return {
    status: 201,
    message: "Thêm booking vào đợt mở bán thành công",
  };
};

// Tạo mới Agency
const createAgency = async ({ UserId, Name, Email, PhoneNumber }) => {
  const user = await db.UserModel.findByPk(UserId);
  if (!user) {
    return {
      status: 404,
      message: "Không tìm thấy người dùng",
    };
  }
  const agencies = await db.AgencyModel.findAll();
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
  const agency = await db.AgencyModel.create({
    UserId,
    Name,
    Email,
    PhoneNumber,
  });
  return {
    status: 201,
    message: "Tạo agency thành công",
    data: agency,
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
  const agency = await db.AgencyModel.findByPk(AgencyId);
  if (!agency) {
    return {
      status: 404,
      message: "Không tìm thấy Agency",
    };
  }
  const checkAgencyProjectHaveAgency = await db.AgencyProjectModel.findOne({
    where: { AgencyId },
  });
  if (checkAgencyProjectHaveAgency) {
    return {
      status: 400,
      message: "Tồn tại Agency trong AgencyProject. Không thể xóa!",
    };
  }
  const checkBookingHaveAgency = await db.BookingModel.findOne({
    where: { AgencyId },
  });
  if (checkBookingHaveAgency) {
    return {
      status: 400,
      message: "Tồn tại Agency trong Booking. Không thể xóa",
    };
  }
  // Thực hiện xóa agency
  await agency.destroy();

  // Trả về thông báo thành công
  return {
    status: 200,
    message: "Đã xóa Agency thành công",
  };
};

module.exports = {
  getAllAgency,
  getBookingByAgency,
  createOpeningForSalesDetail,
  createAgency,
  getAgencyById,
  updateAgency,
  deleteAgency,
};
