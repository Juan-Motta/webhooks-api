import { 
    Entity, 
    Column, 
    PrimaryColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    BaseEntity 
} from "typeorm"

@Entity({name:"services", synchronize: false})
class Service extends BaseEntity {
    
    @PrimaryColumn()
    id: number

    @Column()
    declared_value: number
    
    @Column()
    round_trip: boolean
    
    @Column()
    programmed: boolean
    
    @Column()
    kms_amount: boolean
    
    @Column()
    approx_duration: number
    
    @Column()
    total_price: number
    
    @Column()
    base_price: number

    @Column()
    date_time: Date

    @Column()
    invoice: string
    
    @Column()
    payment_method_id: number
    
    @Column()
    coupon_id: number
    
    @Column()
    agree_terms: boolean
    
    @Column()
    active: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column()
    city_id: number
    
    @Column()
    modality_id: number
    
    @Column()
    service_type_id: number
    
    @Column()
    user_id: number
    
    @Column()
    history_id: number
    
    @Column()
    worker_id: number
    
    @Column()
    discount: number
    
    @Column()
    massive: boolean
    
    @Column()
    worker_money: number
    
    @Column()
    observation: string
    
    @Column()
    weight: number
    
    @Column()
    operations_comments: string
    
    @Column()
    agree_einvoice: boolean
    
    @Column()
    tracking_id: string
    
    @Column()
    cargo_type_id: number
    
    @Column()
    vehicle_type_id: number
    
    @Column()
    total_incentive: number
    
    @Column()
    price_modified: boolean
    
    @Column()
    bill_number_id: number
    
    @Column()
    controller_user_id: number
    
    @Column()
    manager_id: number
}

export {
    Service
}