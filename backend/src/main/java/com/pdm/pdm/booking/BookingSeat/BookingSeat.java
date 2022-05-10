package com.pdm.pdm.booking.BookingSeat;

import javax.persistence.*;

/*import java.util.Date;
*/
@Entity
public class BookingSeat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int booking_id;

    private int seat_id;

    public BookingSeat(int booking_id, int seat_id) {
        this.booking_id = booking_id;
        this.seat_id = seat_id;
    }

    public BookingSeat() {

    }

    @Override
    public String toString() {
        return "BookingSeat{" +
                "id=" + id +
                ", booking_id=" + booking_id +
                ", seat_id=" + seat_id +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getBooking_id() {
        return booking_id;
    }

    public void setBooking_id(int booking_id) {
        this.booking_id = booking_id;
    }

    public int getSeat_id() {
        return seat_id;
    }

    public void setSeat_id(int seat_id) {
        this.seat_id = seat_id;
    }
}
