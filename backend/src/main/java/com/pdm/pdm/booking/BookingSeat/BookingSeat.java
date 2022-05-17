package com.pdm.pdm.booking.BookingSeat;

import javax.persistence.*;

/*import java.util.Date;
*/
@Entity
public class BookingSeat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "booking_id", nullable = false, length = 50)
    private int bookingId;

    @Column(name = "seat_id", nullable = false, length = 50)
    private int seatId;

    public BookingSeat(int booking_id, int seat_id) {
        this.bookingId = booking_id;
        this.seatId = seat_id;
    }

    public BookingSeat() {

    }

    @Override
    public String toString() {
        return "BookingSeat{" +
                "id=" + id +
                ", booking_id=" + bookingId +
                ", seat_id=" + seatId +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getBooking_id() {
        return bookingId;
    }

    public void setBooking_id(int booking_id) {
        this.bookingId = booking_id;
    }

    public int getSeat_id() {
        return seatId;
    }

    public void setSeat_id(int seat_id) {
        this.seatId = seat_id;
    }
}
