package com.pdm.pdm.booking.Booking;

public class AllBookingDTO {
  private int booking_id;
  private int id;
  private String type;
  private int rate;
  private int duration;
  private String start_time;
  private String end_time;
  private String status;

  public AllBookingDTO(int booking_id, int id, String type, int rate, int duration,
      String start_time, String end_time, String status) {
    this.booking_id = booking_id;
    this.id = id;
    this.type = type;
    this.rate = rate;
    this.duration = duration;
    this.start_time = start_time;
    this.end_time = end_time;
    this.status = status;
  }

  public int getBooking_id() {
    return booking_id;
  }

  public void setBooking_id(int booking_id) {
    this.booking_id = booking_id;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public int getRate() {
    return rate;
  }

  public void setRate(int rate) {
    this.rate = rate;
  }

  public int getDuration() {
    return duration;
  }

  public void setDuration(int duration) {
    this.duration = duration;
  }

  public String getStart_time() {
    return start_time;
  }

  public void setStart_time(String start_time) {
    this.start_time = start_time;
  }

  public String getEnd_time() {
    return end_time;
  }

  public void setEnd_time(String end_time) {
    this.end_time = end_time;
  }

  public String isStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}
