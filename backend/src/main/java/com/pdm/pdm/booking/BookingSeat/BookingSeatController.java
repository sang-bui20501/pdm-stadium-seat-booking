package com.pdm.pdm.booking.BookingSeat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BookingSeatController {
    @Autowired
    private BookingSeatService bookingSeatService;

    @GetMapping("booking-seat/getAll")
    public Iterable<BookingSeat> findAll() {
        return bookingSeatService.findAll();
    }

/* User will be redirected to the result page after successfully saved booking info 
*/
    @PostMapping("booking-seat/signing/save")
    public String addBooking(BookingSeat bookingSeat) {
        bookingSeatService.save(bookingSeat);
        return "redirect:/result";
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
}
