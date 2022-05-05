package com.pdm.pdm.booking.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/signing")
    public String addCustomer(Customer customer) {
        customerService.save(customer);

        // Return to booking page
        return "redirect:/booking";
    }

    // Not figure out yet

//    public String removeCustomer() {
//
//    }
}
