import api from "@/config/api"
import type { ApiResponse } from "@/types/auth"

const deleteFavorite = async (recipeId: number): Promise<ApiResponse> => {
    try {
        const response = await api.delete("/api/favorites", {
            data: { recipe_id: recipeId },
        })

        return {
            success: true,
            data: response.data, // This should include {status, message}
        }
    } catch (error: any) {
        let message = "Removing from favorites failed."

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

export default deleteFavorite
