enum TollFreeVehicles {
	Emergency = "Emergency",
	Busses = "Busses",
	Diplomat = "Diplomat",
	Motorcycle = "Motorcycle",
	Foreign = "Foreign",
	Military = "Military"
}

enum NonTollFreeVehicles {
	Car = "Car",
	Tractor = "Tractor"
}

type VehicleType = TollFreeVehicles | NonTollFreeVehicles;

export { TollFreeVehicles, VehicleType, NonTollFreeVehicles };
