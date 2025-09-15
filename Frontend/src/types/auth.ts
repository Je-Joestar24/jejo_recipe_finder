export interface SignupPayload {
    name: string
    email: string
    password: string
    password_confirmation: string
}


export interface ApiResponse {
    success: boolean
    data?: any
    error?: string
}
