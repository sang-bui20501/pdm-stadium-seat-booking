package com.pdm.pdm.booking.Price;

import javax.persistence.*;

@Entity
public class Price {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int priceId;

    private int unit;

    private int rate;

    public Price(int priceId, int unit, int rate){
        this.priceId = priceId;
        this.unit = unit;
        this.rate = rate;
    }

    public Price() {

    }

    public int getPriceId() {
        return priceId;
    }

    public void setPriceId(int price) {
        this.priceId = price;
    }

    public int getUnit() {
        return unit;
    }

    public void setUnit(int unit) {
        this.unit = unit;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

}