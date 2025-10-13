import posthog from 'posthog-js'

export const initPostHog = () => {
    if (typeof window !== 'undefined') {
        // Environment variables are automatically available in Next.js client-side
        const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
        const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'

        if (!apiKey) {
            console.error('❌ PostHog API Key is missing! Check your .env.local file.')
            return
        }

        const isProduction = window.location.hostname === 'codexprime.in'
        
        if (!isProduction) {
            console.log('🚀 Initializing PostHog with:', {
                apiKey: apiKey?.slice(0, 10) + '...',
                host
            })
        }

        posthog.init(apiKey, {
            api_host: host,
            ui_host: host,
            defaults: '2025-05-24', // Required for latest PostHog features
            debug: !isProduction, // Only debug in development
            autocapture: true,
            cross_subdomain_cookie: false,
            secure_cookie: true,
            persistence: 'localStorage+cookie',

            // Session Recording is enabled by default - no need to manually start
            disable_session_recording: false,

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

            // Enable automatic captures
            capture_pageview: true,
            capture_pageleave: true,

            loaded: (ph: typeof posthog) => {
                const isProduction = window.location.hostname === 'codexprime.in'
                
                if (!isProduction) {
                    console.log('✅ PostHog loaded successfully')
                    console.log('🔧 PostHog config:', {
                        api_host: ph.config.api_host,
                        ui_host: ph.config.ui_host,
                        session_recording_enabled: !ph.config.disable_session_recording,
                        distinct_id: ph.get_distinct_id(),
                        session_id: ph.get_session_id(),
                        session_recording_started: ph.sessionRecordingStarted?.(),
                    })
                }

                // Always force start recording (bypass all triggers)
                if (!isProduction) {
                    console.log('🎥 Force starting session recording...')
                }
                
                ph.startSessionRecording({
                    url_trigger: true,
                    sampling: true,
                    linked_flag: true,
                    event_trigger: true
                })

                // Verify after 1 second
                setTimeout(() => {
                    const isRecording = ph.sessionRecordingStarted?.()
                    if (!isProduction) {
                        if (isRecording) {
                            console.log('✅ Session recording is ACTIVE')
                        } else {
                            console.error('❌ Session recording failed to start - retrying...')
                            // Try one more time with true parameter
                            ph.startSessionRecording(true)
                        }
                    } else if (!isRecording) {
                        // Production: Silent retry if not recording
                        ph.startSessionRecording(true)
                    }
                }, 1000)
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