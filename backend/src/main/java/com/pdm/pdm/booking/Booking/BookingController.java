package com.pdm.pdm.booking.Booking;

import com.pdm.pdm.booking.BookingSeat.BookingSeat;
import com.pdm.pdm.booking.BookingSeat.BookingSeatService;
import com.pdm.pdm.booking.BookingStadium.BookingStadium;
import com.pdm.pdm.booking.BookingStadium.BookingStadiumService;
import com.pdm.pdm.booking.Price.Price;
import com.pdm.pdm.booking.Price.PriceService;
import com.pdm.pdm.booking.Seat.Seat;
import com.pdm.pdm.booking.Seat.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
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

    @Autowired
    private PriceService priceService;

    @GetMapping("/getAll")
    public Iterable<Booking> findAll() {
        return bookingService.findALl();
    }

    @GetMapping("/get-customer-booking/{customer_id}")
    public Iterable<Booking> getCustomerBooking(@PathVariable("customer_id") String customer_id) {
        return bookingService.getCustomerBooking(customer_id);
    }

    @PostMapping("/getavailableseats")
    public List<AvailableSeatPriceDTO> getAvailableSeat(@RequestBody HashMap<String, String> seatForm) throws Exception {
        String start_time = seatForm.get("start_time");
        String end_time = seatForm.get("end_time");
        String duration = seatForm.get("duration");
        String seat_type = seatForm.get("seat_type");

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm");

        Date start_time_date = dateFormat.parse(start_time);
        Date end_time_date = dateFormat.parse(end_time);
        /*
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(start_time_date);
        calendar.add(Calendar.HOUR, Integer.parseInt(duration));

        Date end_time_date = calendar.getTime();*/


        Iterable<Booking> allBooking = bookingService.findALl();
        Iterable<BookingSeat> allBookingSeat = bookingSeatService.findAll();
        List<Integer> unavailableSeat = new ArrayList<>();

        for (Booking booking: allBooking) {
            Date start_time_date_booking = dateFormat.parse(booking.getStartTime());
            Date end_time_date_booking = dateFormat.parse(booking.getEndTime());

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
        ArrayList<AvailableSeatPriceDTO> list = new ArrayList<>();
        Iterable<Seat> allSeat = seatService.findAll();
        int check;
        for (Seat seat: allSeat) {
            check = 0;
            for (int seat_id : unavailableSeat) {
                if (seat.getId() == seat_id) {
                    check = 1;
                    break;
                }
            }
            if (check == 0 && (seat.getType().equals(seat_type))) {
                Price seatPrice = priceService.getPrice(seat.getPrice_id());

                list.add(new AvailableSeatPriceDTO(seat.getId(), seat.getPrice_id(), seat.getType(), seatPrice.getRate() * Integer.parseInt(duration)));
            }
        }
        return list;
    }


    @PostMapping("/save/{customer_id}")
    public String addBooking(@RequestBody HashMap<String, String> booking_form, @PathVariable("customer_id") String customer_id) throws ParseException {
        Booking booking = new Booking();

        booking.setCustomerId(Integer.parseInt(customer_id));
        booking.setDuration(booking_form.get("duration"));
        booking.setStartTime(booking_form.get("start_time"));
        booking.setBooking_date(booking_form.get("booking_date"));
        booking.setStatus("false");

        SimpleDateFormat dateFormat = new SimpleDateFormat("hh:mm");
        booking.setEndTime(booking_form.get("end_time"));
        /*
        Date start_time_date = dateFormat.parse(booking.getStartTime());

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(start_time_date);
        calendar.add(Calendar.HOUR, Integer.parseInt(booking.getDuration()));

        Date end_time_date = calendar.getTime();

        booking.setEndTime(dateFormat.format(end_time_date));*/


        booking = bookingService.save(booking);

        if (booking_form.get("seat_id") != null) {
            String seat_id = booking_form.get("seat_id");

            Integer booking_id = booking.getbooking_id();
            bookingSeatService.save(new BookingSeat(booking_id, Integer.parseInt(seat_id)));
        }
        else if (booking_form.get("price_id") != null) {
            String price_id = booking_form.get("price_id");
            Integer booking_id = booking.getbooking_id();
            bookingStadiumService.save(new BookingStadium(booking_id, Integer.parseInt(price_id)));
        }

        System.out.println("{ \"booking_id\": \"" + booking.getbooking_id() + "\"}");
        return "{ \"booking_id\": \"" + booking.getbooking_id() + "\"}";
    }

    @PostMapping("/paying/{booking_id}")
    public String payBooking(@PathVariable("booking_id") int bookingId) throws Exception {
        Booking booking = bookingService.getBooking(bookingId);
        /*
        if (booking.getStatus().equals("true")) {
            return "{\"pay_message:\" \"This booking is paid\"}";
        } else {*/
            bookingService.payUpdate(bookingId);
            return "{\"pay_message:\" \"Pay successfully\"}";
        
    }

    @DeleteMapping("/remove/{booking_id}")
    public String removeBooking(@PathVariable("booking_id") int bookingId) throws Exception {
        Booking booking = bookingService.getBooking(bookingId);
        String booking_stadium_id = bookingStadiumService.findByBookingId(booking.getbooking_id());
        String booking_seat_id = String.valueOf(bookingSeatService.findByBookingId(bookingId).getId());

        try {
            if (booking_seat_id != null) {
                bookingSeatService.deleteBookingSeat(Integer.parseInt(booking_seat_id));
            }
            bookingService.deleteBooking(bookingId);
            if (booking_stadium_id != null) {
                bookingStadiumService.deleteBookingStadium(Integer.parseInt(booking_stadium_id));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "{ \"booking_id\": \"" + booking.getbooking_id() + "\"}";
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
