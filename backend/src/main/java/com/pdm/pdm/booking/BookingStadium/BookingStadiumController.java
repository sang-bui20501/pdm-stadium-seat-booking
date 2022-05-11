package com.pdm.pdm.booking.BookingStadium;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class BookingStadiumController {
    @Autowired
    private BookingStadiumService bookingStadiumService;

/* User will be redirected to the result page after successfully saved booking info 
*/
    @PostMapping("booking-stadium/signing/save")
    public String addBooking(BookingStadium bookingStadium) {
        bookingStadiumService.save(bookingStadium);
        return "redirect:/booking";
    }

//Delete booking. User will be redirected to the booking page after successfully deleted booking info
    @DeleteMapping("booking-stadium/remove/{bookingStadiumId}")
    public String removeBooking(@PathVariable("bookingStadiumId") int bookingStadiumId) {
        try {
            bookingStadiumService.deleteBookingStadium(bookingStadiumId);
        } catch (Exception e) {
            e.printStackTrace();
        }              
        return "redirect:/booking";
    }

//Show booking status
    @GetMapping("booking-stadium/status/{bookingStadiumId}")
    public String bookingStadiumStatus(@PathVariable("bookingStadiumId") int bookingStadiumId) {
        try{
            bookingStadiumService.hasBookingStadium(bookingStadiumId);
        }catch (Exception e){
            e.printStackTrace();
        }
        return "redirect:/booking";
    }
}
