const insertQuery = `
-- Bảng user
INSERT INTO user (id, username, phone_number, email) VALUES
(1, 'john_doe', '0987654321', 'john@example.com'),
(2, 'jane_smith', '0912345678', 'jane@example.com'),
(3, 'alice_wonder', '0971122334', 'alice@example.com'),
(4, 'bob_builder', '0962233445', 'bob@example.com');

-- Bảng location
INSERT INTO location (id, city, district, ward, street, detail_address, latitude, longitude) VALUES
(1, 'Hanoi', 'Ba Dinh', 'Kim Ma', 'Lane 20', '123A', 21.0333, 105.8500),
(2, 'Hanoi', 'Cau Giay', 'Trung Hoa', 'Street 3', '45B', 21.0285, 105.7896),
(3, 'Ho Chi Minh City', 'District 1', 'Ben Nghe', 'Le Loi', '12', 10.7769, 106.7009),
(4, 'Da Nang', 'Hai Chau', 'Thach Thang', 'Tran Phu', '76', 16.0668, 108.2226);

-- Bảng rent_infor
INSERT INTO rent_infor (id, price, description, electricity_price, water_price, rental_duration) VALUES
(1, 3000000, 'Phòng trọ tiện nghi', 4000, 20000, '1 tháng'),
(2, 5000000, 'Phòng rộng rãi, gần trung tâm', 3500, 15000, '1 tháng'),
(3, 4000000, 'Phòng mới xây, đầy đủ nội thất', 5000, 18000, '1 tháng'),
(4, 2500000, 'Phòng nhỏ gọn, tiết kiệm', 3000, 12000, '1 tháng');

-- Bảng feature_infor
INSERT INTO feature_infor (id, toilet, conditioner, furniture, waterheater, wifi, kitchen, park, separate) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, 1),
(2, 1, 0, 0, 1, 1, 0, 0, 0),
(3, 1, 1, 1, 1, 1, 0, 0, 1),
(4, 0, 0, 0, 0, 0, 0, 0, 0);

-- Bảng room
INSERT INTO room (id, area, max_people, location_id, rent_infor_id, feature_infor_id, owner_id) VALUES
(1, 20, 2, 1, 1, 1, 1),
(2, 35, 4, 2, 2, 2, 2),
(3, 25, 3, 3, 3, 3, 3),
(4, 15, 1, 4, 4, 4, 4);

-- Bảng images
INSERT INTO images (id, room_id, image) VALUES
(1, 1, NULL),
(2, 2, NULL),
(3, 3, NULL),
(4, 4, NULL);
`;
