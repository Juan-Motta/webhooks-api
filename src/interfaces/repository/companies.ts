interface Company {
    id: number
    company_name: string
    legal_name: string
    nid_company: string
    contact_role: string
    billing_address: string
    billing_period: string | null
    configurarions: object
    enterprise: boolean
    cost_center: string | null
}

export {
    Company
}