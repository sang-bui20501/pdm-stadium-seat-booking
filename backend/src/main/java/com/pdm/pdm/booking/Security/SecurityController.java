package com.pdm.pdm.booking.Security;

import com.pdm.pdm.booking.Customer.Customer;
import com.pdm.pdm.booking.Customer.CustomerDTO;
import com.pdm.pdm.booking.Customer.CustomerRepository;
import jdk.nashorn.internal.objects.annotations.Getter;
import jdk.nashorn.internal.objects.annotations.Setter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
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

    @PostMapping("/register")
    public void register(@RequestBody Customer customer) {
        customerRepo.save(customer);
        //Add register logic here
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
