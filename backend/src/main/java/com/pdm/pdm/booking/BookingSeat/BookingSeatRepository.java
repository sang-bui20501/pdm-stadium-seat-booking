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

    BookingSeat findBookingSeatByBookingId(Integer bookingId);

    @Query(value = "SELECT * FROM booking_seat WHERE booking_seat.booking_id IN " +
            "(SELECT booking.booking_id FROM booking WHERE booking.customer_id IN " +
            "(SELECT customer.id FROM customer WHERE customer.id = ?1))", nativeQuery = true)
    List<BookingSeat> getBookingSeat(String customer_id);
}
