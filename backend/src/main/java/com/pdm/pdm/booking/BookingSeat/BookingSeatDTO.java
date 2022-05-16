package com.pdm.pdm.booking.BookingSeat;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class BookingSeatDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "booking_id")
    private int bookingId;
    @Column(name = "seat_id")
    private int seatId;

    public BookingSeatDTO(int id, int bookingId, int seatId) {
        this.id = id;
        this.bookingId = bookingId;
        this.seatId = seatId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public int getSeatId() {
        return seatId;
    }

    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }
}
