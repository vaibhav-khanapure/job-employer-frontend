const COOKIES = {
    // Auth
    AUTH: {
        REFRESH_TOKEN: "__user-sid", // User refresh token, Valid for 30 Days
        GOOGLE_TEMPORARY_CODE: "__user-gstate", // Store google initiate code - valid for 5 mins
    }
};

export default COOKIES;