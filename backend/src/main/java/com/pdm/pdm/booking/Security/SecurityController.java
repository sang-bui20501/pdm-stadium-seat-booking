package com.pdm.pdm.booking.Security;

import java.util.HashMap;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pdm.pdm.booking.Customer.Customer;
import com.pdm.pdm.booking.Customer.CustomerDTO;
import com.pdm.pdm.booking.Customer.CustomerRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class SecurityController {

    private JWTUtility jwtUtility;

    private AuthenticationManager authenticationManager;

    private UserService userService;

    private CustomerRepository customerRepo;

    public SecurityController(JWTUtility jwtUtility,
        AuthenticationManager authenticationManager,
        UserService userService, CustomerRepository customerRepo) {
        this.jwtUtility = jwtUtility;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.customerRepo = customerRepo;
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
            customerRepo.save(customer);
            return jsonMapper.writeValueAsString(customer);
        } catch (Exception e) {
            System.out.println(e);
            return "{\"errorMessage\":\"Username is used\"}";
        }
    }

    @PostMapping("/authenticate")
    public CustomerDTO authenticate(@RequestBody JwtRequest jwtRequest) throws Exception{

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            jwtRequest.getUsername(),
                            jwtRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new Exception("invalid", e);
        }
        UserDetails userDetails =  userService.loadUserByUsername(jwtRequest.getUsername());

        final String token =
                jwtUtility.generateToken(userDetails);
        final String id = String.valueOf(customerRepo.findCustomerByUsername(userDetails.getUsername()).getId());
        return new CustomerDTO(userDetails.getUsername(), id, token);
    }



}
