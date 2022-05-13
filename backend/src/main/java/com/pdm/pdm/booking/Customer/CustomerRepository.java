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
    List<String> getSeat();

    @Query(value = "SELECT * FROM booking_seat WHERE booking_seat.booking_id IN " +
            "(SELECT booking.booking_id FROM booking WHERE booking.customer_id IN " +
            "(SELECT customer.id FROM customer WHERE customer.username = ?1))", nativeQuery = true)
    List<String> getBookingSeat(String username);

    @Query(value = "SELECT * FROM booking_stadium WHERE booking_stadium.booking_id IN " +
            "(SELECT booking.booking_id FROM booking WHERE booking.customer_id IN " +
            "(SELECT customer.id FROM customer WHERE customer.username = ?1))", nativeQuery = true)
    List<String> getBookingStadium(String username);

    @Query(value = "SELECT * FROM booking WHERE booking.customer_id IN " +
            "(SELECT customer.id FROM customer WHERE customer.username = ?1)", nativeQuery = true)
    List<String> getBooking(String username);

    @Modifying
    @Query(value = "UPDATE customer SET username = ?1, password = ?2 WHERE id = ?3", nativeQuery = true)
    void updateCustomer(String username, String password, String id);

    Customer findCustomerByUsername(String username);
}
