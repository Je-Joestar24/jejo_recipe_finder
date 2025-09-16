import api from "@/config/api"
import type { ApiResponse } from "@/types/auth"
import type { UpdateUserPayload } from "@/types/user"

const update = async (payload: UpdateUserPayload): Promise<ApiResponse> => {
    try {

        // Send update request
        const response = await api.post("/api/auth/update", payload)

        return {
            success: true,
            data: response.data, // contains the user object
        }
    } catch (error: any) {
        let message = "Update failed"

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

export default update 
