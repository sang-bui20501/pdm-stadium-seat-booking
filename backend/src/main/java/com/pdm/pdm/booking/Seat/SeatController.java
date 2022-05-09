package com.pdm.pdm.booking.Seat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class SeatController {
    @Autowired
    private SeatService seatService;

/* User will be redirected to the result page after successfully saved seat info
*/
    @GetMapping("seat/signing/save")
    public String addSeat(Seat seat) {
        seatService.save(seat);
        return "redirect:/result";
    }

//Delete seat. User will be redirected to the seat page after successfully deleted seat info
    @GetMapping("seat/remove/{seatId}")
    public String removeSeat(@PathVariable("seatId") int seatId) {
        try {
            seatService.deleteSeat(seatId);
        } catch (Exception e) {
            e.printStackTrace();
        }              
        return "redirect:/seat";
    }

//Show seat status
    @GetMapping("seat/status/{seatId}")
    public String seatStatus(@PathVariable("seatId") int seatId) {
        try{
            seatService.hasSeat(seatId);
        }catch (Exception e){
            e.printStackTrace();
        }
        return "redirect:/seat";
    }
}
