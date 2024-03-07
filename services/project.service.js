const db = require("../config/db");

// Lấy tất cả các dự án hiện tại
const getAllProjects = async () => {
  const listProjects = await db.ProjectModel.findAll({
    include: [db.InvestorModel],
  });
  return {
    status: 200,
    message: "Lấy thành công tất cả dự án",
    data: listProjects,
  };
};

// Lấy dự án theo ProjectId
const getProjectById = async (projectId) => {
  const project = await db.ProjectModel.findByPk(projectId, {
    include: [db.InvestorModel],
  });
  if (!project) {
    return {
      status: 404,
      message: "Dự án không tồn tại",
    };
  }
  return {
    status: 200,
    message: "Lấy dự án thành công",
    data: project,
  };
};

// Lấy tất cả danh sách agency theo dự án
const getAgencyByProject = async (projectId) => {
  const response = await db.AgencyProjectModel.findAll({
    include: [
      {
        model: db.ProjectModel,
        where: { ProjectId: projectId },
      },
      db.AgencyModel,
    ],
  });

  return {
    status: 200,
    message: "Lấy danh sách agency theo dự án thành công",
    data: response,
  };
};
/*
Tạo một project mới
- Các field cần truyền là: 
+ Name: tên dự án
+ InvestorId: id của nhà đầu tư 
+ Location: vị trí dự án
+ Thumbnail: ảnh đại diện
+ Type: loại dự án
+ NumberOfApartments: số lượng căn hộ
+ NumberOfShops: số lượng cửa hàng
+ LandArea: diện tích đất
+ ConstructionDensity: mật độ xây dựng
+ Status: trạng thái dự án
+ StartDate: ngày bắt đầu
+ EndDate: ngày kết thúc
+ Description: mô tả dự án
- Điều kiện kiểm tra
+ Name không được trùng
+ InvestorId phải tồn tại
+ Location không được trùng
+ Các field bắt buộc phải có
*/
const createProject = async ({
  Name,
  InvestorId,
  Location,
  Thumbnail,
  Type,
  NumberOfApartments,
  NumberOfShops,
  LandArea,
  ConstructionDensity,
  Status,
  StartDate,
  EndDate,
  Description,
}) => {
  if (
    !Name ||
    !InvestorId ||
    !Location ||
    !Thumbnail ||
    !Type ||
    !NumberOfApartments ||
    !NumberOfShops ||
    !LandArea ||
    !ConstructionDensity ||
    !Status
  ) {
    return {
      status: 400,
      message: "Thiếu thông tin",
    };
  }

  const project = await db.ProjectModel.findOne({
    where: { Name: Name },
  });

  if (project) {
    return {
      status: 400,
      message: "Tên dự án đã tồn tại",
    };
  }

  const investor = await db.InvestorModel.findByPk(InvestorId);

  if (!investor) {
    return {
      status: 400,
      message: "Nhà đầu tư không tồn tại",
    };
  }

  await db.ProjectModel.create({
    Name,
    InvestorId,
    Location,
    Thumbnail,
    Type,
    NumberOfApartments,
    NumberOfShops,
    LandArea,
    ConstructionDensity,
    Status,
    StartDate,
    EndDate,
    Description,
  });

  return {
    status: 200,
    message: "Tạo dự án thành công",
  };
};

module.exports = {
  getAllProjects,
  getProjectById,
  getAgencyByProject,
  createProject,
};
