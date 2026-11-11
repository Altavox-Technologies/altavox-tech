import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const rules = await readFile(new URL('../firestore.rules', import.meta.url), 'utf8');
const config = JSON.parse(await readFile(new URL('../firebase.json', import.meta.url), 'utf8'));
const indexes = JSON.parse(await readFile(new URL('../firestore.indexes.json', import.meta.url), 'utf8'));

assert.equal(config.firestore.rules, 'firestore.rules');
assert.equal(config.firestore.indexes, 'firestore.indexes.json');
assert.match(rules, /rules_version = '2'/);
assert.match(rules, /function isAdmin\(\)/);
assert.match(rules, /request\.auth\.token\.admin == true/);
assert.match(rules, /allow read, write: if false/);
assert.match(rules, /request\.auth\.uid == userId/);
assert.ok(indexes.indexes.some((index) =>
  index.collectionGroup === 'events' &&
  index.fields.some((field) => field.fieldPath === 'visibility') &&
  index.fields.some((field) => field.fieldPath === 'createdAt')
));

console.log('Firestore config checks passed.');
