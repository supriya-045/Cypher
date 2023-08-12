import { fromBase58 } from "./base";

export async function encrypt(message) {
    const symKey = await generateSymmetricKey();

    const initVector = crypto.getRandomValues(new Uint8Array(16));

    const encryptedBuffer = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: initVector
        },
        symKey,
        new TextEncoder().encode(message)
    );

    const exportedKey = await crypto.subtle.exportKey("raw", symKey);

    return {
        encryptedMessage: new Uint8Array(encryptedBuffer),
        exportedKey: new Uint8Array(exportedKey),
        initVector
    }

}

export async function decrypt(encryptedMessage, symKey, initVector) {
    const key = await crypto.subtle.importKey("raw", fromBase58(symKey), { name: "AES-GCM", length: 128 }, false, ["decrypt"]);
    const message = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: fromBase58(initVector),
        },
        key,
        fromBase58(encryptedMessage)
    );
    return new TextDecoder().decode(message);
}

export async function generateSymmetricKey() {
    return await crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 128
        },
        true,
        ["encrypt", "decrypt"]
    )
}