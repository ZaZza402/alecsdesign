# Email Setup Instructions

The contact form uses Gmail to send emails via a Vercel serverless function. Follow these steps to configure it:

## 1. Generate Gmail App Password

Since you're using Gmail (`mka.alecs@gmail.com`), you need to create an App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Enable **2-Step Verification** if not already enabled
4. Go back to Security, scroll to "How you sign in to Google"
5. Click on **App passwords**
6. Select "Mail" as the app and "Other" as the device
7. Name it "Alecsdesign Contact Form"
8. Click **Generate**
9. Copy the 16-character password (it will look like: `xxxx xxxx xxxx xxxx`)

## 2. Set Environment Variables in Vercel

1. Go to your Vercel project dashboard: https://vercel.com/
2. Select your project (`alecsdesign`)
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

   **Variable 1:**

   - Name: `EMAIL_USER`
   - Value: `mka.alecs@gmail.com`
   - Environment: Production, Preview, Development (check all)

   **Variable 2:**

   - Name: `EMAIL_PASS`
   - Value: [paste the 16-character app password you generated]
   - Environment: Production, Preview, Development (check all)

5. Click **Save**

## 3. Redeploy

After adding environment variables, redeploy your site:

- Either push a new commit to trigger automatic deployment
- Or use the "Redeploy" button in Vercel dashboard

## 4. Test the Form

Once deployed:

1. Go to your live site: https://alecsdesign.xyz
2. Navigate to the Contact section
3. Fill out and submit the form
4. Check your email at `mka.alecs@gmail.com`

## Local Development (Optional)

To test locally:

1. Create a `.env.local` file in the root directory
2. Add:
   ```
   EMAIL_USER=mka.alecs@gmail.com
   EMAIL_PASS=your-app-password-here
   ```
3. Run `npm run dev`

**Note:** Never commit `.env.local` to git - it's already in `.gitignore`

## Troubleshooting

- **"Failed to send email"**: Check that environment variables are set correctly in Vercel
- **"Invalid credentials"**: Regenerate the Gmail App Password
- **"Less secure app access"**: Use App Password instead of regular password
- **Not receiving emails**: Check spam folder, verify `EMAIL_USER` is correct

## How It Works

1. User fills out the contact form
2. Form data is sent to `/api/contact` (Vercel serverless function)
3. The function uses Nodemailer to send email via Gmail SMTP
4. Email is sent to `mka.alecs@gmail.com`
5. User receives success/error message
