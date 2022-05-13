ALTER TABLE `pdm`.`booking`
    ADD COLUMN `booking_date` VARCHAR(255) NOT NULL AFTER `customer_id`;