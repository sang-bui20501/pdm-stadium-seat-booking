package com.pdm.pdm.booking.Customer;

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

    public List<String> getCustomerBooking(String username) {
        return customerRepository.getCustomerBookings(username);
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
