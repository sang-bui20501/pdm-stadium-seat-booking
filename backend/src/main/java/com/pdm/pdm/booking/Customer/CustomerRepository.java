package com.pdm.pdm.booking.Customer;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CustomerRepository extends CrudRepository<Customer, Integer> {
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
}
