import { User } from './users';
import { Vehicle } from './vehicles';

interface Worker {
    id: number
    user: User
    vehicle: Vehicle
}

export {
    Worker
}