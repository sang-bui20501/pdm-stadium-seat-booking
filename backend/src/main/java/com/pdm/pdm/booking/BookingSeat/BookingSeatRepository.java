package com.pdm.pdm.booking.BookingSeat;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookingSeatRepository extends CrudRepository<BookingSeat, Integer> {
    @Query(value="SELECT * FROM seat WHERE seat.id NOT IN " +
            "(SELECT booking_seat.seat_id FROM booking_seat)", nativeQuery = true)
    List<String> getAvailableSeat();

    @Query(value = "SELECT booking.booking_id FROM booking " +
            "WHERE booking.customer_id = ?1 and " +
            "booking.start_time = ?2 and " +
            "booking.duration = ?3", nativeQuery = true)
    String getCustomerBooking(String customer_id, String start_time, String duration);

    @Query(value = "SELECT booking_seat.id FROM booking_seat WHERE booking_seat.booking_id IN " +
            "(SELECT booking.booking_id FROM booking WHERE booking.booking_id = ?1)", nativeQuery = true)
    String findBookingSeatByBooking_id(Integer booking_id);

    @Query(value = "SELECT * FROM booking_seat WHERE booking_seat.booking_id IN " +
            "(SELECT booking.booking_id FROM booking WHERE booking.customer_id IN " +
            "(SELECT customer.id FROM customer WHERE customer.id = ?1))", nativeQuery = true)
    List<BookingSeat> getBookingSeat(String customer_id);
        
        @Query(value = /*"select booking.booking_id, booking_seat.seat_id, seat.type, (price.rate * booking.duration) as booking_price, booking.start_time, booking.end_time, booking.status from booking join booking_seat join seat join price " +
        "where booking.booking_id = booking_seat.booking_id " +
        "and booking_seat.seat_id = seat.id " +
        "and seat.price_id = price.price_id " +
        "and booking.customer_id = ?1" -> works on mysql workbench */ 
        "select booking.booking_id, seat.id, seat.type, price.rate, booking.duration, booking.start_time, booking.end_time, booking.status from booking inner join booking_seat on booking.booking_id = booking_seat.booking_id inner join seat on booking_seat.seat_id = seat.id inner join price on price.price_id = seat.price_id where customer_id = ?1"
        /* also works on workbench*/
        , nativeQuery = true)
        List<BookingSeat> getAllBooking(String customer_id);

        




}
