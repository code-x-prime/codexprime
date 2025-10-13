import posthog from 'posthog-js'

export const initPostHog = () => {
    if (typeof window !== 'undefined') {
        // Environment variables are automatically available in Next.js client-side
        const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY!
        const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'

        console.log('🚀 Initializing PostHog with:', { apiKey: apiKey?.slice(0, 10) + '...', host })

        posthog.init(apiKey, {
            api_host: host,
            ui_host: host, // Explicitly set UI host as well
            debug: process.env.NODE_ENV === 'development', // Enable debug in development
            autocapture: true,
            cross_subdomain_cookie: false,
            secure_cookie: true,
            persistence: 'localStorage+cookie',
            loaded: (posthog) => {
                console.log('✅ PostHog loaded successfully')
                console.log('🔧 PostHog config:', {
                    api_host: posthog.config.api_host,
                    ui_host: posthog.config.ui_host,
                    session_recording_enabled: !posthog.config.disable_session_recording,
                    distinct_id: posthog.get_distinct_id(),
                })

                // Start session recording immediately
                if (!posthog.config.disable_session_recording) {
                    posthog.startSessionRecording()
                    console.log('🎥 Session recording started automatically')
                }
            },
            capture_pageview: true, // Enable automatic pageview capture
            capture_pageleave: true, // Enable pageleave capture
            disable_session_recording: false, // Explicitly enable session recording

            // Session Replay Configuration
            session_recording: {
                recordCrossOriginIframes: false,
                maskAllInputs: false,
                maskInputOptions: {
                    password: true,
                },
                maskTextSelector: '[data-sensitive]',
                blockSelector: '[data-private]',
                ignoreClass: 'ph-ignore',
                collectFonts: true,
                inlineStylesheet: true,
            },
        })
    }
}// Track page views
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

// Session Recording Controls
export const startSessionRecording = () => {
    if (typeof window !== 'undefined') {
        posthog.startSessionRecording()
        console.log('🎥 Session recording started manually')
    }
}

export const stopSessionRecording = () => {
    if (typeof window !== 'undefined') {
        posthog.stopSessionRecording()
        console.log('⏹️ Session recording stopped')
    }
}

// Get session recording status
export const getSessionRecordingStatus = () => {
    if (typeof window !== 'undefined') {
        const isRecording = posthog.sessionRecordingStarted()
        console.log('🎥 Session recording status:', isRecording ? 'Recording' : 'Not recording')
        return isRecording
    }
    return false
}

// Force session recording for debugging
export const forceSessionRecording = () => {
    if (typeof window !== 'undefined') {
        posthog.startSessionRecording()
        console.log('🎥 Force started session recording for debugging')
    }
}

// Check PostHog configuration
export const checkPostHogConfig = () => {
    if (typeof window !== 'undefined') {
        const config = {
            isLoaded: posthog.__loaded,
            apiHost: posthog.config?.api_host,
            apiKey: posthog.config?.token ? 'Set' : 'Not set',
            sessionRecordingEnabled: !posthog.config?.disable_session_recording,
            distinctId: posthog.get_distinct_id(),
            sessionId: posthog.get_session_id(),
            sessionRecordingStarted: posthog.sessionRecordingStarted?.(),
        }
        console.log('🔧 PostHog Configuration:', config)
        return config
    }
    return null
}

export default posthog