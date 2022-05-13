package com.pdm.pdm.booking.Booking;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface BookingRepository extends CrudRepository<Booking, Integer> {
    @Query(value = "SELECT * FROM booking WHERE customer_id = ?1", nativeQuery = true)
    public Iterable<Booking> getCustomerBooking(String customer_id);

    @Query(value = 
                "SELECT rate from price where price.price_id IN" + 
                "SELECT price_id, type FROM seat WHERE seat.id IN" + 
                "SELECT booking_seat.seat_id FROM booking_seat WHERE booking_seat.booking_id IN" + 
                "SELECT booking_id, start_time, end_time FROM booking WHERE booking.customer_id IN" + 
                "SELECT customer_id FROM customer WHERE customer.id = ?1", nativeQuery = true    
    )
    List<String> getCustomerBookingInfo(int customer_id);
}
