/**
 * Firestore Security Rules Verification Spec ("Dirty Dozen" Payload Assertions)
 * Verifies static schema boundaries and security invariants matching firestore.rules & firebase-blueprint.json.
 */
import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'

const rulesPath = path.resolve(process.cwd(), 'firestore.rules')
const blueprintPath = path.resolve(process.cwd(), 'firebase-blueprint.json')

const rules = fs.readFileSync(rulesPath, 'utf8')
const blueprint = JSON.parse(fs.readFileSync(blueprintPath, 'utf8'))

// 1. Default deny catch-all must be present
assert.match(rules, /match \/{document=\*\*} \{\s*allow read, write: if false;/)

// 2. Email verification required for admin email check & verified writes
assert.match(rules, /request\.auth\.token\.email == 'yurianarshad@gmail\.com'/)
assert.match(rules, /request\.auth\.token\.email_verified == true/)

// 3. No blanket isSignedIn() reads
assert.doesNotMatch(rules, /allow (read|get|list):\s*if\s*isSignedIn\(\)\s*;/)

// 4. Every blueprint collection has a matching rules block
for (const collectionPath of Object.keys(blueprint.firestore)) {
  const topCollection = collectionPath.split('/')[1]
  assert.ok(
    rules.includes(`match /${topCollection}/`),
    `Missing match block in firestore.rules for blueprint collection: ${collectionPath}`
  )
}

// 5. No get() or exists() inside allow list blocks
const listLines = rules
  .split('\n')
  .filter((line) => line.includes('allow list:'))
for (const line of listLines) {
  assert.doesNotMatch(line, /\b(get|exists|isAdmin)\(/, `Forbidden lookup inside allow list: ${line}`)
}

console.log('All Firestore security rule structural & Dirty Dozen invariant checks passed.')
