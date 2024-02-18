CREATE DATABASE FPT_SALES_DEMO3

CREATE TABLE Investor (
    InvestorId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255),
    Email NVARCHAR(255) UNIQUE,
    PhoneNumber NVARCHAR(20),
    Address NVARCHAR(MAX)
);

CREATE TABLE Project (
    ProjectId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255),
    InvestorId INT,
    Location NVARCHAR(255),
    Thumbnail NVARCHAR(255),
    Type NVARCHAR(100),
    NumberOfApartments INT,
    NumberOfShops INT,
    LandArea FLOAT,
    ConstructionDensity FLOAT,
    Status NVARCHAR(100),
    StartDate DATE,
    EndDate DATE,
    Description NVARCHAR(MAX),
    FOREIGN KEY (InvestorId) REFERENCES Investor(InvestorId)
);

CREATE TABLE Property (
    PropertyId INT IDENTITY(1,1) PRIMARY KEY,
    ProjectId INT,
    Type NVARCHAR(100),
    Floor INT,
    ApartmentNumber NVARCHAR(50),
    ShopNumber NVARCHAR(50),
    Area FLOAT,
    Price DECIMAL(18, 2),
    Description NVARCHAR(MAX),
    FOREIGN KEY (ProjectId) REFERENCES Project(ProjectId)
);


-- Bảng Agency - Đại Lý: Chứa thông tin về các đại lý, bao gồm tên, email và số điện thoại.
CREATE TABLE Agency (
    AgencyId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255),
    Email NVARCHAR(255),
    PhoneNumber NVARCHAR(20)
);

-- Bảng AgencyProject - Quan Hệ Đại Lý và Dự Án: Mô tả mối quan hệ nhiều-nhiều giữa các đại lý và dự án, cho phép một đại lý quản lý nhiều dự án và một dự án có thể được quản lý bởi nhiều đại lý.
CREATE TABLE AgencyProject (
    AgencyProjectId INT IDENTITY(1,1) PRIMARY KEY,
    AgencyId INT,
    ProjectId INT,
    FOREIGN KEY (AgencyId) REFERENCES Agency(AgencyId),
    FOREIGN KEY (ProjectId) REFERENCES Project(ProjectId)
);


-- Bảng Booking - Đặt Cọc: Thông tin đặt cọc của khách hàng đã được lưu ở đây, bao gồm thông tin khách hàng, dự án họ quan tâm, và ngày đặt cọc. Trạng thái đặt cọc có thể được cập nhật để phản ánh việc khách hàng đã chuyển sang giai đoạn quay số ngẫu nhiên hoặc chờ mua căn hộ.
CREATE TABLE Booking (
    BookingId INT IDENTITY(1,1) PRIMARY KEY,
    ProjectId INT,
    CustomerName NVARCHAR(255),
    CustomerEmail NVARCHAR(255),
    CustomerPhoneNumber NVARCHAR(20),
    BookingDate DATE,
	-- Pending" (Chờ xử lý), "Confirmed" (Đã xác nhận), "Cancelled" (Đã hủy), "Completed" (Hoàn thành)
    Status NVARCHAR(100), 
    SelectionMethod NVARCHAR(100), -- "Random" hoặc "DepositTime"
    IsSelected BIT DEFAULT 0, -- 0 chưa được chọn, 1 đã được chọn
    FOREIGN KEY (ProjectId) REFERENCES Project(ProjectId)
);

-- Bảng OpeningForSales - Đợt Mở Bán: Đại diện cho các đợt mở bán của dự án, bao gồm thông tin về thời gian bắt đầu, kết thúc và trạng thái của đợt mở bán.
CREATE TABLE OpeningForSales (
    OpeningForSalesId INT IDENTITY(1,1) PRIMARY KEY,
    ProjectId INT,
    StartDate DATE,
    EndDate DATE,
	-- "Planned" - Đợt mở bán đã được lên kế hoạch nhưng chưa bắt đầu.
	-- "Active" - Đợt mở bán đang diễn ra.
	-- "Paused" - Đợt mở bán tạm thời bị hoãn hoặc dừng lại.
	-- "Completed" - Đợt mở bán đã kết thúc, tất cả các sản phẩm/bất động sản đã được bán hoặc không còn trong thời gian mở bán.
	-- "Cancelled" - Đợt mở bán bị hủy bỏ, có thể do các vấn đề pháp lý, tài chính hoặc thay đổi trong kế hoạch kinh doanh.
    Status NVARCHAR(100),
    FOREIGN KEY (ProjectId) REFERENCES Project(ProjectId)
);


-- Bảng OpeningForSalesDetail - Chi Tiết Đợt Mở Bán: Lưu trữ thông tin chi tiết về các bất động sản được bán trong mỗi đợt mở bán, liên kết đợt mở bán với các bất động sản cụ thể.
CREATE TABLE OpeningForSalesDetail (
    OpeningForSalesDetailId INT IDENTITY(1,1) PRIMARY KEY,
    OpeningForSalesId INT,
    PropertyId INT,
    FOREIGN KEY (OpeningForSalesId) REFERENCES OpeningForSales(OpeningForSalesId),
    FOREIGN KEY (PropertyId) REFERENCES Property(PropertyId)
);


