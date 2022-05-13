package com.pdm.pdm.booking.Customer;

import com.pdm.pdm.booking.Booking.Booking;
import com.pdm.pdm.booking.BookingSeat.BookingSeat;
import com.pdm.pdm.booking.BookingStadium.BookingStadium;
import com.pdm.pdm.booking.Seat.Seat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public void save(Customer customer) {
        customerRepository.save(customer);
    }

    public Customer updateCustomer(String username, String password, String id) throws Exception {
        customerRepository.updateCustomer(username, password, id);
        return getCustomer(Integer.parseInt(id));
    }

    public Iterable<Seat> getSeat() {
        return customerRepository.getSeat();
    }

    public Iterable<BookingSeat> getBookingSeat(String username) {
        return customerRepository.getBookingSeat(username);
    }

    public Iterable<BookingStadium> getBookingStadium(String username) {
        return customerRepository.getBookingStadium(username);
    }

    public Iterable<Booking> getBooking(String username) {
        return customerRepository.getBooking(username);
    }

    public Customer getCustomer(int id) throws Exception {
        Optional<Customer> tmpCustomer = customerRepository.findById(id);

        if (tmpCustomer.isPresent()) {
            return tmpCustomer.get();
        } else {
            throw new Exception("Cannot find user with id: " + id);
        }
    }

    public void deleteCustomer(int id) throws Exception {
        Optional<Customer> tmpCustomer = customerRepository.findById(id);

        if (tmpCustomer.isPresent()) {
            customerRepository.deleteById(id);
        } else {
            throw new Exception("Cannot find user with id: " + id);
        }
    }

    public List<Customer> getAllCustomer() {
        List<Customer> allCustomer = (List<Customer>) customerRepository.findAll();
        return allCustomer;
    }
}
