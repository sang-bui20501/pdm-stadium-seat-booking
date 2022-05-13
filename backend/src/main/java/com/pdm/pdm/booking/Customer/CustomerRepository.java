package com.pdm.pdm.booking.Customer;

import com.pdm.pdm.booking.Booking.Booking;
import com.pdm.pdm.booking.BookingSeat.BookingSeat;
import com.pdm.pdm.booking.BookingStadium.BookingStadium;
import com.pdm.pdm.booking.Seat.Seat;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

@Transactional
public interface CustomerRepository extends CrudRepository<Customer, Integer> {
    @Query(value = "SELECT * FROM seat", nativeQuery = true)
    Iterable<Seat> getSeat();

    @Query(value = "SELECT * FROM booking_seat WHERE booking_seat.booking_id IN " +
            "(SELECT booking.booking_id FROM booking WHERE booking.customer_id IN " +
            "(SELECT customer.id FROM customer WHERE customer.username = ?1))", nativeQuery = true)
    Iterable<BookingSeat> getBookingSeat(String username);

    @Query(value = "SELECT * FROM booking_stadium WHERE booking_stadium.booking_id IN " +
            "(SELECT booking.booking_id FROM booking WHERE booking.customer_id IN " +
            "(SELECT customer.id FROM customer WHERE customer.username = ?1))", nativeQuery = true)
    Iterable<BookingStadium> getBookingStadium(String username);

    @Query(value = "SELECT * FROM booking WHERE booking.customer_id IN " +
            "(SELECT customer.id FROM customer WHERE customer.username = ?1)", nativeQuery = true)
    Iterable<Booking> getBooking(String username);

    @Modifying
    @Query(value = "UPDATE customer SET username = ?1, password = ?2 WHERE id = ?3", nativeQuery = true)
    void updateCustomer(String username, String password, String id);
    @Query(value = "SELECT booking.duration, booking.start_time, booking.end_time, " +
            "booking_seat.seat_id, price.rate, price.unit, " +
            "booking_stadium.id, price.rate AS stadiumPriceRate, price.unit AS stadiumPriceUnit " +
            "FROM customer, booking_stadium, booking_seat, booking, seat, price " +
            "WHERE (customer.username = ?1) and " +
            "(customer.id = booking.customer_id) and " +
            "(booking.booking_id = booking_seat.booking_id) and " +
            "(booking.booking_id = booking_stadium.booking_id) and " +
            "(seat.id = booking_seat.seat_id) and " +
            "(seat.price_id = price.price_id) and " +
            "(booking_stadium.price_id = price.price_id)", nativeQuery = true)
    List<String> getCustomerBookings(String username);

    Customer findCustomerByUsername(String username);
}
