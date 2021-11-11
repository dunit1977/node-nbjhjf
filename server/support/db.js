import fs from 'fs/promises';
import { join } from 'path';

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import { basePath } from './constants.js';

const dbDir = join(basePath, '.data');
const dbPath = join(dbDir, 'database.sqlite');

// Small helper to ensure we don't initialize the database more than once.
const memoize = (fn) => {
  let cached = null;
  return () => cached ?? (cached = fn());
};

const getDatabase = memoize(async () => {
  await fs.mkdir(dbDir, { recursive: true });
  let db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  await db.exec(
    'CREATE TABLE IF NOT EXISTS data (key TEXT UNIQUE, value TEXT)'
  );
  return db;
});

const parse = (input) => {
  try {
    return JSON.parse(input);
  } catch (e) {
    return null;
  }
};

export default {
  get: async (key) => {
    let db = await getDatabase();
    let result = await db.get('SELECT value FROM data WHERE key = ?', [key]);
    return result ? parse(result.value) : null;
  },

  set: async (key, value) => {
    let db = await getDatabase();
    let strVal = JSON.stringify(value);
    await db.run(
      'INSERT INTO data VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?',
      [key, strVal, strVal]
    );
  },

  del: async (key) => {
    let db = await getDatabase();
    await db.run('DELETE FROM data WHERE key = ?', [key]);
  },

  has: async (key) => {
    let db = await getDatabase();
    let result = await db.get('SELECT key FROM data WHERE key = ?', [key]);
    return result != null;
  },

  // close: async () => {
  //   let db = await getDatabase();
  //   await db.close();
  // },
};
