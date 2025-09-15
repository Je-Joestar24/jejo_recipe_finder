import api, { csrf } from "@/config/api"
import type { ApiResponse } from "@/types/auth"

const logout = async (): Promise<ApiResponse> => {
    try {
        await csrf()
        const response = await api.post("/api/auth/logout")
        return {
            success: true,
            data: response.data,
        }
    } catch (error: any) {
        let message = "Logout failed"

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

export default logout