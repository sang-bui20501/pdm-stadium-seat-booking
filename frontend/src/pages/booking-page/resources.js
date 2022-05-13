import { MAIN_URL } from "resources";
import axios from 'axios'

const getSeats = async (setSeats) => {
    const result = await (axios.get(`${MAIN_URL}/data/seats.json`))
    setSeats(result.data);
}

const getBookingSeat = async (setBookingSeats) => {
    const result = await (axios.get(`${MAIN_URL}/data/bookingseat.json`))
    setBookingSeats(result.data);
}

const getBookings = async (setBookings) => {
    const result = await (axios.get(`${MAIN_URL}/data/bookings.json`))
    setBookings(result.data)
}

const getPrices = async (setPrices) => {
    const result = await (axios.get(`${MAIN_URL}/data/price.json`))
    setPrices(result.data)
}

export { getBookingSeat, getBookings, getPrices, getSeats}