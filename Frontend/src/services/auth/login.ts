import api, { csrf } from "@/config/api"

interface LoginResponse {
    success: boolean
    data?: any
    error?: string
}

const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        await csrf() // Ensure CSRF cookie is set

        const response = await api.post("/api/auth/login", { email, password })

        return {
            success: true,
            data: response.data,
        }
    } catch (error: any) {
        let message = "Login failed"

        if (error.response?.data?.message) {
            message = error.response.data.message
        } else if (error.message) {
            message = error.message
        }

        return {
            success: false,
            error: message,
        }
    }
}

export default login
