package com.pdm.pdm.booking.BookingStadium;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface BookingStadiumRepository extends CrudRepository<BookingStadium, Integer> {
    
    @Query(value = "SELECT booking_stadium.id FROM booking_stadium WHERE booking_stadium.booking_id IN " +
            "(SELECT booking.booking_id FROM booking WHERE booking.booking_id = ?1)", nativeQuery = true)
    String findBookingStadiumByBooking_id(Integer booking_id);

    //BookingStadium findBookingStadiumByBooking_id(Integer booking_id);

}
