package com.pdm.pdm.booking.BookingStadium;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.*;

/*import java.util.Date;
*/
@Entity
public class BookingStadium {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int booking_id;;

    private int price_id;

    public BookingStadium(int booking_id, int price_id) {
        this.booking_id = booking_id;
        this.price_id = price_id;
    }

    public BookingStadium() {

    }

    @Override
    public String toString() {
        return "BookingStadium{" +
                "id=" + id +
                ", booking_id=" + booking_id +
                ", price_id=" + price_id +
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

    public int getPrice_id() {
        return price_id;
    }

    public void setPrice_id(int price_id) {
        this.price_id = price_id;
    }
}
