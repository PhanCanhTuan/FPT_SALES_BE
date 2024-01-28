USE master
GO

CREATE DATABASE FPT_SALES_DEMO1
GO


-- Bảng Customer (Khách hàng)
CREATE TABLE Customer (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- Tên của khách hàng
    email VARCHAR(100) UNIQUE NOT NULL, -- Địa chỉ email của khách hàng
    phone VARCHAR(20) NOT NULL -- Số điện thoại của khách hàng
);

-- Bảng Agency (Đại lý)
CREATE TABLE Agency (
    agency_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- Tên của đại lý
    email VARCHAR(100) UNIQUE NOT NULL, -- Địa chỉ email của đại lý
    phone VARCHAR(20) NOT NULL -- Số điện thoại của đại lý
);

-- Bảng Investor (Nhà đầu tư)
CREATE TABLE Investor (
    investor_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- Tên của nhà đầu tư
    email VARCHAR(100) UNIQUE NOT NULL, -- Địa chỉ email của nhà đầu tư
    phone VARCHAR(20) NOT NULL, -- Số điện thoại của nhà đầu tư
    address VARCHAR(255) NOT NULL -- Địa chỉ của nhà đầu tư
);

-- Tạo bảng Project (Dự án)
CREATE TABLE Project (
    project_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    investor_id INT, -- Khóa ngoại tham chiếu đến nhà đầu tư
    FOREIGN KEY (investor_id) REFERENCES Investor(investor_id)
);

-- Tạo bảng Property (Bất động sản)
CREATE TABLE Property (
    property_id INT PRIMARY KEY,
    project_id INT NOT NULL,
    floor INT NOT NULL, -- Tầng
    apartment_number INT NOT NULL, -- Số căn hộ
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    FOREIGN KEY (project_id) REFERENCES Project(project_id)
);

-- Bảng OpeningForSales (Đợt mở bán)
CREATE TABLE OpeningForSales (
    opening_id INT PRIMARY KEY,
    project_id INT NOT NULL, -- Khóa ngoại tham chiếu đến dự án
    start_date DATE NOT NULL, -- Ngày bắt đầu mở bán
    end_date DATE NOT NULL, -- Ngày kết thúc mở bán
    status VARCHAR(20) NOT NULL, -- Trạng thái của đợt mở bán
    FOREIGN KEY (project_id) REFERENCES Project(project_id)
);

-- Bảng OpeningForSalesDetail (Chi tiết đợt mở bán)
CREATE TABLE OpeningForSalesDetail (
    opening_id INT,
    property_id INT,
    agency_id INT,
    PRIMARY KEY (opening_id, property_id, agency_id),
    FOREIGN KEY (opening_id) REFERENCES OpeningForSales(opening_id),
    FOREIGN KEY (property_id) REFERENCES Property(property_id),
    FOREIGN KEY (agency_id) REFERENCES Agency(agency_id)
);

-- Bảng Booking (Đặt cọc)
CREATE TABLE Booking (
    booking_id INT PRIMARY KEY,
    opening_id INT,
    customer_id INT, -- Khóa ngoại tham chiếu đến Customer
    email VARCHAR(100), -- Địa chỉ email của khách hàng (có thể NULL)
    phone VARCHAR(20), -- Số điện thoại của khách hàng (có thể NULL)
    booking_date DATE NOT NULL,
    deposit_amount DECIMAL(10,2) NOT NULL, -- Số tiền đặt cọc
    status VARCHAR(20) NOT NULL, -- Trạng thái đặt cọc
    FOREIGN KEY (opening_id) REFERENCES OpeningForSales(opening_id),
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);

-- Bảng Payment (Thanh toán)
CREATE TABLE Payment (
    payment_id INT PRIMARY KEY,
    booking_id INT,
    amount DECIMAL(10,2) NOT NULL, -- Số tiền thanh toán
    payment_date DATE NOT NULL, -- Ngày thanh toán
    method VARCHAR(50) NOT NULL, -- Phương thức thanh toán
    FOREIGN KEY (booking_id) REFERENCES Booking(booking_id)
);

-- Bảng PaymentDetail (Chi tiết thanh toán)
CREATE TABLE PaymentDetail (
    detail_id INT PRIMARY KEY,
    payment_id INT, -- Khóa ngoại tham chiếu đến bảng Payment
    amount DECIMAL(10,2) NOT NULL, -- Số tiền thanh toán chi tiết
    payment_date DATE NOT NULL, -- Ngày thanh toán
    method VARCHAR(50) NOT NULL, -- Phương thức thanh toán
    note VARCHAR(255), -- Ghi chú
    FOREIGN KEY (payment_id) REFERENCES Payment(payment_id)
);


INSERT INTO Investor (investor_id, name, email, phone, address) VALUES
(1, 'Công ty TNHH Vinhomes', 'vinhomes@example.com', '0123456789', '123 Đường Nguyễn Chí Thanh, Hà Nội'),
(2, 'Công ty CP Đầu tư Phát triển Nhà Thành phố Hồ Chí Minh', 'nhadattp@example.com', '0987654321', '456 Đường Lê Lợi, TP.HCM');

-- INSERT cho bảng Agency (Đại lý)
INSERT INTO Agency (agency_id, name, email, phone) VALUES
(1, 'Đại lý A', 'dailya@example.com', '0123456789'),
(2, 'Đại lý B', 'dailyb@example.com', '0987654321'),
(3, 'Đại lý C', 'dailyc@example.com', '0369852147');

-- INSERT cho bảng Project (Dự án)
INSERT INTO Project (project_id, name, status, start_date, end_date, description, investor_id) VALUES
(1, 'Vinhomes Grand Park', 'Đang triển khai', '2023-01-01', NULL, 'Dự án căn hộ cao cấp tại TP.HCM', 1),
(2, 'Vinhomes Ocean Park', 'Đang hoàn thành', '2022-07-01', NULL, 'Khu đô thị ven biển tại Hà Nội', 1);

-- INSERT cho bảng Property (Bất động sản) - Ví dụ cho Vinhomes Grand Park
INSERT INTO Property (property_id, project_id, floor, apartment_number, price, description) VALUES
(1, 1, 23, 2306, 150000, 'Căn hộ 2306 tầng 23'),
(2, 1, 24, 2407, 160000, 'Căn hộ 2407 tầng 24'),
(3, 1, 25, 2508, 170000, 'Căn hộ 2508 tầng 25');

-- INSERT cho bảng Customer (Khách hàng)
INSERT INTO Customer (customer_id, name, email, phone) VALUES
(1, 'Nguyễn Văn A', 'nguyenvana@example.com', '0123456789'),
(2, 'Trần Thị B', 'tranthib@example.com', '0987654321'),
(3, 'Lê Văn C', 'levanc@example.com', '0369852147');