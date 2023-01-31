export type Company = {
    id: number
    company_name: string
    company_tin: string
    form_id: number
    tax_id: number
    logo: null | string
}
export type FormToSystem = {
    tax_system_id: number
    form_ownership_id: number
}
export type Ownership = {
    id: number
    code: string
    full: string
    short: string
    is_jur: boolean
    parent_id: null | number
    account_type: null | string
}
export type TaxSystem = {
    id: number
    code: string
    full: string
    short: string
    parent_id: null | number
}