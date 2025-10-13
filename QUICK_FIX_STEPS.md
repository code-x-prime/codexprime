# 🚨 Session Recording Fix - Follow These Steps

## Problem:
Session recording nahi chal rahi kyunki **URL trigger** sirf production domain ko match kar raha hai, localhost ko nahi.

## ✅ Step-by-Step Fix (5 minutes):

### Step 1: PostHog Dashboard Fix (MOST IMPORTANT) ⭐

1. **Open PostHog Dashboard:**
   - Go to: https://app.posthog.com OR https://us.posthog.com
   - Login karo

2. **Navigate to Session Replay Settings:**
   - Left sidebar → **Settings** (gear icon)
   - **Session replay** tab click karo
   - Ya direct: `https://app.posthog.com/project/{YOUR_PROJECT_ID}/settings/project-replay`

3. **Fix URL Trigger (Choose ONE option):**

   **OPTION A: Remove URL Trigger** ⭐ EASIEST
   - "Enable recordings when URL matches" section dekho
   - Current pattern: `^https://codexprime.in$`
   - Click **"Remove"** button
   - ✅ Done! Recording automatically everywhere start hogi

   **OPTION B: Update URL Pattern**
   - Click **"Edit"** button
   - Current: `^https://codexprime.in$`
   - Change to: `^https?://(localhost:3000|127\.0\.0\.1:3000|codexprime\.in)`
   - Click **"Save"**
   - ✅ Done! Ab localhost aur production dono work karenge

4. **Verify Other Settings:**
   - ✅ **Sampling:** 100% (no sampling)
   - ✅ **Minimum duration:** 5 seconds
   - ✅ **Trigger matching:** "Any matching"
   - ✅ **Enable session recordings:** ON (toggle should be green)

### Step 2: Restart Development Server

```powershell
# PowerShell mein (current terminal)
# Ctrl+C press karo to stop server
# Then run:
pnpm dev
# Ya
npm run dev
```

### Step 3: Open Browser & Test

1. **Open in browser:**
   ```
   http://localhost:3000
   ```

2. **Open Browser Console:**
   - Press `F12` OR `Ctrl+Shift+J` (Windows)
   - `Console` tab select karo

3. **Look for these messages:**
   ```
   🚀 Initializing PostHog with: {...}
   ✅ PostHog loaded successfully
   🔧 PostHog config: {...}
   🎥 Localhost detected - forcing session recording to start...
   🎥 Session recording status after force: Active ✅
   ```

### Step 4: Verify Recording Started

**In Browser Console, paste this:**
```javascript
window.posthog.sessionRecordingStarted()
```

**Expected Output:**
```
true  // ✅ Recording is working!
```

**If output is `false`, paste this to force start:**
```javascript
window.posthog.startSessionRecording({ url_trigger: true })
```

### Step 5: Check PostHog Dashboard (Wait 30-60 seconds)

1. Dashboard mein jao → **Replay** (left sidebar)
2. **Recent recordings** section dekho
3. Apna session dikhna chahiye (localhost URL ke sath)

---

## 🔍 Still Not Working? Debug Commands:

### Browser Console Debug:
```javascript
// Check PostHog status
console.log('PostHog Status:', {
  loaded: window.posthog?.__loaded,
  recording: window.posthog?.sessionRecordingStarted?.(),
  sessionId: window.posthog?.get_session_id?.(),
  distinctId: window.posthog?.get_distinct_id?.()
});

// Force start
window.posthog?.startSessionRecording({ 
  url_trigger: true,
  sampling: true,
  linked_flag: true,
  event_trigger: true 
});

// Check again
setTimeout(() => {
  console.log('Recording now?', window.posthog?.sessionRecordingStarted?.());
}, 2000);
```

### Environment Variables Check:
```powershell
# PowerShell mein run karo
$env:NEXT_PUBLIC_POSTHOG_KEY
# Output: phc_your_key_here (agar set hai)
```

---

## ✅ Success Checklist:

- [ ] Dashboard mein URL trigger removed/updated
- [ ] Sampling = 100%
- [ ] Minimum duration = 5 seconds
- [ ] Dev server restarted
- [ ] Browser console mein "Active ✅" message dikha
- [ ] `window.posthog.sessionRecordingStarted()` returns `true`
- [ ] Dashboard mein recording dikhai (30-60 seconds wait karo)

---

## 📞 Still Need Help?

Share these details:

1. **Browser Console Output:**
   - Screenshot of all PostHog related messages
   
2. **Dashboard Settings:**
   - Screenshot of Session Replay settings page
   
3. **Environment Check:**
   ```powershell
   echo $env:NEXT_PUBLIC_POSTHOG_KEY
   ```

4. **Network Tab:**
   - F12 → Network tab → Filter: "posthog"
   - Screenshot of requests going to PostHog

---

**Main Point:** URL trigger `^https://codexprime.in$` sirf production ko match karta hai. Isko remove ya update karo to include localhost! 🎯
