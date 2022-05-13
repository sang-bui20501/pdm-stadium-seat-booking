package com.pdm.pdm.booking.Security;

import com.pdm.pdm.booking.Customer.Customer;
import com.pdm.pdm.booking.Customer.CustomerRepository;

import java.util.Arrays;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService{

    private CustomerRepository customerRepository;

    public UserService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Customer customer = customerRepository.findCustomerByUsername(username);
        if(customer == null) {
            throw new UsernameNotFoundException("Username not found");
        }
        GrantedAuthority authority = new SimpleGrantedAuthority("myAuthority");
        return new User(customer.getUsername(), customer.getPassword(), Arrays.asList(authority));
    }
    
}
