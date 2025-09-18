import api from "@/config/api"
import type { ApiResponse } from "@/types/auth"

const fetchRecipes = async (query: string = ''): Promise<ApiResponse> => {
    try {
        const response = await api.get("/api/recipe", {
            params: { query },
        })

        return {
            success: true,
            data: response.data, // This should include {status, source, count, data}
        }
    } catch (error: any) {
        let message = "Fetching recipes failed."

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

export default fetchRecipes
