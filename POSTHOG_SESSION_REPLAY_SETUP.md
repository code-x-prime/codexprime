# PostHog Session Replay Setup Guide 🎥

## ✅ Checklist - Yeh sab check karo

### 1. Environment Variables (.env.local)
```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_actual_api_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com  # or https://app.posthog.com
```

**Important:** 
- ✅ `.env.local` file project root mein honi chahiye
- ✅ Development server restart karo env changes ke baad
- ✅ API key copy karte waqt spaces na ho

### 2. PostHog Dashboard Settings

#### Option A: Automatic Recording (Recommended) ✨
1. PostHog Dashboard mein jao: `https://app.posthog.com/project/{YOUR_PROJECT_ID}/settings/project-replay`
2. **Session Recording** section mein:
   - ✅ Enable session recordings: **ON**
   - ✅ Sampling rate: **100%** (start mein sab record karo)
   - ✅ Minimum duration: **0 seconds** ya **2 seconds**
   - ✅ Recording triggers: **"Any matching"** select karo

3. **Authorized Domains** (agar section visible ho):
   - Add `localhost` for development
   - Add your production domain (e.g., `codexprime.com`)

#### Option B: Programmatic Control
Agar aap manually control karna chahte ho:
1. Dashboard mein recording **OFF** rakh sakte ho
2. Code mein `posthog.startSessionRecording()` call karein jahan chahiye

### 3. Code Configuration

Aapka current setup correct hai ✅:

```typescript
posthog.init(apiKey, {
    defaults: '2025-05-24', // ✅ Important for latest features
    disable_session_recording: false, // ✅ Recording enabled
    session_recording: {
        maskAllInputs: false,
        maskInputOptions: {
            password: true, // ✅ Only passwords masked
        },
        // ... other settings
    },
})
```

### 4. Testing Steps 🧪

1. **Development Server Run karo:**
   ```bash
   npm run dev
   # ya
   pnpm dev
   ```

2. **Browser Console kholo** (`F12` or `Ctrl+Shift+J`):
   - Yeh messages dikhne chahiye:
     ```
     🚀 Initializing PostHog with: {...}
     ✅ PostHog loaded successfully
     🔧 PostHog config: {...}
     🎥 Session recording status: Active
     ```

3. **Verification:**
   ```javascript
   // Browser console mein type karo:
   window.posthog.sessionRecordingStarted()
   // Output: true (agar recording active hai)
   
   window.posthog.get_session_id()
   // Output: "session-id-string" (agar session active hai)
   ```

4. **PostHog Dashboard Check:**
   - Dashboard → Replay → Recent recordings
   - 30-60 seconds wait karo
   - Apna session dikhna chahiye

### 5. Common Issues & Solutions 🔧

#### Issue: "Session recording status: Inactive"
**Solutions:**
- ✅ Dashboard mein recording enabled hai ya nahi check karo
- ✅ Sampling 100% set hai ya nahi
- ✅ Browser console clear karo aur page refresh karo
- ✅ `.env.local` mein API key sahi hai ya nahi

#### Issue: "PostHog API Key is missing"
**Solutions:**
- ✅ `.env.local` file exists karta hai ya nahi
- ✅ Variable name exactly `NEXT_PUBLIC_POSTHOG_KEY` hai
- ✅ Dev server restart karo: `Ctrl+C` then `npm run dev`

#### Issue: Recordings dashboard mein nahi dikh rahe
**Solutions:**
- ✅ 1-2 minutes wait karo (processing time)
- ✅ Browser mein ad-blocker disable karo
- ✅ Network tab check karo - PostHog requests ja rahe hain ya nahi
- ✅ Dashboard mein correct project selected hai ya nahi

#### Issue: "Cannot find module 'posthog-js'"
**Solutions:**
```bash
# Dependencies reinstall karo:
npm install
# ya
pnpm install

# Agar phir bhi issue ho:
rm -rf node_modules package-lock.json
npm install
```

### 6. Manual Recording Control (Optional)

Agar specific conditions par recording chahiye:

```typescript
// Start recording manually
import { startSessionRecording } from '@/lib/posthog'

function MyComponent() {
  const handleSpecialAction = () => {
    startSessionRecording() // Recording start hogi
    // Your logic here
  }
}
```

### 7. Privacy Settings 🔒

Sensitive data ko mask karne ke liye:

```html
<!-- Password fields automatically masked -->
<input type="password" />

<!-- Custom sensitive data -->
<div data-sensitive>Sensitive info here</div>

<!-- Completely block from recording -->
<div data-private>Private section</div>

<!-- Ignore specific elements -->
<div className="ph-ignore">Ignored content</div>
```

### 8. Verification Commands

Terminal mein run karo:

```bash
# Environment variables check karo
echo $NEXT_PUBLIC_POSTHOG_KEY  # Linux/Mac
echo %NEXT_PUBLIC_POSTHOG_KEY%  # Windows CMD
$env:NEXT_PUBLIC_POSTHOG_KEY    # Windows PowerShell

# PostHog package installed hai ya nahi
npm list posthog-js
```

### 9. Production Deployment

Production mein deploy karne se pehle:

1. ✅ Environment variables platform mein set karo:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   
2. ✅ Domain authorize karo PostHog dashboard mein

3. ✅ Sampling reduce karo if needed (e.g., 50% ya 25%)

### 10. Debug Helper

Browser console mein paste karo:

```javascript
// PostHog debug info
console.log('PostHog Debug Info:', {
  loaded: window.posthog?.__loaded,
  recording: window.posthog?.sessionRecordingStarted?.(),
  sessionId: window.posthog?.get_session_id?.(),
  distinctId: window.posthog?.get_distinct_id?.(),
  config: {
    apiHost: window.posthog?.config?.api_host,
    disabled: window.posthog?.config?.disable_session_recording
  }
});
```

## 📚 Additional Resources

- PostHog Docs: https://posthog.com/docs/session-replay
- Session Replay Control: https://posthog.com/docs/session-replay/how-to-control-which-sessions-you-record
- Privacy Controls: https://posthog.com/docs/session-replay/privacy

## 🆘 Still Not Working?

1. Share browser console logs
2. Share PostHog dashboard screenshot
3. Check `.env.local` file (hide actual API key)
4. Verify PostHog version: `npm list posthog-js`

---

**Current Setup Status:**
- ✅ PostHog package installed (v1.275.1)
- ✅ Configuration updated with `defaults: '2025-05-24'`
- ✅ Session recording enabled
- ✅ Debug logging enabled
- ✅ Privacy settings configured

**Next Step:** Check environment variables aur development server restart karo! 🚀
