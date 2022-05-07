package com.pdm.pdm.booking.Booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public Booking getBooking(int bookingId) throws Exception {
        Optional<Booking> tmpBooking = bookingRepository.findById(bookingId);
        if (tmpBooking.isPresent()) {
            return tmpBooking.get();
        } else {
            throw new Exception("Booking with id: " + bookingId + " not found");
        }
    }

    public void deleteBooking(int bookingId) throws Exception {
        Optional<Booking> tmpBooking = bookingRepository.findById(bookingId);
        if (tmpBooking.isPresent()) {
            bookingRepository.deleteById(bookingId);
        } else {
            throw new Exception("Booking with id: " + bookingId + " not found");
        }
    }

    public void save (Booking booking) {
        bookingRepository.save(booking);
    }
    
    public String hasBookings(int bookingId) throws Exception {
        Optional <Booking> tmpBooking = bookingRepository.findById(bookingId);
        if (tmpBooking.isPresent()) {
            return "Available";
        } else {
            throw new Exception("Booking with id:" + bookingId + " not found");
        }
    }
}
