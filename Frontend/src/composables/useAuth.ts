// composables/useAuth.ts
import { useAuthStore } from "@/stores/auth"
import { computed } from "vue"

export function useAuth() {
    const authStore = useAuthStore()

    const loggedUser = computed(() => authStore.logged_user)
    const token = computed(() => authStore.token)

    const login = async (email: string, password: string) => {
        return await authStore.loginUser(email, password)
    }

    return { loggedUser, token, login }
}
