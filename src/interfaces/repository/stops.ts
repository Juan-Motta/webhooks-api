interface Stop {
    id: number
    name: string
    latitude: number
    longitude: number
    order: number
    address: string
    description: string
    worker_observation: string
    city: string
    city_id: number
    assistants: number | null
    additional_data: object
    novelties: Novelty[]
    stop_states: StopState[]
}

interface Novelty {
    id: number
    name: string
    description: string
}

interface StopState {
    id: number
    name: string
    created_at: Date
}

export {
    Stop,
    Novelty,
    StopState
}