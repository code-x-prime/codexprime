import posthog from 'posthog-js'

export const initPostHog = () => {
    if (typeof window !== 'undefined') {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
            loaded: () => {
                if (process.env.NODE_ENV === 'development') console.log('PostHog loaded')
            },
            capture_pageview: false, // Disable automatic pageview capture, as we capture manually
            capture_pageleave: true, // Enable pageleave capture
        })
    }
}

// Track page views
export const trackPageView = (url?: string) => {
    if (typeof window !== 'undefined') {
        posthog.capture('$pageview', {
            $current_url: url || window.location.href,
        })
    }
}

// Track custom events
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
    if (typeof window !== 'undefined') {
        posthog.capture(eventName, properties)
    }
}

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string, additionalData?: Record<string, unknown>) => {
    trackEvent('button_click', {
        button_name: buttonName,
        location: location,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        ...additionalData
    })
}

// Track form submissions
export const trackFormSubmission = (formName: string, formData?: Record<string, unknown>) => {
    trackEvent('form_submission', {
        form_name: formName,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        ...formData
    })
}

// Track navigation clicks
export const trackNavigation = (linkText: string, destination: string) => {
    trackEvent('navigation_click', {
        link_text: linkText,
        destination: destination,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
    })
}

// Track footer link clicks
export const trackFooterClick = (linkText: string, destination: string) => {
    trackEvent('footer_click', {
        link_text: linkText,
        destination: destination,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
    })
}

// Track contact interactions
export const trackContactInteraction = (interactionType: 'whatsapp' | 'call' | 'email' | 'form', additionalData?: Record<string, unknown>) => {
    trackEvent('contact_interaction', {
        interaction_type: interactionType,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        ...additionalData
    })
}

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
    trackEvent('scroll_depth', {
        percentage: percentage,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
    })
}

// Track time on page
export const trackTimeOnPage = (timeInSeconds: number) => {
    trackEvent('time_on_page', {
        time_seconds: timeInSeconds,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
    })
}

export default posthog