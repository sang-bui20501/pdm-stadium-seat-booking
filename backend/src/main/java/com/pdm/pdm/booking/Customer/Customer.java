package com.pdm.pdm.booking.Customer;

import javax.persistence.*;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @Column(name = "first_name", nullable = false, length = 50)
    private String first_name;

    @Column(name = "last_name", nullable = false, length = 50)
    private String last_name;

    @Column(name = "mid_name", nullable = false, length = 50)
    private String mid_name;

    @Column(name = "username", nullable = false, length = 50, unique = true)
    private String username;

    @Column(name = "password", nullable = false, length = 50)
    private String password;

//    @Column(name = "phone", nullable = false, length = 10)
//    private String phone;
//
//    @Column(name = "type", nullable = false)
//    private int type;

//    public Customer(String first_name, String last_name, String phone, int type) {
//        this.first_name = first_name;
//        this.last_name = last_name;
//        this.phone = phone;
//        this.type = type;
//    }


    public Customer(String first_name, String last_name, String mid_name, String username, String password) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.mid_name = mid_name;
        this.username = username;
        this.password = password;
    }

    public Customer() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getMid_name() {
        return mid_name;
    }

    public void setMid_name(String mid_name) {
        this.mid_name = mid_name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    //    public String getPhone() {
//        return phone;
//    }
//
//    public void setPhone(String phone) {
//        this.phone = phone;
//    }
//
//    public int getType() {
//        return type;
//    }
//
//    public void setType(int type) {
//        this.type = type;
//    }
}
