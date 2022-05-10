
CREATE TABLE `customer`
(
    `id`         int          NOT NULL AUTO_INCREMENT,
    `first_name` varchar(255) NOT NULL,
    `last_name`  varchar(255) NOT NULL,
    `phone`      varchar(10)  NOT NULL,
    `type`       int,
        PRIMARY KEY (`id`)
);
