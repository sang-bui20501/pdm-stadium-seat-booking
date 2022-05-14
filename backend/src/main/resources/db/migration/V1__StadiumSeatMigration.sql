DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS price;
DROP TABLE IF EXISTS seat;
DROP TABLE IF EXISTS booking;



CREATE TABLE customer (
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    mid_name varchar(50),
    password varchar(50) NOT NULL,
    username varchar(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY username_UNIQUE (username)
) AUTO_INCREMENT=1;


CREATE TABLE price (
    price_id int NOT NULL AUTO_INCREMENT,
    rate int NOT NULL,
    PRIMARY KEY (price_id)
) AUTO_INCREMENT=1;


CREATE TABLE seat (
    id int NOT NULL AUTO_INCREMENT,
    price_id int NOT NULL,
    type varchar(255) DEFAULT NULL,
    PRIMARY KEY (id),
    KEY Seat_Price_idx (price_id),
    CONSTRAINT Seat_Price FOREIGN KEY (price_id) REFERENCES price (price_id)
) AUTO_INCREMENT=1;

CREATE TABLE booking (
    booking_id int NOT NULL AUTO_INCREMENT,
    duration varchar(255) NOT NULL,
    end_time varchar(255) NOT NULL,
    start_time varchar(255) NOT NULL,
    status varchar(255) DEFAULT NULL,
    customer_id int NOT NULL,
    PRIMARY KEY (booking_id),
    KEY Booking_Customer_idx (customer_id),
    CONSTRAINT Booking_Customer FOREIGN KEY (customer_id) REFERENCES customer (id)
) AUTO_INCREMENT=1;


CREATE TABLE booking_seat (
    id int NOT NULL AUTO_INCREMENT,
    booking_id int NOT NULL,
    seat_id int NOT NULL,
    PRIMARY KEY (id),
    KEY BookingSeat_Seat_idx (seat_id),
    KEY BookingSeat_Booking_idx (booking_id),
    CONSTRAINT BookingSeat_Booking FOREIGN KEY (booking_id) REFERENCES booking (booking_id),
    CONSTRAINT BookingSeat_Seat FOREIGN KEY (seat_id) REFERENCES seat (id)
) AUTO_INCREMENT=1;


CREATE TABLE booking_stadium (
    id int NOT NULL AUTO_INCREMENT,
    booking_id int NOT NULL,
    price_id int NOT NULL,
    PRIMARY KEY (id),
    KEY booking_id_idx_seat (booking_id),
    KEY BookingStadium_Price_idx (price_id),
    CONSTRAINT BookingStadium_Booking FOREIGN KEY (booking_id) REFERENCES booking (booking_id),
    CONSTRAINT BookingStadium_Price FOREIGN KEY (price_id) REFERENCES price (price_id)
) AUTO_INCREMENT=1;