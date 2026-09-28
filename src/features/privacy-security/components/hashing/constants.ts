export const HASH_ALGORITHMS = [
  "MD5",
  "SHA-1",
  "SHA-256",
  "SHA-384",
  "SHA-512",
  "SHA-3-256",
] as const;

export type HashAlgorithm = (typeof HASH_ALGORITHMS)[number];
export type WebCryptoAlgorithm = keyof typeof WEB_CRYPTO_ALGORITHMS;

export interface HashResult {
  name: HashAlgorithm;
  value: string;
}

export const SAMPLE_TEXTS = [
  "Hello, World!",
  "The quick brown fox jumps over the lazy dog",
  "https://flagsdev.com",
  '{"user": "developer", "role": "admin"}',
] as const;

export const WEB_CRYPTO_ALGORITHMS = {
  "SHA-1": "SHA-1",
  "SHA-256": "SHA-256",
  "SHA-384": "SHA-384",
  "SHA-512": "SHA-512",
} as const;

export const EMPTY_RESULTS: HashResult[] = HASH_ALGORITHMS.map((name) => ({
  name,
  value: "",
}));

export const COPY_RESET_DELAY = 1500;
export const HASH_DEBOUNCE_DELAY = 100;

export interface HashGeneratorProps {
  inputType?: "text" | "file";
}
