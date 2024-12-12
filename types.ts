export type ExtraGlobals = typeof globalThis & {
  Testing: boolean;
};


export type Bytes = Uint8Array;