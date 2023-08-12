import express from "express";
import { newEntryValidator } from "../utils/validator.js";
import { validationResult } from "express-validator";
import { mongoDb } from "../client/mongoClient.js";
import { Collections } from "../constants/config.js";
import { ObjectId } from "mongodb";

const router = express.Router();

async function storeCipherTextToStorage(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({
                success: false,
                message: "Ill-formatted input was provided."
            });
        }

        const { encryptedMessage, initVector, readsRemaining, expiryTimestamp } = req.body;
        const queryResponse = await mongoDb
            .collection(Collections.STORAGE)
            .insertOne({ encryptedMessage, initVector, readsRemaining, expiryTimestamp });
        if (queryResponse.acknowledged) {
            return res.status(200).send({
                success: true,
                id: queryResponse.insertedId.toString()
            })
        } else {
            return res.status(500).send({
                success: false,
                message: "Internal Server Error!"
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error!"
        });
    }

}

async function getCipherTextFromStorage(req, res) {
    try {
        const id = req.query.id.toString();
        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Missing `id` query parameter."
            })
        }
        const cipherDoc = await mongoDb.collection(Collections.STORAGE).findOne({ _id: new ObjectId(id) });
        if (!cipherDoc) {
            return res.status(404).send({
                success: false,
                message: "Not found."
            });
        }
        if ((cipherDoc.readsRemaining !== null && cipherDoc.readsRemaining < 1) || (cipherDoc.expiryTimestamp !== null && cipherDoc.expiryTimestamp < Date.now())) {
            await mongoDb.collection(Collections.STORAGE).deleteOne({ _id: new ObjectId(id) });
            return res.status(404).send({
                success: false,
                message: "Already expired."
            });
        }

        const { encryptedMessage, initVector, readsRemaining, expiryTimestamp } = cipherDoc;
        const queryResponse = await mongoDb.collection(Collections.STORAGE).updateOne({ _id: new ObjectId(id) }, { $inc: { readsRemaining: -1 } });

        return res.status(200).send({
            success: true,
            data: {
                encryptedMessage,
                initVector,
                readsRemaining: readsRemaining - 1,
                expiryTimestamp
            }
        })
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

router.post("/store", newEntryValidator, storeCipherTextToStorage);
router.get("/fetch", getCipherTextFromStorage);

export default router;