package com.pdm.pdm.booking.Seat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SeatService {
    @Autowired
    private SeatRepository seatRepository;

    public Iterable<Seat> findAll() {
        return seatRepository.findAll();
    }

    public Seat getSeat(int seatId) throws Exception {
        Optional<Seat> tmpSeat = seatRepository.findById(seatId);
        if (tmpSeat.isPresent()) {
            return tmpSeat.get();
        } else {
            throw new Exception("Seat with id: " + seatId + " not found");
        }
    }

    public void deleteSeat(int seatId) throws Exception {
        Optional<Seat> tmpSeat = seatRepository.findById(seatId);
        if (tmpSeat.isPresent()) {
            seatRepository.deleteById(seatId);
        } else {
            throw new Exception("Seat with id: " + seatId + " not found");
        }
    }

    public void save (Seat seat) {
        seatRepository.save(seat);
    }
    
    public String hasSeat(int seatId) throws Exception {
        Optional <Seat> tmpSeat = seatRepository.findById(seatId);
        if (tmpSeat.isPresent()) {
            return "Available";
        } else {
            throw new Exception("Seat with id:" + seatId + " not found");
        }
    }
}
