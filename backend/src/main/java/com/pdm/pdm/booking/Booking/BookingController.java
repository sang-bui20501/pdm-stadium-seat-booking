package com.pdm.pdm.booking.Booking;

import com.pdm.pdm.booking.BookingSeat.BookingSeat;
import com.pdm.pdm.booking.BookingSeat.BookingSeatController;
import com.pdm.pdm.booking.BookingStadium.BookingStadium;
import com.pdm.pdm.booking.BookingStadium.BookingStadiumController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/booking")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingStadiumController bookingStadiumController;

    @Autowired
    private BookingSeatController bookingSeatController;

    @GetMapping("/getAll")
    public Iterable<Booking> findAll() {
        return bookingService.findALl();
    }

    @GetMapping("/get-customer-booking/{customer_id}")
    public Iterable<Booking> getCustomerBooking(@PathVariable("customer_id") String customer_id) {
        return bookingService.getCustomerBooking(customer_id);
    }

/* User will be redirected to the result page after successfully saved booking info 
*/
    @PostMapping("/save")
    public String addBooking(@RequestBody HashMap<String, String> booking_form) {
        Booking booking = new Booking();

        booking.setCustomer_id(Integer.parseInt(booking_form.get("customer_id")));
        booking.setDuration(booking_form.get("duration"));
        booking.setEndTime(booking_form.get("end_time"));
        booking.setStartTime(booking_form.get("start_time"));
        booking.setStatus(booking_form.get("status"));

        bookingService.save(booking);

        if (booking_form.get("seat_id") != null) {
            String seat_id = booking_form.get("seat_id");
            Integer booking_id = booking.getbooking_id();
            bookingSeatController.addBooking(seat_id, booking_id);
        }
        if (booking_form.get("price_id") != null) {
            String price_id = booking_form.get("price_id");
            Integer booking_id = booking.getbooking_id();
            bookingStadiumController.addBooking(price_id, booking_id);
        }

        return "Save Booking";
    }

//Delete booking. User will be redirected to the booking page after successfully deleted booking info
    @DeleteMapping("booking/remove/{booking_id}")
    public String removeBooking(@PathVariable("booking_id") int bookingId) {
        try {
            bookingService.deleteBooking(bookingId);
        } catch (Exception e) {
            e.printStackTrace();
        }              
        return "redirect:/booking";
    }

//Show booking status
    @GetMapping("booking/status/{booking_id}")
    public String bookingStatus(@PathVariable("booking_id") int bookingId) {
        try{
            bookingService.hasBookings(bookingId);
        }catch (Exception e){
            e.printStackTrace();
        }
        return "redirect:/booking";
    }
}
