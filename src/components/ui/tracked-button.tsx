'use client'

import * as React from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { trackButtonClick } from "@/lib/posthog"

export interface TrackedButtonProps extends ButtonProps {
    trackingName?: string
    trackingLocation?: string
    trackingData?: Record<string, unknown>
}

const TrackedButton = React.forwardRef<HTMLButtonElement, TrackedButtonProps>(
    ({ trackingName, trackingLocation, trackingData, onClick, children, ...props }, ref) => {
        const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            // Track the button click if tracking props are provided
            if (trackingName && trackingLocation) {
                trackButtonClick(trackingName, trackingLocation, trackingData)
            }

            // Call the original onClick handler if it exists
            if (onClick) {
                onClick(event)
            }
        }

        return (
            <Button
                ref={ref}
                onClick={handleClick}
                {...props}
            >
                {children}
            </Button>
        )
    }
)

TrackedButton.displayName = "TrackedButton"

export { TrackedButton }