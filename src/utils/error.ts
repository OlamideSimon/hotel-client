import { isAxiosError } from "axios"
import { toast } from "react-toastify"

export const handleError = (error: any) => {
    if (isAxiosError(error)) {
        toast.error(error.message)
    }
    if (Array.isArray(error)) {
        error.map(err => toast.error(err))
    }
}