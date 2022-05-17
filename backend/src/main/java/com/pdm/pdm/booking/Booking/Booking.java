package com.pdm.pdm.booking.Booking;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.*;

@Entity
public class Booking {
    @Id
    @Column(name = "booking_id", nullable = false, length = 50)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int bookingId;

    @Column(name = "customer_id", nullable = false, length = 50)
    private int customerId;

    private String status;

    private String startTime;

    private String endTime;

    private String duration;


    private String booking_date;

    public Booking(String booking_date, int bookingId, int customer_id, String startTime, String endTime, String duration){
        this.bookingId = bookingId;
        this.customerId = customer_id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = duration;
        this.booking_date = booking_date;
    }

    public Booking() {

    }

    public String duration(String startTime, String endTime) throws ParseException{
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date d1 = sdf.parse(startTime);
        Date d2 = sdf.parse(endTime);
        long duration = d2.getTime() - d1.getTime();
        return sdf.format(duration);

    }

    public String getBooking_date() {
        return booking_date;
    }

    public void setBooking_date(String booking_date) {
        this.booking_date = booking_date;
    }

    public int getCustomerId() {
            return customerId;
        }

        public void setCustomerId(int customer_id) {
            this.customerId = customer_id;
        }

        public int getbooking_id() {
                return bookingId;
            }

        public void setbooking_id(int booking_id) {
            this.bookingId = booking_id;
        }


        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getStartTime() {
            return startTime;
        }

        public void setStartTime(String startTime) {
            this.startTime = startTime;
        }

        public String getEndTime() {
            return endTime;
        }

        public void setEndTime(String endTime) {
            this.endTime = endTime;
        }

        public String getDuration() {
            return duration;
        }

        public void setDuration(String duration) {
            this.duration = duration;
        }
    
}
