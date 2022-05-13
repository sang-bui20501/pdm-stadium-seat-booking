package com.pdm.pdm.booking.BookingSeat;

import com.pdm.pdm.booking.Booking.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping(path = "/booking-seat")
public class BookingSeatController {
    @Autowired
    private BookingSeatService bookingSeatService;

    @GetMapping("booking-seat/getAll")
    public Iterable<BookingSeat> findAll() {
        return bookingSeatService.findAll();
    }

/* User will be redirected to the result page after successfully saved booking info 
*/

    public String addBooking(String seat_id, int booking_id) {
        BookingSeat bookingSeat = new BookingSeat();

        bookingSeat.setBooking_id(booking_id);
        bookingSeat.setSeat_id(Integer.parseInt(seat_id));

        bookingSeatService.save(bookingSeat);

        return "Booking Seat";
    }

//Delete booking. User will be redirected to the booking page after successfully deleted booking info
    @DeleteMapping("booking-seat/remove/{bookingSeatId}")
    public String removeBooking(@PathVariable("bookingSeatId") int bookingSeatId) {
        try {
            bookingSeatService.deleteBookingSeat(bookingSeatId);
        } catch (Exception e) {
            e.printStackTrace();
        }              
        return "redirect:/booking";
    }

//Show booking status
    @GetMapping("booking-seat/status/{bookingSeatId}")
    public String bookingStatus(@PathVariable("bookingSeatId") int bookingSeatId) {
        try{
            bookingSeatService.hasBookingSeat(bookingSeatId);
        }catch (Exception e){
            e.printStackTrace();
        }
        return "redirect:/booking";
    }

    @GetMapping("booking-seat/getAvailableSeat")
    public List<String> getAvailableSeat() {
        return bookingSeatService.getAvailableSeat();
    }
}
