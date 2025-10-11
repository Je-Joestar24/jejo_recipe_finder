import api from "@/config/api"
import type { ApiResponse } from "@/types/auth"

const checkFavorites = async (recipeId: number): Promise<ApiResponse> => {
    try {
        const response = await api.get("/api/favorites/check", {
            params: { recipe_id: recipeId },
        })

        return {
            success: true,
            data: response.data, // This should include {status, is_favorited}
        }
    } catch (error: any) {
        let message = "Checking favorite status failed."

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

export default checkFavorites
