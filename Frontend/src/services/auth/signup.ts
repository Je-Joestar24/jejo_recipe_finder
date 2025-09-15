import api, { csrf } from "@/config/api"
import type { SignupPayload, ApiResponse } from "@/types/auth"

const signup = async (payload: SignupPayload): Promise<ApiResponse> => {
    try {
        // Ensure CSRF cookie is set (for Sanctum)
        await csrf()

        // Send signup request
        const response = await api.post("/api/auth/register", payload)

        return {
            success: true,
            data: response.data, // contains the user object
        }
    } catch (error: any) {
        let message = "Signup failed"

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

export default signup
