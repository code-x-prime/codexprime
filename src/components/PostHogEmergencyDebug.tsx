'use client'

import { useEffect, useState } from 'react'
import posthog from 'posthog-js'

export function PostHogEmergencyDebug() {
    const [status, setStatus] = useState({
        loaded: false,
        recording: false,
        sessionId: '',
        distinctId: '',
        attempts: 0
    })

    useEffect(() => {
        let attempts = 0
        const maxAttempts = 10

        const checkAndStart = () => {
            attempts++

            const loaded = posthog.__loaded
            const recording = posthog.sessionRecordingStarted?.() || false
            const sessionId = posthog.get_session_id() || 'None'
            const distinctId = posthog.get_distinct_id() || 'None'

            setStatus({ loaded, recording, sessionId, distinctId, attempts })

            console.log(`[Attempt ${attempts}] PostHog Status:`, {
                loaded,
                recording,
                sessionId: sessionId.slice(0, 8) + '...',
                distinctId: distinctId.slice(0, 8) + '...'
            })

            // If not recording, force start
            if (loaded && !recording && attempts < maxAttempts) {
                console.log(`🔴 Recording not started! Attempt ${attempts}/${maxAttempts} - forcing...`)

                try {
                    // Try multiple force methods
                    posthog.startSessionRecording(true)
                    posthog.startSessionRecording({
                        url_trigger: true,
                        sampling: true,
                        linked_flag: true,
                        event_trigger: true
                    })
                } catch (error) {
                    console.error('Error forcing recording:', error)
                }
            }

            // Continue checking until recording starts or max attempts reached
            if (attempts < maxAttempts && (!loaded || !recording)) {
                setTimeout(checkAndStart, 2000)
            } else if (recording) {
                console.log('✅ SUCCESS! Recording is now ACTIVE!')
            } else {
                console.error('❌ FAILED after', attempts, 'attempts. Check PostHog dashboard settings.')
            }
        }

        // Start checking after 1 second
        const timer = setTimeout(checkAndStart, 1000)

        return () => clearTimeout(timer)
    }, [])

    // Only show in development
    if (typeof window === 'undefined' || window.location.hostname === 'codexprime.in') {
        return null
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: status.recording ? '#10b981' : '#ef4444',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'monospace',
            zIndex: 9999,
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            minWidth: '280px'
        }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                {status.recording ? '🟢 RECORDING ACTIVE' : '🔴 RECORDING INACTIVE'}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>
                <div>Loaded: {status.loaded ? '✅' : '❌'}</div>
                <div>Session: {status.sessionId.slice(0, 12)}...</div>
                <div>Attempts: {status.attempts}</div>
            </div>
            {!status.recording && status.attempts > 0 && (
                <button
                    onClick={() => {
                        posthog.startSessionRecording(true)
                        setTimeout(() => window.location.reload(), 500)
                    }}
                    style={{
                        marginTop: '8px',
                        padding: '6px 12px',
                        background: 'white',
                        color: '#ef4444',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}
                >
                    🔄 Force & Reload
                </button>
            )}
        </div>
    )
}
