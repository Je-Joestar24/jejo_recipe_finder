import api from "@/config/api"
import type { ApiResponse } from "@/types/auth"

interface FetchFavoritesParams {
    search?: string
    sortByName?: boolean
    limit?: number
    page?: number
}

const fetchFavorites = async (params: FetchFavoritesParams = {}): Promise<ApiResponse> => {
    try {
        const { search, sortByName, limit, page } = params
        
        const response = await api.get("/api/favorites", {
            params: { 
                search,
                sort_by_name: sortByName,
                limit,
                page
            },
        })

        return {
            success: true,
            data: response.data, // This should include {status, count, total, current_page, last_page, search, sort_by_name, data}
        }
    } catch (error: any) {
        let message = "Fetching favorites failed."

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

export default fetchFavorites
