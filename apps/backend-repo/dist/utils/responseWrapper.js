"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = void 0;
const createResponse = (success, message, data, error) => {
    const errorMessage = typeof error === "string"
        ? error
        : error instanceof Error
            ? error.message
            : Boolean(error)
                ? "An unknown error occurred"
                : undefined;
    return {
        success,
        message,
        data,
        error: errorMessage,
    };
};
exports.createResponse = createResponse;
