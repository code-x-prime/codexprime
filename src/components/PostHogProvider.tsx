'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initPostHog, trackPageView } from '@/lib/posthog'

interface PostHogProviderProps {
    children: React.ReactNode
}

function PostHogTracker() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        // Track page views on route changes
        if (pathname) {
            const url = window.location.origin + pathname
            if (searchParams.toString()) {
                trackPageView(`${url}?${searchParams.toString()}`)
            } else {
                trackPageView(url)
            }
        }
    }, [pathname, searchParams])

    return null
}

export function PostHogProvider({ children }: PostHogProviderProps) {
    useEffect(() => {
        // Initialize PostHog
        initPostHog()
    }, [])

    return (
        <>
            <Suspense fallback={null}>
                <PostHogTracker />
            </Suspense>
            {children}
        </>
    )
}

export default PostHogProvider