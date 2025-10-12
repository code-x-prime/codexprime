# PostHog Analytics Setup Guide

PostHog has been successfully integrated into your CodeXprime website! 🎉

## What's Been Added

### 1. Core Analytics Files
- `src/lib/posthog.ts` - Main PostHog utility functions
- `src/components/PostHogProvider.tsx` - Provider for automatic page tracking
- `src/components/PageTracker.tsx` - Tracks scroll depth and time on page
- `src/components/ui/tracked-button.tsx` - Button component with built-in tracking
- `src/lib/useFormTracking.ts` - Hook for tracking form submissions

### 2. Tracking Integration
The following components now have PostHog tracking integrated:

#### Navigation (`src/components/Navigation.tsx`)
- Logo clicks
- Menu item clicks (both desktop and mobile)
- Phone number clicks (header)

#### Footer (`src/components/shared/Footer.tsx`)
- Logo clicks
- Quick links (Home, Services, Portfolio, Contact)
- Phone and email clicks
- Privacy and Terms links

#### Floating Contact Button (`src/components/FloatingContactButton.tsx`)
- WhatsApp button clicks (desktop and mobile)
- Call button clicks (desktop and mobile)
- Menu toggle tracking

### 3. Automatic Tracking
- **Page Views**: Automatically tracked on every page change
- **Scroll Depth**: Tracks when users scroll 25%, 50%, 75%, and 100% of page
- **Time on Page**: Tracks how long users spend on each page
- **Navigation**: All navigation clicks across the site
- **Contact Interactions**: Phone calls, WhatsApp, and email clicks

## Setup Instructions

### 1. Create PostHog Account
1. Go to [PostHog](https://posthog.com) and create a free account
2. Create a new project
3. Copy your Project API Key from the project settings

### 2. Environment Variables
Update the following variables in your `.env.local` file:

```bash
# Replace with your actual PostHog project API key
NEXT_PUBLIC_POSTHOG_KEY=phc_your_actual_project_api_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 3. Deploy and Test
1. Deploy your website with the new environment variables
2. Visit your website and perform some actions (click buttons, navigate pages)
3. Check your PostHog dashboard to see the events coming in

## Available Tracking Functions

### Button Tracking
```tsx
import { trackButtonClick } from '@/lib/posthog'

// Track any button click
trackButtonClick('Button Name', 'location', { additional: 'data' })

// Or use the TrackedButton component
import { TrackedButton } from '@/components/ui/tracked-button'

<TrackedButton 
  trackingName="Sign Up" 
  trackingLocation="hero_section"
  trackingData={{ plan: 'premium' }}
>
  Sign Up Now
</TrackedButton>
```

### Contact Interaction Tracking
```tsx
import { trackContactInteraction } from '@/lib/posthog'

// Track contact interactions
trackContactInteraction('whatsapp', { location: 'header' })
trackContactInteraction('call', { location: 'footer', phone: '+919354734436' })
trackContactInteraction('email', { location: 'contact_form' })
```

### Form Submission Tracking
```tsx
import { useFormTracking } from '@/lib/useFormTracking'

function ContactForm() {
  const { trackForm } = useFormTracking()
  
  const handleSubmit = (data) => {
    trackForm('contact_form', { 
      service: data.service,
      budget: data.budget 
    })
    // ... rest of form handling
  }
}
```

### Custom Event Tracking
```tsx
import { trackEvent } from '@/lib/posthog'

// Track any custom event
trackEvent('video_played', { video_id: 'intro_video', duration: 30 })
trackEvent('download_started', { file_name: 'brochure.pdf' })
```

## Events Being Tracked

### Automatic Events
- `$pageview` - Every page visit
- `scroll_depth` - When users scroll 25%, 50%, 75%, 100%
- `time_on_page` - How long users spend on each page

### Navigation Events
- `navigation_click` - All navigation menu clicks
- `footer_click` - All footer link clicks

### Contact Events
- `contact_interaction` - WhatsApp, phone calls, emails
- `button_click` - All tracked button interactions

### Form Events
- `form_submission` - Form submissions with form data

## PostHog Dashboard

In your PostHog dashboard, you'll be able to see:

1. **Page Views**: Which pages are most popular
2. **User Journeys**: How users navigate through your site
3. **Contact Conversions**: Which contact methods are most effective
4. **Engagement Metrics**: Scroll depth and time on page
5. **Button Performance**: Which buttons get clicked most
6. **Form Analytics**: Form submission rates and data

## Benefits for CodeXprime

1. **User Behavior Insights**: See exactly how visitors interact with your site
2. **Conversion Optimization**: Identify which contact methods work best
3. **Page Performance**: Know which pages engage users most
4. **A/B Testing Ready**: Easy to set up experiments and track results
5. **Free Analytics**: PostHog's free tier is generous for small businesses

## Next Steps

1. Set up your PostHog account and get the API key
2. Update the environment variables
3. Deploy the changes
4. Monitor the dashboard for insights
5. Use the data to optimize your website and marketing

## Support

If you need help setting up PostHog or have questions about the tracking implementation, check the PostHog documentation at [posthog.com/docs](https://posthog.com/docs) or reach out for support.

Happy tracking! 📊🚀