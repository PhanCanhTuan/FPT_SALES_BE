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

-- Bảng Item (Mô tả nội thất)
CREATE TABLE Item (
    item_id INT PRIMARY KEY,
    icon VARCHAR(100) NOT NULL,
    value INT NOT NULL,
);

-- Bảng Property
CREATE TABLE Property (
    property_id INT PRIMARY KEY,
    project_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT,
    FOREIGN KEY (project_id) REFERENCES Project(project_id)
);

-- Bảng PropertyItem
CREATE TABLE PropertyItem (
    propertyItem_id INT PRIMARY KEY,
    property_id INT NOT NULL,
    item_id INT NOT NULL,
    FOREIGN KEY (property_id) REFERENCES Property(property_id),
    FOREIGN KEY (item_id) REFERENCES Item(item_id)
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
    property_id INT, -- Khóa ngoại tham chiếu đến Customer
    email VARCHAR(100), -- Địa chỉ email của khách hàng (có thể NULL)
    phone VARCHAR(20), -- Số điện thoại của khách hàng (có thể NULL)
    booking_date DATE NOT NULL,
    deposit_amount DECIMAL(10,2) NOT NULL, -- Số tiền đặt cọc
    status VARCHAR(20) NOT NULL, -- Trạng thái đặt cọc
    FOREIGN KEY (opening_id) REFERENCES OpeningForSales(opening_id),
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
    FOREIGN KEY (property_id) REFERENCES Properties(property_id)
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

INSERT INTO Customer (customer_id, name, email, phone) 
VALUES 
(1, 'John Doe', 'john.doe@example.com', '123456789'),
(2, 'Jane Smith', 'jane.smith@example.com', '987654321'),
(3, 'Alice Johnson', 'alice.johnson@example.com', '456123789');

INSERT INTO Agency (agency_id, name, email, phone) 
VALUES 
(1, 'ABC Realty', 'info@abcrealty.com', '111222333'),
(2, 'XYZ Realtors', 'info@xyzrealtors.com', '444555666');

INSERT INTO Investor (investor_id, name, email, phone, address) 
VALUES 
(1, 'Investor1', 'investor1@example.com', '111111111', '123 Main Street'),
(2, 'Investor2', 'investor2@example.com', '222222222', '456 Elm Street');

INSERT INTO Project (project_id, name, status, start_date, end_date, description, investor_id) 
VALUES 
(1, 'Project A', 'Ongoing', '2023-01-01', '2023-12-31', 'Description of Project A', 1),
(2, 'Project B', 'Completed', '2022-06-01', '2023-05-31', 'Description of Project B', 2);

INSERT INTO Item (item_id, icon, value) 
VALUES 
(1, 'bed', 3),
(2, 'bath', 2),
(3, 'area', 1200);

INSERT INTO Property (property_id, project_id, title, address, price, image, description) 
VALUES 
(1, 1, 'Modern House with Pool', 'Số 72a Lê Thánh Tôn, Quận 1, Sài Gòn', 1.2, 'image1.jpg', 'Nothing');


INSERT INTO PropertyItem (propertyItem_id, property_id, item_id) 
VALUES 
(1, 1, 1),
(2, 1, 2),
(3, 1, 3);
