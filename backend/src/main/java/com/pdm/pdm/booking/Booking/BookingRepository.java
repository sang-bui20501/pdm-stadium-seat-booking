package com.pdm.pdm.booking.Booking;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface BookingRepository extends CrudRepository<Booking, Integer> {
    @Query(value = "SELECT * FROM booking WHERE customer_id = ?1", nativeQuery = true)
    public Iterable<Booking> getCustomerBooking(String customer_id);
}
