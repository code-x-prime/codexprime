/**
 * Google Analytics and Google Ads tracking utilities
 * Type-safe wrapper for gtag functions
 */

// Extend Window interface to include gtag
declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'js' | 'set',
            targetId: string | Date,
            config?: Record<string, any>
        ) => void;
        dataLayer: any[];
    }
}

/**
 * Track a Google Ads conversion event
 * 
 * @param conversionId - The conversion ID (e.g., 'AW-17680263266/6cXmCMv7m7obEOLQze5B')
 * @param value - Optional conversion value
 * @param currency - Currency code (default: 'INR')
 * @param transactionId - Optional transaction ID for deduplication
 * 
 * @example
 * ```ts
 * trackConversion('AW-17680263266/6cXmCMv7m7obEOLQze5B', 1999, 'INR', 'ORDER-123');
 * ```
 */
export const trackConversion = (
    conversionId: string,
    value?: number,
    currency: string = 'INR',
    transactionId?: string
) => {
    if (typeof window === 'undefined' || !window.gtag) {
        console.warn('gtag is not available');
        return;
    }

    const conversionData: Record<string, any> = {
        send_to: conversionId,
    };

    if (value !== undefined) {
        conversionData.value = value;
        conversionData.currency = currency;
    }

    if (transactionId) {
        conversionData.transaction_id = transactionId;
    }

    window.gtag('event', 'conversion', conversionData);
};

/**
 * Track a custom event
 * 
 * @param eventName - Name of the event
 * @param eventParams - Event parameters
 * 
 * @example
 * ```ts
 * trackEvent('form_submit', { form_name: 'contact_form' });
 * ```
 */
export const trackEvent = (
    eventName: string,
    eventParams?: Record<string, any>
) => {
    if (typeof window === 'undefined' || !window.gtag) {
        console.warn('gtag is not available');
        return;
    }

    window.gtag('event', eventName, eventParams);
};

/**
 * Track a page view
 * 
 * @param url - Page URL
 * @param title - Page title
 */
export const trackPageView = (url: string, title?: string) => {
    if (typeof window === 'undefined' || !window.gtag) {
        console.warn('gtag is not available');
        return;
    }

    window.gtag('event', 'page_view', {
        page_path: url,
        page_title: title,
    });
};

export default {
    trackConversion,
    trackEvent,
    trackPageView,
};
