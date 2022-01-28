require('dotenv').config();

export const CONFIG = {
    key: process.env.gcp_sheets_key,
    email: process.env.gcp_sheets_email,
    sheet_id: process.env.sheet_id,
    interval: process.env.REFRESH_INTERVAL,
    LIVE_API_KEY: process.env.LIVE_API_KEY!,
    LIVE_API_SECRET: process.env.LIVE_API_SECRET!

}