package com.pdm.pdm.booking.BookingStadium;

import com.pdm.pdm.booking.BookingSeat.BookingSeatController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class BookingStadiumController {
    @Autowired
    private BookingStadiumService bookingStadiumService;

/* User will be redirected to the result page after successfully saved booking info 
*/

    public String addBooking(String price_id, int booking_id) {
        BookingStadium bookingStadium = new BookingStadium();

        bookingStadium.setBooking_id(booking_id);
        bookingStadium.setPrice_id(Integer.parseInt(price_id));

        bookingStadiumService.save(bookingStadium);
        return "Booking Stadium";
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
