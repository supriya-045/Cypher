import { check } from "express-validator";

export const newEntryValidator = [
    check("encryptedMessage").notEmpty().isString(),
    check("initVector").notEmpty().isString(),
    check("readsRemaining").notEmpty().isNumeric(),
    check("expiryTimestamp").notEmpty().isNumeric()
]