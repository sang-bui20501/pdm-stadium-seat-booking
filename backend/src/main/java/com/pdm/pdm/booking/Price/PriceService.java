package com.pdm.pdm.booking.Price;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PriceService {
    @Autowired
    private PriceRepository priceRepository;
    private Object price;

    public Price getPrice(int priceId) throws Exception {
        Optional<Price> tmpprice = priceRepository.findById(priceId);
        if (tmpprice.isPresent()){
            return tmpprice.get();
        } else {
            throw new Exception("Price with id:" + priceId + " not found");
        }
    }

}
