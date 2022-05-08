package com.pdm.pdm.booking.Price;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class PriceController {
    @Autowired
    private PriceService priceService;

    @GetMapping("booking/price")
    public String showPrice(@PathVariable("price") int priceId, int unit, int rate) {
        try{
            priceService.getPrice(priceId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "redirect:/result";
    }
}
