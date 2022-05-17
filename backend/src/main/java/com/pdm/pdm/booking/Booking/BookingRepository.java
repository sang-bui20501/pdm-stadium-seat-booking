package com.pdm.pdm.booking.Booking;

import com.pdm.pdm.booking.BookingSeat.BookingSeat;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

@Transactional
public interface BookingRepository extends CrudRepository<Booking, Integer> {
    @Query(value = "SELECT * FROM booking WHERE customer_id = ?1", nativeQuery = true)
    public Iterable<Booking> getCustomerBooking(String customer_id);

    @Query(value = 
                "SELECT rate from price where price.price_id IN " +
                "SELECT price_id, type FROM seat WHERE seat.id IN " +
                "SELECT booking_seat.seat_id FROM booking_seat WHERE booking_seat.booking_id IN " +
                "SELECT booking_id, start_time, end_time FROM booking WHERE booking.customer_id IN " +
                "SELECT customer_id FROM customer WHERE customer.id = ?1", nativeQuery = true    
    )
    List<String> getCustomerBookingInfo(int customer_id);

    @Modifying
    @Query(value = "UPDATE booking SET booking.status = ?1 WHERE booking.booking_id = ?2", nativeQuery = true)
    void payUpdate(String status, int booking_id);

    @Query(value = /*"select booking.booking_id, booking_seat.seat_id, seat.type, (price.rate * booking.duration) as booking_price, booking.start_time, booking.end_time, booking.status from booking join booking_seat join seat join price " +
        "where booking.booking_id = booking_seat.booking_id " +
        "and booking_seat.seat_id = seat.id " +
        "and seat.price_id = price.price_id " +
        "and booking.customer_id = ?1" -> works on mysql workbench */
        "select booking.booking_id, seat.id, seat.type, price.rate, booking.duration, booking.start_time, booking.end_time, booking.status from booking inner join booking_seat on booking.booking_id = booking_seat.booking_id inner join seat on booking_seat.seat_id = seat.id inner join price on price.price_id = seat.price_id where customer_id = ?1"
        /* also works on workbench*/
        , nativeQuery = true)
    List<Booking> getAllBooking(String customer_id);

    List<Booking> findAllByCustomerId(int customer_id);
}
