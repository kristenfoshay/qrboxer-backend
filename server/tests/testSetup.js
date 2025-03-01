// tests/testSetup.js

const { query, closeDb } = require("../config/db");

async function commonBeforeAll() {
  // Clean database
  await query("DELETE FROM boxes");
  
  // Add test data if needed
  await query(`
    INSERT INTO boxes (room, move)
    VALUES ('Test Room', 1)
  `);
}

async function commonBeforeEach() {
  await query("BEGIN");
}

async function commonAfterEach() {
  await query("ROLLBACK");
}

async function commonAfterAll() {
  await closeDb();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
};
