package com.pdm.pdm.booking.Booking;

public class AvailableSeatPriceDTO {
    private int id;
    private int price_id;
    private String type;
    private int price;

    public AvailableSeatPriceDTO(int id, int price_id, String type, int price) {
        this.id = id;
        this.price_id = price_id;
        this.type = type;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPrice_id() {
        return price_id;
    }

    public void setPrice_id(int price_id) {
        this.price_id = price_id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

}
