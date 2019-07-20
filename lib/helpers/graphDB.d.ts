declare function initDB(): Promise<import("idb").IDBPDatabase<unknown>>;
export { initDB };
