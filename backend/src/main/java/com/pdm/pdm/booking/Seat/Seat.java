package com.pdm.pdm.booking.Seat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.*;

/*import java.util.Date;
*/
@Entity
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int price_id;

    private String type;

    public Seat(int price_id, String type) {
        this.price_id = price_id;
        this.type = type;
    }

    public Seat() {

    }

    @Override
    public String toString() {
        return "Seat{" +
                "id=" + id +
                ", price_id=" + price_id +
                ", type='" + type + '\'' +
                '}';
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
}
