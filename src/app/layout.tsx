import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";
import FloatingContactButton from "@/components/FloatingContactButton";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import PostHogProvider from "@/components/PostHogProvider";
import PageTracker from "@/components/PageTracker";
import SnowfallEffect from "@/components/Snowfall";

const satoshiRegular = localFont({
  src: "./fonts/Satoshi-Regular.otf",
  variable: "--font-satoshi-regular",
  weight: "400",
});

const satoshiMedium = localFont({
  src: "./fonts/Satoshi-Medium.otf",
  variable: "--font-satoshi-medium",
  weight: "500",
});

const satoshiBold = localFont({
  src: "./fonts/Satoshi-Bold.otf",
  variable: "--font-satoshi-bold",
  weight: "700",
});

const satoshiBlack = localFont({
  src: "./fonts/Satoshi-Black.otf",
  variable: "--font-satoshi-black",
  weight: "900",
});

export const metadata: Metadata = {
  title: {
    default: "CodeXprime - Premier IT Services in Dwarka & Uttam Nagar Delhi",
    template: "%s | CodeXprime - IT Services Delhi",
  },
  description:
    "CodeXprime provides top-quality IT services in Dwarka and Uttam Nagar, Delhi. Expert web development, graphic designing, digital marketing, Google Ads, Meta Ads, and complete IT solutions for businesses.",
  keywords: [
    "IT services Delhi",
    "web development Dwarka",
    "graphic designing Uttam Nagar",
    "digital marketing Delhi",
    "Google Ads services",
    "Meta Ads management",
    "website development Delhi",
    "CodeXprime",
    "IT company Dwarka",
    "web design Uttam Nagar",
    "SEO services Delhi",
    "social media marketing",
  ],
  authors: [{ name: "CodeXprime Team" }],
  creator: "CodeXprime",
  publisher: "CodeXprime",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://codexprime.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CodeXprime - Premier IT Services in Dwarka & Uttam Nagar Delhi",
    description:
      "Expert IT solutions including web development, graphic designing, digital marketing, Google Ads, and Meta Ads services in Dwarka and Uttam Nagar, Delhi.",
    url: "https://codexprime.in",
    siteName: "CodeXprime",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeXprime - IT Services in Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeXprime - Premier IT Services in Dwarka & Uttam Nagar Delhi",
    description:
      "Expert IT solutions including web development, graphic designing, digital marketing, Google Ads, and Meta Ads services in Dwarka and Uttam Nagar, Delhi.",
    creator: "@codexprime_",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <head>
        {/* Preconnect to Meta/Facebook domains for faster loading */}
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />

        {/* Meta Pixel Code - Load early with beforeInteractive strategy */}
        <Script id="meta-pixel-init" strategy="beforeInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
          `}
        </Script>
        <Script id="meta-pixel-track" strategy="afterInteractive">
          {`
            if (typeof fbq !== 'undefined') {
              fbq('init', '1222146469943980');
              fbq('track', 'PageView');
            }
          `}
        </Script>
        {/* Additional Meta Pixel (second pixel) - load early */}
        <Script id="meta-pixel-init-2" strategy="beforeInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1327356755537742');
            fbq('track', 'PageView');
          `}
        </Script>
        <Script id="meta-pixel-track-2" strategy="afterInteractive">
          {`
            if (typeof fbq !== 'undefined') {
              fbq('init', '1327356755537742');
              fbq('track', 'PageView');
            }
          `}
        </Script>
        {/* End Meta Pixel Code */}
        {/* Google Tag Manager removed as requested */}

        {/* Google tag (gtag.js) - Combined GA4 & Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17680263266"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Google Ads Conversion Tracking
            gtag('config', 'AW-17680263266');
            
            // Google Analytics 4
            gtag('config', 'G-YQSV9GJ8KV');
          `}
        </Script>
        {/* End Google tag */}
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="IN-DL" />
        <meta name="geo.placename" content="Delhi" />
        <meta name="geo.position" content="28.7041,77.1025" />
        <meta name="ICBM" content="28.7041,77.1025" />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "CodeXprime",
              description:
                "Premier IT services provider specializing in web development, graphic designing, digital marketing, Google Ads, and Meta Ads in Dwarka and Uttam Nagar, Delhi.",
              url: "https://codexprime.in",
              telephone: "+91-9354734436",
              geo: {
                "@type": "GeoCoordinates",
                latitude: 28.7041,
                longitude: 77.1025,
              },
              openingHours: "Mo-Sa 09:00-18:00",
              sameAs: [
                "https://www.facebook.com/codexprime", // Add your social media
                "https://www.instagram.com/codexprime_official",
                "https://www.linkedin.com/company/codexprime",
                "https://twitter.com/codexprime_",
              ],
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: 28.7041,
                  longitude: 77.1025,
                },
                geoRadius: "25000",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "IT Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Web Development",
                      description:
                        "Custom website development and design services",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Graphic Designing",
                      description:
                        "Professional graphic design and branding services",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Digital Marketing",
                      description:
                        "Complete digital marketing solutions including Google Ads and Meta Ads",
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CodeXprime",
              alternateName: "CodeX Prime",
              url: "https://codexprime.in",
              logo: "https://codexprime.in/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-9354734436",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: ["en", "hi"],
              },
              sameAs: [
                "https://www.facebook.com/codexprime",
                "https://www.instagram.com/codexprime",
                "https://www.linkedin.com/company/codexprime",
              ],
            }),
          }}
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      </head>
      <body
        className={`${satoshiRegular.variable} ${satoshiMedium.variable} ${satoshiBold.variable} ${satoshiBlack.variable} font-satoshi-regular antialiased`}
      >
        {/* Meta Pixel (noscript) - injected as raw HTML to avoid next/image hostname checks */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1222146469943980&ev=PageView&noscript=1" />',
          }}
        />
        {/* Additional Meta Pixel noscript for second pixel */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1327356755537742&ev=PageView&noscript=1" />',
          }}
        />
        {/* End Meta Pixel (noscript) */}

        <PostHogProvider>
          <SnowfallEffect />
          <PageTracker>
            <Navigation />
            {/* Montserrat Bold logo font name */}
            {children}
            <Toaster />
            <Footer />
            <FloatingContactButton />
          </PageTracker>
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
