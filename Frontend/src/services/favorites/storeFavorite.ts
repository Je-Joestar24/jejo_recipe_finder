import api from "@/config/api"
import type { ApiResponse } from "@/types/auth"

const storeFavorite = async (recipeId: number): Promise<ApiResponse> => {
    try {
        const response = await api.post("/api/favorites", {
            recipe_id: recipeId,
        })

        return {
            success: true,
            data: response.data, // This should include {status, message, data}
        }
    } catch (error: any) {
        let message = "Adding to favorites failed."

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

export default storeFavorite
