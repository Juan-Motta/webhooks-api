interface Vehicle {
    id: number
    vehicle_type: VehicleType
    car_plate: string
}

interface VehicleType {
    id: number
    name: string
}

interface CargoType {
    id: number
    name: string
}

export {
    Vehicle,
    VehicleType,
    CargoType
}