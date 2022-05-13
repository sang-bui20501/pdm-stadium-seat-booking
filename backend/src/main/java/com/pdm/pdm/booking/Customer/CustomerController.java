package com.pdm.pdm.booking.Customer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pdm.pdm.booking.BookingSeat.BookingSeat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;


    @GetMapping("/getUsernames")
    public List<String> getUsernames() {
        List<String> users = new ArrayList<>();

        List<Customer> allCustomer = customerService.getAllCustomer();
        for (Customer customer: allCustomer) {
            users.add(customer.getUsername());
        }

        return users;
    }

    @PostMapping("/sign-up")
    public String addCustomer(@RequestBody HashMap<String, String> sign_up_form) {
        Customer customer = new Customer();
        ObjectMapper jsonMapper = new ObjectMapper();

        customer.setFirst_name(sign_up_form.get("firstName"));
        customer.setMid_name(sign_up_form.get("midName"));
        customer.setLast_name(sign_up_form.get("lastName"));
        customer.setUsername(sign_up_form.get("username"));
        customer.setPassword(sign_up_form.get("password"));

        try {
            customerService.save(customer);
            return jsonMapper.writeValueAsString(customer);
        } catch (Exception e) {
            System.out.println(e);
            return "{\"errorMessage\":\"Username is used\"}";
        }
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

    @GetMapping("/getBookings")
    public Iterable<BookingSeat> getCustomerBookings(@RequestBody HashMap<String, String> data) {
        String username = data.get("username");

        return customerService.getBookingSeat(username);
//        String json = "{ ";
//
//        List<Seat> allSeats = customerService.getSeat();
//        json += "\"seat:\" {";
//        for (Seat seat: allSeats) {
//            json += "{ \"id\":" + "\"" + seat.getId() + "\"," + "\"price_id\":" + "\"" + seat.getPrice_id() + "\"," + "\"type\":" + "\"" + seat.getType() + "\"," + " }, ";
//        }
//        json += "\b\b}";
//
//        List<BookingSeat> customerBookingSeat = customerService.getBookingSeat(username);
//        json += "\"booking_seat:\" {";
//        for (BookingSeat bookingSeat: customerBookingSeat) {
//            json += "{ \"id\":" + "\"" + bookingSeat.getId() + "\"," + "\"booking_id\":" + "\"" + bookingSeat.getBooking_id() + "\"," + "\"seat_id\":" + "\"" + bookingSeat.getSeat_id() + "\"," + " }, ";
//        }
//        json += "\b\b}";
//
//        List<BookingStadium> customerBookingStadium = customerService.getBookingStadium(username);
//        json += "\"booking_stadium:\" {";
//        for (BookingStadium bookingStadium: customerBookingStadium) {
//            json += "{ \"id\":" + "\"" + bookingStadium.getId() + "\"," + "\"price_id\":" + "\"" + bookingStadium.getPrice_id() + "\"," + "\"booking_id\":" + "\"" + bookingStadium.getBooking_id() + "\"," + " }, ";
//        }
//        json += "\b\b}";
//
//        List<Booking> customerBooking = customerService.getBooking(username);
//        json += "\"booking:\" {";
//        for (Booking booking: customerBooking) {
//            json += "{ \"booking_id\":" + "\"" + booking.getBookingId() + "\"," + "\"duration\":" + "\"" + booking.getDuration() + "\"," + "\"start_time\":" + "\"" + booking.getStartTime() + "\"," + "\"end_time\":" + "\"" + booking.getEndTime() + "\"," + "\"status\":" + "\"" + booking.getStatus() + "\"," + "\"customer_id\":" + "\"" + booking.getCustomer_id() + "\"," + " }, ";
//        }
//        json += "\b\b}";
//
//        json += "}";
//
//        return json;
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

        try {
            Customer customer = customerService.updateCustomer(username, password, id);
            return jsonMapper.writeValueAsString(customer);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "{}";
    }
}
