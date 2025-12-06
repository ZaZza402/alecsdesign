# Namecheap Private Email Configuration Guide

This guide contains the **EXACT** steps to make your contact form work with Namecheap Private Email.

## 1. Verify Your Email Credentials
Before touching Vercel, verify you have the correct password.

1. Go to [https://privateemail.com](https://privateemail.com)
2. Log in with:
   - **Email:** `start@alecsdesign.xyz`
   - **Password:** (The one you think is correct)
3. **IF YOU CANNOT LOGIN:** You have the wrong password. Reset it in your Namecheap Dashboard (under "Private Email" -> "Manage").
4. **IF YOU CAN LOGIN:** You have the correct password. Keep it safe.

## 2. Configure Vercel Environment Variables
The contact form needs these exact settings to talk to Namecheap.

1. Go to your Vercel Dashboard.
2. Select the `alecsdesign` project.
3. Click **Settings** -> **Environment Variables**.
4. **Delete** any existing `EMAIL_` variables to start fresh (optional, but safer).
5. Add the following variables exactly as written:

| Name | Value |
|------|-------|
| `EMAIL_USER` | `start@alecsdesign.xyz` |
| `EMAIL_PASS` | *(The password you successfully used in Step 1)* |
| `EMAIL_HOST` | `mail.privateemail.com` |
| `EMAIL_PORT` | `465` |

**Note:** Do not add any spaces before or after the values.

## 3. Redeploy Your Site
Changing variables does not affect the running site immediately. You MUST redeploy.

1. Go to the **Deployments** tab in Vercel.
2. Click the three dots (`...`) next to your latest deployment.
3. Click **Redeploy**.
4. Wait for it to finish (green status).

## 4. Test
1. Go to your website contact form.
2. Send a message.
3. If it fails, check the **Vercel Logs**:
   - Click on the Deployment.
   - Click **Logs**.
   - Look for "Functions".
   - You will see a line starting with `Configuration: Host=...`.
   - If you see `Invalid login` or `535 5.7.8`, your password in Vercel is still wrong.

## Common Issues
- **2-Factor Authentication (2FA):** If you enabled 2FA for your Namecheap email, the regular password might not work. You may need to disable 2FA for the email account or generate an App Password if Namecheap supports it (usually they just use the main password).
- **DNS Records:** Ensure your domain has the correct `MX` and `TXT` (SPF) records. Namecheap usually sets these up automatically, but you can check in Namecheap Dashboard -> Domain List -> Manage -> Advanced DNS -> Mail Settings -> "Private Email".
