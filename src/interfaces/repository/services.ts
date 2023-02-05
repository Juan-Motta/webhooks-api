import { User } from "./users";
import { Company } from "./companies";
import { Stop } from "./stops";
import { City } from "./cities";
import { CargoType } from "./vehicles";
import { VehicleType } from "./vehicles";

interface Service {
    id: number
    user: User
    worker: Worker | null
    company: Company | null
    state: State
    stops: Stop[]
    date_time: Date
    created_at: Date
    programmed: boolean
    kms_ammount: number
    approx_duration: number
    service_payment_type: PaymentType
    active: boolean
    city: City
    service_type: ServiceType
    modality: Modality
    history_id: number
    worker_money: number
    cargo_type: CargoType
    vehicle_type: VehicleType
    service_line: ServiceLine
    gratification: number
    additional_data: object
    total_price: number
}

interface State {
    id: number
    name: string
    reason: Reason
    mishap: Mishap
}

interface Reason {
    id: number | null
    name: string | null
    description: string | null
}

interface Mishap {
    id: number | null
    name: string | null
    description: string | null
}

interface PaymentType {
    id: number
    name: string
}

interface ServiceType {
    id: number
    name: string
}

interface Modality {
    id: number
    name: string
}

interface ServiceLine {
    id: number
    name: string
}

export {
    Service,
    State,
    Reason,
    Mishap,
    PaymentType,
    ServiceType,
    Modality,
    ServiceLine
}