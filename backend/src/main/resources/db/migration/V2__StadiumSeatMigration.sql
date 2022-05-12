INSERT INTO `customer` (`id`, `first_name`, `last_name`, `mid_name`, `password`, `username`) VALUES (1,'Wanda','Maximoff',NULL,'1234','wanda'),(2,'Stephen','Strange',NULL,'1234','stephen'),(3,'Charles ','Xavier',NULL,'1234','charles');
INSERT INTO `price` (`price_id`, `rate`) VALUES (1,90),(2,120),(3,220),(4,20000);
INSERT INTO `seat` (`id`, `price_id`, `type`) VALUES (1,1,'NORMAL'),(2,2,'VIP'),(3,3,'COUPLE');
INSERT INTO `booking` (`booking_id`, `duration`, `end_time`, `start_time`, `status`, `customer_id`) VALUES (1,'1','MAY 12, 16:40','MAY 12, 15:40','RESERVED',1),(2,'3','MAY 12, 15:00','MAY 12, 12:00','IN USE',2),(3,'1','APRIL 10, 7:00','APRIL 10, 8:00','DEPT',3);
INSERT INTO `booking_seat` (`id`, `booking_id`, `seat_id`) VALUES (1,3,3),(2,3,3),(3,3,3),(4,1,1);
INSERT INTO `booking_stadium` (`id`, `booking_id`, `price_id`) VALUES (1,3,4);