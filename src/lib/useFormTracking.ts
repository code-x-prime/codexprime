'use client'

import { trackFormSubmission } from '@/lib/posthog'

interface FormData {
    [key: string]: unknown
}

export const useFormTracking = () => {
    const trackForm = (formName: string, formData?: FormData) => {
        trackFormSubmission(formName, formData)
    }

    return { trackForm }
}