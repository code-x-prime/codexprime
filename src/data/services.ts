/**
 * Shared services data (no client-only references).
 * Used by both Server Components (services page) and Client Components (ServicesSection).
 */
export const services = [
    {
        id: 'web-designing',
        title: 'Web Designing',
        description: 'Clean, conversion-focused website design optimized for clarity and usability.',
        features: ['Advanced Techniques', 'Database Design', 'API Integration', 'Performance Optimization'],
    },
    {
        id: 'digital-marketing',
        title: 'Digital Marketing',
        description: 'Strategies to grow visibility and attract qualified leads with measurable campaigns.',
        features: ['SEO & Technical SEO', 'Social Media', 'Paid Ads (Google, Meta)', 'Content Strategy'],
    },
    {
        id: 'graphic-design',
        title: 'Graphic Design',
        description: 'Brand and visual design that communicates clearly across web and print.',
        features: ['Logo & Identity', 'Brand Guidelines', 'Print & Digital Assets', 'UI/UX Design'],
    },
    {
        id: 'mvp-development',
        title: 'MVP Development',
        description: 'Rapid delivery of core product experiences to validate ideas and learn quickly.',
        features: ['Rapid Prototyping', 'Core Feature Focus', 'User Testing', 'Iterative Releases'],
    },
] as const

export type ServiceItem = (typeof services)[number]
