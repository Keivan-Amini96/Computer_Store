CREATE TABLE pc (
                    product_id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    description TEXT,
                    price DECIMAL(10,2),
                    category VARCHAR(50),
                    brand VARCHAR(50),
                    ram VARCHAR(50),
                    ssd VARCHAR(50),
                    graphics VARCHAR(150),
                    processor VARCHAR(150),
                    image_data LONGBLOB
);

CREATE TABLE monitors (
                          product_id INT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          description TEXT,
                          price DECIMAL(10,2),
                          brand VARCHAR(50),
                          category VARCHAR(50),
                          size VARCHAR(50),
                          resolution VARCHAR(50),
                          refresh_rate VARCHAR(50),
                          image_data LONGBLOB
);

CREATE TABLE accessories (
                             product_id INT AUTO_INCREMENT PRIMARY KEY,
                             name VARCHAR(255) NOT NULL,
                             description TEXT,
                             price DECIMAL(10,2),
                             brand VARCHAR(50),
                             category VARCHAR(50),
                             image_data LONGBLOB
);

CREATE TABLE `users` (
                         `person_id` int DEFAULT NULL,
                         `un` varchar(255) DEFAULT NULL,
                         `pd` varchar(255) DEFAULT NULL,
                         `is_admin` int DEFAULT NULL,
                         ``
);

CREATE TABLE `cart` (
                         `person_id` int DEFAULT NULL,
                         `un` varchar(255) DEFAULT NULL,
                         ``
);