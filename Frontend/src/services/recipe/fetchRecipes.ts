import api, { csrf } from "@/config/api"
import type { ApiResponse } from "@/types/auth"

const fetchRecipes = async (): Promise<ApiResponse> => {
    try {
        const response = await api.get("/api/recipe/")
        return {
            success: true,
            data: response.data,
        }
    } catch (error: any) {
        let message = "Fetching Recipe failed."

        if (error.response?.data?.message) message = error.response.data.message
        else if (error.message) message = error.message

        return {
            success: false,
            error: message,
        }
    }
}

export default fetchRecipes