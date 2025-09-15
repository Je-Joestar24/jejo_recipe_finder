import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

export async function csrf() {
    try {
        const response = await api.get('/sanctum/csrf-cookie')

        await new Promise(resolve => setTimeout(resolve, 100))

        const token = getCookie('XSRF-TOKEN')

        if (token) {
            const decodedToken = decodeURIComponent(token)

            api.defaults.headers.common['X-CSRF-TOKEN'] = decodedToken
        } else {
            console.warn('No CSRF token found in cookies')
        }

        return true
    } catch (error) {
        return false
    }
}

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        const lastPart = parts.pop(); // type: string | undefined
        if (lastPart) {
            return lastPart.split(";").shift() ?? null;
        }
    }

    return null;
}


export default api
