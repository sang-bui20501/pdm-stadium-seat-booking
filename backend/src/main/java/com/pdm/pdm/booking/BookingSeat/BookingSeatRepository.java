package com.pdm.pdm.booking.BookingSeat;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookingSeatRepository extends CrudRepository<BookingSeat, Integer> {
    @Query(value="SELECT * FROM seat WHERE seat.id NOT IN " +
            "(SELECT booking_seat.seat_id FROM booking_seat)", nativeQuery = true)
    List<String> getAvailableSeat();

}
