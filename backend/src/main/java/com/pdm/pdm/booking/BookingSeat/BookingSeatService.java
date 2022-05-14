package com.pdm.pdm.booking.BookingSeat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingSeatService {
    @Autowired
    private BookingSeatRepository bookingSeatRepository;

    public Iterable<BookingSeat> findAll() {
        return bookingSeatRepository.findAll();
    }

    public BookingSeat getBookingSeat(int bookingSeatId) throws Exception {
        Optional<BookingSeat> tmpBooking = bookingSeatRepository.findById(bookingSeatId);
        if (tmpBooking.isPresent()) {
            return tmpBooking.get();
        } else {
            throw new Exception("Booking with id: " + bookingSeatId + " not found");
        }
    }

    public String findByBookingId(int booking_id) {
        return bookingSeatRepository.findBookingSeatByBooking_id(booking_id);
    }

    public void deleteBookingSeat(int bookingSeatId) throws Exception {
        Optional<BookingSeat> tmpBooking = bookingSeatRepository.findById(bookingSeatId);
        if (tmpBooking.isPresent()) {
            bookingSeatRepository.deleteById(bookingSeatId);
        } else {
            throw new Exception("Booking with id: " + bookingSeatId + " not found");
        }
    }

    public void save (BookingSeat bookingSeat) {
        bookingSeatRepository.save(bookingSeat);
    }

    public String getCustomerBooking(String customer_id, String start_time, String duration){
        return bookingSeatRepository.getCustomerBooking(customer_id, start_time, duration);
    }

    public String hasBookingSeat(int bookingSeatId) throws Exception {
        Optional <BookingSeat> tmpBooking = bookingSeatRepository.findById(bookingSeatId);
        if (tmpBooking.isPresent()) {
            return "Available";
        } else {
            throw new Exception("Booking with id:" + bookingSeatId + " not found");
        }
    }

    public List<String> getAvailableSeat() {
        return bookingSeatRepository.getAvailableSeat();
    }
}
