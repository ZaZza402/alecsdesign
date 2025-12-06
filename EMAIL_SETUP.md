# Email Setup Instructions

The contact form uses SMTP to send emails via a Vercel serverless function. It is pre-configured for Namecheap Private Email but can work with any SMTP provider.

## 1. Get Your Email Credentials

If you are using Namecheap Private Email:

1. Log in to your Namecheap Private Email webmail or dashboard.
2. Ensure you have your email address (e.g., `start@alecsdesign.xyz`) and your password.
3. Note the SMTP settings (usually `mail.privateemail.com`, Port 465, SSL/TLS).

## 2. Set Environment Variables in Vercel

1. Go to your Vercel project dashboard: https://vercel.com/
2. Select your project (`alecsdesign`)
3. Go to **Settings** → **Environment Variables**
4. Add/Update these variables:

   **Variable 1:**

   - Name: `EMAIL_USER`
   - Value: `start@alecsdesign.xyz` (or your chosen email)
   - Environment: Production, Preview, Development (check all)

   **Variable 2:**

   - Name: `EMAIL_PASS`
   - Value: [Your email password]
   - Environment: Production, Preview, Development (check all)

   **Optional Variables (if not using Namecheap defaults):**

   - `EMAIL_HOST`: Your SMTP host (default: `mail.privateemail.com`)
   - `EMAIL_PORT`: Your SMTP port (default: `465`)

5. Click **Save**

## 3. Redeploy

After adding environment variables, redeploy your site:

- Either push a new commit to trigger automatic deployment
- Or use the "Redeploy" button in Vercel dashboard

## 4. Test the Form

Once deployed:

1. Go to your contact page
2. Fill out the form
3. Submit
4. Check your email at `start@alecsdesign.xyz` (or wherever you forward it)

## Local Development (Optional)

To test locally:

1. Create a `.env` file in the root directory (or `.env.local`)
2. Add:
   ```
   EMAIL_USER=start@alecsdesign.xyz
   EMAIL_PASS=your-password-here
   ```
3. Run `npm run dev`

**Note:** Never commit `.env` files to git.

## Troubleshooting

- **"Failed to send email"**: Check that environment variables are set correctly in Vercel.
- **"Invalid credentials"**: Verify your email password.
- **Not receiving emails**: Check spam folder, verify `EMAIL_USER` is correct.

## How It Works

1. User fills out the contact form
2. Form data is sent to `/api/contact` (Vercel serverless function)
3. The function uses Nodemailer to send email via SMTP (Namecheap)
4. Email is sent to `start@alecsdesign.xyz`
5. User receives success/error message
