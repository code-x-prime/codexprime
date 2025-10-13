'use client'

import React, { useEffect, useState } from 'react'
import { getSessionRecordingStatus, forceSessionRecording, startSessionRecording } from '@/lib/posthog'
import posthog from '@/lib/posthog'

export function PostHogDebug() {
    const [isRecording, setIsRecording] = useState(false)
    const [sessionId, setSessionId] = useState<string | null>(null)

    useEffect(() => {
        // Only run in development environment
        if (process.env.NODE_ENV !== 'development') {
            return
        }

        const checkStatus = () => {
            const recording = getSessionRecordingStatus()
            setIsRecording(recording)

            // Get session ID
            const id = posthog.get_session_id()
            setSessionId(id)

            console.log('🔍 PostHog Debug Info:', {
                isRecording: recording,
                sessionId: id,
                distinctId: posthog.get_distinct_id(),
                isLoaded: posthog.__loaded,
                config: posthog.config,
                apiHost: posthog.config?.api_host,
                sessionRecordingStarted: posthog.sessionRecordingStarted?.(),
            })
        }

        // Check status immediately and then every 5 seconds
        checkStatus()
        const interval = setInterval(checkStatus, 5000)

        return () => clearInterval(interval)
    }, [])

    // Only show in development environment
    if (process.env.NODE_ENV !== 'development') {
        return null
    }

    const handleForceRecording = () => {
        if (process.env.NODE_ENV !== 'development') return

        forceSessionRecording()
        setTimeout(() => {
            setIsRecording(getSessionRecordingStatus())
        }, 1000)
    }

    const handleStartRecording = () => {
        if (process.env.NODE_ENV !== 'development') return

        startSessionRecording()
        setTimeout(() => {
            setIsRecording(getSessionRecordingStatus())
        }, 1000)
    }

    return (
        <div style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            background: '#000',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            zIndex: 9999,
            border: '1px solid #333'
        }}>
            <div><strong>PostHog Debug</strong></div>
            <div>Recording: {isRecording ? '🟢 Yes' : '🔴 No'}</div>
            <div>Session ID: {sessionId ? sessionId.slice(0, 8) + '...' : 'None'}</div>
            <div style={{ marginTop: '10px' }}>
                <button
                    onClick={handleForceRecording}
                    style={{
                        background: '#007acc',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '3px',
                        fontSize: '11px',
                        margin: '2px',
                        cursor: 'pointer'
                    }}
                >
                    Force Record
                </button>
                <button
                    onClick={handleStartRecording}
                    style={{
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '3px',
                        fontSize: '11px',
                        margin: '2px',
                        cursor: 'pointer'
                    }}
                >
                    Start Record
                </button>
            </div>
        </div>
    )
}