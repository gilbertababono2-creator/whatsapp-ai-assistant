# WhatsApp AI Personal Assistant Backend

## Setup

### Requirements
- Node.js 18+
- Firebase project with Firestore enabled
- Twilio WhatsApp Business API account
- OpenAI GPT-4 API key
- PayStack account
- Google Cloud project (for OAuth with Gmail/Calendar)

### Environment Variables
See `.env.example`.

### Steps
1. Clone repo
2. Run `npm install`
3. Set up `.env` with your keys
4. Deploy to Render/Railway/Firebase Functions
5. Set Twilio webhook URL to `https://<appointmentai-app.onrender.com>/webhook`
6. Configure PayStack webhook to `https://<appointmentai-app.onrender.com>/paystack/webhook`
7. Run `node index.js` locally for dev

### Reminders
- Reminders are scheduled via `node-schedule` and Firestore triggers.
- All user data encrypted at rest.
- Users can delete all data by texting "delete my data".