package com.pdm.pdm.booking.Customer;

import com.pdm.pdm.booking.Booking.AllBookingDTO;
import com.pdm.pdm.booking.Booking.Booking;
import com.pdm.pdm.booking.Booking.BookingRepository;
import com.pdm.pdm.booking.BookingSeat.BookingSeat;
import com.pdm.pdm.booking.BookingSeat.BookingSeatDTO;
import com.pdm.pdm.booking.BookingSeat.BookingSeatRepository;
import com.pdm.pdm.booking.BookingStadium.BookingStadium;
import com.pdm.pdm.booking.BookingStadium.BookingStadiumRepository;
import com.pdm.pdm.booking.Price.Price;
import com.pdm.pdm.booking.Price.PriceRepository;
import com.pdm.pdm.booking.Seat.Seat;
import com.pdm.pdm.booking.Seat.SeatRepository;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private BookingSeatRepository bookingSeatRepository;
    @Autowired
    private SeatRepository seatRepository;
    @Autowired
    private PriceRepository priceRepository;
    @Autowired
    private BookingStadiumRepository bookingStadiumRepository;

    public void save(Customer customer) {
        customerRepository.save(customer);
    }

    public Customer updateCustomer(String username, String password, String id) throws Exception {
        customerRepository.updateCustomer(username, password, id);
        return getCustomer(Integer.parseInt(id));
    }

    public List<String> getSeat() {
        return customerRepository.getSeat();
    }

    public List<AllBookingDTO> getBookingSeat(String customer_id) {
        ArrayList<AllBookingDTO> allBooking = new ArrayList<>();

        for(Booking booking : bookingRepository.findAllByCustomerId(Integer.parseInt(customer_id))){
            //BookingStadium bookingStadium = bookingStadiumRepository.findBookingStadiumByBooking_id(booking.getbooking_id());
            BookingSeat bookingSeat = bookingSeatRepository.findBookingSeatByBookingId(booking.getbooking_id());
            if(bookingSeat == null)
                continue;
            Seat seat = seatRepository.findById(bookingSeat.getSeat_id()).get();
            Price price = priceRepository.findById(seat.getPrice_id()).get();
            System.out.println(booking.getStatus());
            allBooking.add(
                new AllBookingDTO(booking.getbooking_id(),
                    //bookingStadium.getId(),
                    seat.getId(),
                    seat.getType(),
                    price.getRate(),
                    Integer.parseInt(booking.getDuration()),
                    booking.getStartTime(),
                    booking.getEndTime(),
                    booking.getStatus())
            );
        }
        return allBooking;
    }

    public List<String> getBookingStadium(String customer_id) {
        return customerRepository.getBookingStadium(customer_id);
    }

    public List<String> getBooking(String customer_id) {
        return customerRepository.getBooking(customer_id);
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
