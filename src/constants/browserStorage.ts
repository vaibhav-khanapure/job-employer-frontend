const BROWSER_STORAGE = {
    LOCAL: {
        USER_SIGNED_IN: 'sha-log' // Indicates user Signed in
    },

    SESSION: {},

    COOKIES: {
        // Auth
        AUTH: {
            REFRESH_TOKEN: "__user-sid", // User refresh token, Valid for 30 Days
            GOOGLE_TEMPORARY_CODE: "__user-gstate", // Store google initiate code - valid for 5 mins
            GOOGLE_PROVIDED_CODE: "__user-gpcode"
        }
    },
};

export default BROWSER_STORAGE;