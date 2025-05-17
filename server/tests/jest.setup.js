// jest.setup.js

const { query, closeDb, getDatabase } = require("../config/db");
const { BCRYPT_WORK_FACTOR } = require("../config/config");
const bcrypt = require("bcrypt");

// Initialize db synchronously to ensure it's ready before tests
let db;
jest.setTimeout(10000); // Increase timeout to allow for database connection

// Use a before-jest-runs approach to ensure db is connected before any tests run
(async function initializeDb() {
  try {
    // Set NODE_ENV to test if not already set
    process.env.NODE_ENV = process.env.NODE_ENV || "test";
    
    // Try to connect to the database
    db = await getDatabase();
    console.log("Test database connected successfully");
  } catch (err) {
    console.error("Failed to connect to test database:", err);
    console.warn("Tests will be skipped if database is not available");
    // Don't exit - let the tests run and skip DB tests if necessary
  }
})();

// Still keep the beforeAll hook to ensure the database is connected for each test suite
beforeAll(async () => {
  try {
    if (!db || !db._connected) {
      db = await getDatabase();
    }
  } catch (err) {
    console.error("Error connecting to database in beforeAll:", err);
    // Skip tests that require database
    console.warn("Some tests may be skipped due to database connection issues");
  }
});

async function commonBeforeAll() {
  await query("DELETE FROM items");
  await query("DELETE FROM boxes");
  await query("DELETE FROM moves");
  await query("DELETE FROM users");

  const hashedPassword = await bcrypt.hash("password123", BCRYPT_WORK_FACTOR);
  await query(`
    INSERT INTO users (username, password, email, admin)
    VALUES ('testuser1', $1, 'test1@test.com', FALSE),
           ('testuser2', $1, 'test2@test.com', FALSE),
           ('admin', $1, 'admin@test.com', TRUE)`,
    [hashedPassword]
  );

  const moveResults = await query(`
    INSERT INTO moves (location, date, username)
    VALUES ('Location 1', '2024-01-01', 'testuser1'),
           ('Location 2', '2024-02-01', 'testuser1'),
           ('Location 3', '2024-03-01', 'testuser2')
    RETURNING id`
  );
  const moveIds = moveResults.rows.map(r => r.id);

  const boxResults = await query(`
    INSERT INTO boxes (name, room, move)
    VALUES ('Box1', 'Living Room', $1),
           ('Box2', 'Kitchen', $1),
           ('Box3', 'Bedroom', $2)
    RETURNING id`,
    [moveIds[0], moveIds[1]]
  );
  const boxIds = boxResults.rows.map(r => r.id);

  await query(`
    INSERT INTO items (description, image, box)
    VALUES ('Item 1', 'image1.jpg', $1),
           ('Item 2', 'image2.jpg', $1),
           ('Item 3', 'image3.jpg', $2)`,
    [boxIds[0], boxIds[1]]
  );
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

const testObjects = {
  testUserData: {
    username: "testuser1",
    email: "test1@test.com",
    password: "password123"
  },
  testMoveData: {
    location: "Test Location",
    date: "2024-01-01",
    username: "testuser1"
  },
  testBoxData: {
    room: "Test Room",
    move: 1
  },
  testItemData: {
    description: "Test Item",
    image: "test.jpg",
    box: 1
  }
};

jest.mock("../helpers/tokens", () => ({
  createToken: jest.fn(() => "test-token")
}));


global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testObjects,
  db
};
