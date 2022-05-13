package com.pdm.pdm.booking.Booking;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.*;

/*import java.util.Date;
*/
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int booking_id;

    private int customer_id;

    private String status;

    private String startTime;

    private String endTime;

    private String duration;

    public Booking(int booking_id, int customer_id, String startTime, String endTime, String duration){
        this.booking_id = booking_id;
        this.customer_id = customer_id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = duration;
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

        public int getCustomer_id() {
            return customer_id;
        }

        public void setCustomer_id(int customer_id) {
            this.customer_id = customer_id;
        }

        public int getbooking_id() {
                return booking_id;
            }

        public void setbooking_id(int booking_id) {
            this.booking_id = booking_id;
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
