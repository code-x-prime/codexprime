'use client'

import { useEffect, useRef } from 'react'
import { trackScrollDepth, trackTimeOnPage } from '@/lib/posthog'

interface PageTrackerProps {
    children: React.ReactNode
}

export function PageTracker({ children }: PageTrackerProps) {
    const pageStartTime = useRef<number>(Date.now())
    const scrollDepthTracked = useRef<Set<number>>(new Set())

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrolled = window.scrollY
            const scrollPercentage = Math.round((scrolled / scrollHeight) * 100)

            // Track scroll depths at 25%, 50%, 75%, and 100%
            const milestones = [25, 50, 75, 100]
            milestones.forEach(milestone => {
                if (scrollPercentage >= milestone && !scrollDepthTracked.current.has(milestone)) {
                    scrollDepthTracked.current.add(milestone)
                    trackScrollDepth(milestone)
                }
            })
        }

        const handleBeforeUnload = () => {
            const timeSpent = Math.round((Date.now() - pageStartTime.current) / 1000)
            trackTimeOnPage(timeSpent)
        }

        // Add event listeners
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('beforeunload', handleBeforeUnload)

        // Reset tracking for new page
        pageStartTime.current = Date.now()
        scrollDepthTracked.current.clear()

        return () => {
            // Track time on page when component unmounts
            const timeSpent = Math.round((Date.now() - pageStartTime.current) / 1000)
            if (timeSpent > 0) {
                trackTimeOnPage(timeSpent)
            }

            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [])

    return <>{children}</>
}

export default PageTracker