class Flight {
  constructor({
    flightId,
    flightNumber,
    aircraftType,
    departureAirport,
    arrivalAirport,
    departureCity,
    arrivalCity,
    departureTime,
    arrivalTime,
    basePrice,
    status = "Scheduled",
    ticketList = [],
    bookedSeats = [],
  }) {
    this.flightId = flightId;
    this.flightNumber = flightNumber;
    this.aircraftType = aircraftType;
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.departureCity = departureCity;
    this.arrivalCity = arrivalCity;
    this.departureTime = new Date(departureTime);
    this.arrivalTime = new Date(arrivalTime);
    this.basePrice = basePrice;
    this.status = status;
    this.createdAt = null;
    this.updatedAt = null;
    this.ticketList = ticketList;
    this.bookedSeats = bookedSeats;
  }

  isDelayed() {
    return this.status === "Delayed";
  }

  toObject() {
    return {
      flightId: this.flightId,
      flightNumber: this.flightNumber,
      aircraftType: this.aircraftType,
      departureAirport: this.departureAirport,
      arrivalAirport: this.arrivalAirport,
      departureCity: this.departureCity,
      arrivalCity: this.arrivalCity,
      departureTime: this.departureTime,
      arrivalTime: this.arrivalTime,
      basePrice: this.basePrice,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      ticketList: this.ticketList,
      bookedSeats: this.bookedSeats,
    };
  }
}

export default Flight;
