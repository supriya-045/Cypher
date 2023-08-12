import baseX from "base-x";

const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export const toBase58 = (b) => baseX(alphabet).encode(b);

export const fromBase58 = (s) => baseX(alphabet).decode(s);