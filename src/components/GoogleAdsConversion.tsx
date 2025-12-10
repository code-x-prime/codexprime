'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface GoogleAdsConversionProps {
    /**
     * The conversion ID for this specific conversion action
     * Default: 'AW-17680263266/6cXmCMv7m7obEOLQze5B' (Website traffic)
     */
    conversionId?: string;

    /**
     * Optional conversion value for tracking revenue
     */
    value?: number;

    /**
     * Optional currency code (e.g., 'INR', 'USD')
     */
    currency?: string;

    /**
     * Optional transaction ID for deduplication
     */
    transactionId?: string;
}

/**
 * Google Ads Conversion Tracking Component
 * 
 * This component tracks conversions for Google Ads campaigns.
 * Place it on pages where conversions happen (e.g., thank you pages, order confirmation).
 * 
 * @example Basic usage
 * ```tsx
 * import GoogleAdsConversion from '@/components/GoogleAdsConversion';
 * 
 * export default function ThankYouPage() {
 *   return (
 *     <div>
 *       <GoogleAdsConversion />
 *       <h1>Thank you for your order!</h1>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @example With value tracking
 * ```tsx
 * <GoogleAdsConversion 
 *   value={1999} 
 *   currency="INR"
 *   transactionId="ORDER-12345"
 * />
 * ```
 */
export default function GoogleAdsConversion({
    conversionId = 'AW-17680263266/6cXmCMv7m7obEOLQze5B',
    value,
    currency = 'INR',
    transactionId
}: GoogleAdsConversionProps) {
    useEffect(() => {
        // Ensure gtag is available before tracking
        if (typeof window !== 'undefined' && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
            const conversionData: Record<string, string | number> = {
                'send_to': conversionId
            };

            // Add optional parameters if provided
            if (value !== undefined) {
                conversionData.value = value;
                conversionData.currency = currency;
            }

            if (transactionId) {
                conversionData.transaction_id = transactionId;
            }

            // Track the conversion
            (window as Window & { gtag: (...args: unknown[]) => void }).gtag('event', 'conversion', conversionData);

            console.log('✅ Google Ads conversion tracked:', conversionId, conversionData);
        } else {
            console.warn('⚠️ Google Ads gtag not available yet');
        }
    }, [conversionId, value, currency, transactionId]);

    return (
        <>
            {/* Event snippet for conversion tracking */}
            <Script id={`google-ads-conversion-${conversionId}`} strategy="afterInteractive">
                {`
          gtag('event', 'conversion', {'send_to': '${conversionId}'});
        `}
            </Script>
        </>
    );
}
