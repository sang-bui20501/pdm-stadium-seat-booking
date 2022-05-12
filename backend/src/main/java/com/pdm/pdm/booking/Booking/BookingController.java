package com.pdm.pdm.booking.Booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/booking")
public class BookingController {
    @Autowired
    private BookingService bookingService;

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
    @PostMapping("booking/signing/save")
    public String addBooking(Booking booking) {
        bookingService.save(booking);
        return "redirect:/result";
    }

//Delete booking. User will be redirected to the booking page after successfully deleted booking info
    @DeleteMapping("booking/remove/{bookingId}")
    public String removeBooking(@PathVariable("bookingId") int bookingId) {
        try {
            bookingService.deleteBooking(bookingId);
        } catch (Exception e) {
            e.printStackTrace();
        }              
        return "redirect:/booking";
    }

//Show booking status
    @GetMapping("booking/status/{bookingId}")
    public String bookingStatus(@PathVariable("bookingId") int bookingId) {
        try{
            bookingService.hasBookings(bookingId);
        }catch (Exception e){
            e.printStackTrace();
        }
        return "redirect:/booking";
    }
}
