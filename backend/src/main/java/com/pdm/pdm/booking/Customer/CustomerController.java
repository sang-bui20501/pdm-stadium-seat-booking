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

    // Sign In
    // 1. User go to homepage url"/"
    // 2. User press sign in button -> button go to url"/signing"
    // 3. "/signing" will show the CustomerForm
    // 4. CustomerForm has action to url"/signing/save" -> This url will save customer info
    // 5. Redirect to url"/booking" which will show booking options

    // --------------------------- //

    // Remove Customer
    // 1. User want to delete this account -> Press button "Delete Account" in Booking page or any possible pages
    // 2. The "Delete Account" button will link to url"customer/remove/{id}" ({id} get in Front-end)
    // 3. If delete successfully -> go to homepage url"/" else redirect to booking page url"/booking"

    // --------------------------- //

    // Update Customer
    // 1. 1. User want to update this account -> Press button "Edit Info" in Booking page or any possible pages
    // 2. The "Edit Info" button will link to url"customer/update/{id}" ({id} get in Front-end)
    // 3. If getting the customer successfully -> go to CustomerForm with foundById-customer
    //                                            else go back to booking page url"/booking"

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
