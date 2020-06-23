class CustomError extends Error {
    constructor(message = '', statusCode = DOTCMS_CUSTOM_ERROR, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }

        this.name = 'CustomError';
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = CustomError;