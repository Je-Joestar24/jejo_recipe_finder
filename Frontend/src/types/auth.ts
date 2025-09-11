
export interface SignupResponse {
    success: boolean
    data?: any
    error?: string
}

export interface SignupPayload {
    name: string
    email: string
    password: string
    password_confirmation: string
}


export interface LoginResponse {
    success: boolean
    data?: any
    error?: string
}
