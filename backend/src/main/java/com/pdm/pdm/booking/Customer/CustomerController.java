package com.pdm.pdm.booking.Customer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pdm.pdm.booking.Booking.Booking;
import com.pdm.pdm.booking.Booking.BookingService;
import com.pdm.pdm.booking.BookingSeat.BookingSeat;
import com.pdm.pdm.booking.BookingSeat.BookingSeatDTO;
import com.pdm.pdm.booking.BookingStadium.BookingStadium;
import com.pdm.pdm.booking.BookingStadium.BookingStadiumService;
import com.pdm.pdm.booking.Price.Price;
import com.pdm.pdm.booking.Price.PriceService;
import com.pdm.pdm.booking.Seat.Seat;
import com.pdm.pdm.booking.Seat.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path = "/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private SeatService seatService;

    @Autowired
    private PriceService priceService;

    @Autowired
    private BookingStadiumService bookingStadiumService;

    @GetMapping("/getUsernames")
    public List<String> getUsernames() {
        List<String> users = new ArrayList<>();

        List<Customer> allCustomer = customerService.getAllCustomer();
        for (Customer customer: allCustomer) {
            users.add(customer.getUsername());
        }

        return users;
    }

    @PostMapping("/sign-in")
    public Customer signIn(@RequestBody HashMap<String, String> data) {
        String username = data.get("phone");
        String password = data.get("password");

        List<Customer> customerList = customerService.getAllCustomer();

        for (Customer customer: customerList) {
            if ((customer.getUsername().equals(username)) &&
            (customer.getPassword().equals(password))) {
                    return customer;

            }
        }

        return null;
    }

    @GetMapping("/getBookings/{customer_id}")
    public List<BookingSeat> getCustomerBookings(@PathVariable("customer_id") String customer_id) throws Exception {
       return customerService.getBookingSeat(customer_id);

    }

    @GetMapping("/edit/{customer_id}")
    public String getUpdateCustomer(@PathVariable("customer_id") Integer id) throws Exception {
        Customer customer = customerService.getCustomer(id);
        ObjectMapper jsonMapper = new ObjectMapper();

        return jsonMapper.writeValueAsString(customer);
    }

    @PostMapping("/edit/{customer_id}/update")
    public String updateCustomer(@RequestBody HashMap<String, String> customer_form, @PathVariable("customer_id") String id) {
        ObjectMapper jsonMapper = new ObjectMapper();

        String username = customer_form.get("username");
        String password = customer_form.get("password");
        System.out.println(username);
        try {
            Customer customer = customerService.updateCustomer(username, password, id);
            
            return jsonMapper.writeValueAsString(customer);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "{}";
    }
}
