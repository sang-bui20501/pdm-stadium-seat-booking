package com.pdm.pdm.booking.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("/signing")
    public String showForm(Model model) {
        model.addAttribute("customer", new Customer());
        return "CustomerForm";
    }

    @PostMapping("/signing/save")
    public String addCustomer(Customer customer) {
        customerService.save(customer);

        // Return to booking page
        return "redirect:/booking";
    }

    @GetMapping("customer/remove/{id}")
    public String removeCustomer(@PathVariable("id") int id) {
        try {
            customerService.deleteCustomer(id);

            // return to homepage if customer has been deleted
            return "redirect:/";
        } catch (Exception e) {
            e.printStackTrace();

            // return to booking
            return "redirect:/booking";
        }
    }

    @GetMapping("customer/update/{id}")
    public String updateCustomer(@PathVariable("id") int id, Model model) {
        try {
            Customer customer = customerService.getCustomer(id);
            model.addAttribute("customer", customer);

            // Go to customer form to update
            return "CustomerForm";
        } catch (Exception e) {
            e.printStackTrace();

            // return to booking
            return "redirect:/booking";
        }
    }
}
