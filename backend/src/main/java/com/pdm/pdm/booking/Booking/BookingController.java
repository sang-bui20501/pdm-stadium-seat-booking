package com.pdm.pdm.booking.Booking;

import com.pdm.pdm.booking.BookingSeat.BookingSeat;
import com.pdm.pdm.booking.BookingSeat.BookingSeatService;
import com.pdm.pdm.booking.BookingStadium.BookingStadium;
import com.pdm.pdm.booking.BookingStadium.BookingStadiumService;
import com.pdm.pdm.booking.Seat.Seat;
import com.pdm.pdm.booking.Seat.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/booking")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingStadiumService bookingStadiumService;

    @Autowired
    private BookingSeatService bookingSeatService;

    @Autowired
    private SeatService seatService;

    @GetMapping("/getAll")
    public Iterable<Booking> findAll() {
        return bookingService.findALl();
    }

    @GetMapping("/get-customer-booking/{customer_id}")
    public Iterable<Booking> getCustomerBooking(@PathVariable("customer_id") String customer_id) {
        return bookingService.getCustomerBooking(customer_id);
    }

    @PostMapping("/getavailableseats")
    public String getAvailableSeat(@RequestBody HashMap<String, String> seatForm) throws ParseException {
        String start_time = seatForm.get("start_time");
        String duration = seatForm.get("duration");
        String booking_date = seatForm.get("booking_date");

        String json = "{";
        SimpleDateFormat dateFormat = new SimpleDateFormat("hh:mm a");
        SimpleDateFormat dateFormat2 = new SimpleDateFormat("dd/mm/yyyy");

        Date booking_date_date = dateFormat2.parse(booking_date);

        Date start_time_date = dateFormat.parse(start_time);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(start_time_date);
        calendar.add(Calendar.HOUR, Integer.parseInt(duration));

        Date end_time_date = calendar.getTime();


        Iterable<Booking> allBooking = bookingService.findALl();
        Iterable<BookingSeat> allBookingSeat = bookingSeatService.findAll();
        List<Integer> unavailableSeat = new ArrayList<>();
        Integer availableSeat = 0;
        for (Booking booking: allBooking) {
            Date start_time_date_booking = dateFormat.parse(booking.getStartTime());
            Date end_time_date_booking = dateFormat.parse(booking.getEndTime());
            Date booking_date_date_booking = dateFormat2.parse(booking.getBooking_date());

            if (booking_date_date.after(booking_date_date_booking) || booking_date_date.before(booking_date_date_booking)) {
                continue;
            }
            if (end_time_date_booking.before(start_time_date)) {
                continue;
            }
            if (start_time_date_booking.after(end_time_date)) {
                continue;
            }

            for (BookingSeat bookingSeat: allBookingSeat) {
                if (bookingSeat.getBooking_id() == booking.getbooking_id()) {
                    unavailableSeat.add(bookingSeat.getSeat_id());
                }
            }
        }

        Iterable<Seat> allSeat = seatService.findAll();
        int check;
        for (Seat seat: allSeat) {
            check = 0;
            for (int seat_id: unavailableSeat) {
                if (seat.getId() == seat_id) {
                    check = 1;
                    break;
                }
            }
            if (check == 0) {
                json += "{";

                json += "\"id:\"" + seat.getId() + ",";
                json += "\"price_id:\"" + seat.getPrice_id() + ",";
                json += "\"type:\"" + " \"" + seat.getType() + "\"";

                json += "},";

                availableSeat += 1;
            }
        }

        if (availableSeat > 0) {
            json = json.substring(0, json.length() - 1);
        }
        json += "}";
        return json;
    }

/* User will be redirected to the result page after successfully saved booking info 
*/
    @PostMapping("/save")
    public String addBooking(@RequestBody HashMap<String, String> booking_form) {
        Booking booking = new Booking();

        booking.setCustomer_id(Integer.parseInt(booking_form.get("customer_id")));
        booking.setDuration(booking_form.get("duration"));
        booking.setEndTime(booking_form.get("end_time"));
        booking.setStartTime(booking_form.get("start_time"));
        booking.setStatus(booking_form.get("status"));

        bookingService.save(booking);

        if (booking_form.get("seat_id") != null) {
            String seat_id = booking_form.get("seat_id");

            Integer booking_id = booking.getbooking_id();
            bookingSeatService.save(new BookingSeat(booking_id, Integer.parseInt(seat_id)));
        }
        if (booking_form.get("price_id") != null) {
            String price_id = booking_form.get("price_id");
            Integer booking_id = booking.getbooking_id();
            bookingStadiumService.save(new BookingStadium(booking_id, Integer.parseInt(price_id)));

        }

        return "Save Booking";
    }

//Delete booking. User will be redirected to the booking page after successfully deleted booking info
    @DeleteMapping("booking/remove/{booking_id}")
    public String removeBooking(@PathVariable("booking_id") int bookingId) {
        try {
            bookingService.deleteBooking(bookingId);
        } catch (Exception e) {
            e.printStackTrace();
        }              
        return "redirect:/booking";
    }

//Show booking status
    @GetMapping("booking/status/{booking_id}")
    public String bookingStatus(@PathVariable("booking_id") int bookingId) {
        try{
            bookingService.hasBookings(bookingId);
        }catch (Exception e){
            e.printStackTrace();
        }
        return "redirect:/booking";
    }
}
