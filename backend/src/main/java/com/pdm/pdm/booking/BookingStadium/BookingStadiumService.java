package com.pdm.pdm.booking.BookingStadium;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookingStadiumService {
    @Autowired
    private BookingStadiumRepository bookingStadiumRepository;

    public BookingStadium getBookingStadium(int bookingStadiumId) throws Exception {
        Optional<BookingStadium> tmpBooking = bookingStadiumRepository.findById(bookingStadiumId);
        if (tmpBooking.isPresent()) {
            return tmpBooking.get();
        } else {
            throw new Exception("Booking with id: " + bookingStadiumId + " not found");
        }
    }

    public void deleteBookingStadium(int bookingStadiumId) throws Exception {
        Optional<BookingStadium> tmpBooking = bookingStadiumRepository.findById(bookingStadiumId);
        if (tmpBooking.isPresent()) {
            bookingStadiumRepository.deleteById(bookingStadiumId);
        } else {
            throw new Exception("Booking with id: " + bookingStadiumId + " not found");
        }
    }

    public void save (BookingStadium bookingStadium) {
        bookingStadiumRepository.save(bookingStadium);
    }
    
    public String hasBookingStadium(int bookingStadiumId) throws Exception {
        Optional <BookingStadium> tmpBooking = bookingStadiumRepository.findById(bookingStadiumId);
        if (tmpBooking.isPresent()) {
            return "Available";
        } else {
            throw new Exception("Booking with id:" + bookingStadiumId + " not found");
        }
    }
}
