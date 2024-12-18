// jest.setup.js

const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const bcrypt = require("bcrypt");

async function commonBeforeAll() {
  // Delete data from all tables
  await db.query("DELETE FROM items");
  await db.query("DELETE FROM boxes");
  await db.query("DELETE FROM moves");
  await db.query("DELETE FROM users");

  // Create test users
  const hashedPassword = await bcrypt.hash("password123", BCRYPT_WORK_FACTOR);
  await db.query(`
    INSERT INTO users (username, password, email, admin)
    VALUES ('testuser1', $1, 'test1@test.com', FALSE),
           ('testuser2', $1, 'test2@test.com', FALSE),
           ('admin', $1, 'admin@test.com', TRUE)`,
    [hashedPassword]
  );

  // Create test moves
  const moveResults = await db.query(`
    INSERT INTO moves (location, date, username)
    VALUES ('Location 1', '2024-01-01', 'testuser1'),
           ('Location 2', '2024-02-01', 'testuser1'),
           ('Location 3', '2024-03-01', 'testuser2')
    RETURNING id`
  );
  const moveIds = moveResults.rows.map(r => r.id);

  // Create test boxes
  const boxResults = await db.query(`
    INSERT INTO boxes (room, move)
    VALUES ('Living Room', $1),
           ('Kitchen', $1),
           ('Bedroom', $2)
    RETURNING id`,
    [moveIds[0], moveIds[1]]
  );
  const boxIds = boxResults.rows.map(r => r.id);

  // Create test items
  await db.query(`
    INSERT INTO items (description, image, box)
    VALUES ('Item 1', 'image1.jpg', $1),
           ('Item 2', 'image2.jpg', $1),
           ('Item 3', 'image3.jpg', $2)`,
    [boxIds[0], boxIds[1]]
  );
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

// Export objects for testing
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
    move: 1  // This will need to be updated with actual move ID in tests
  },
  testItemData: {
    description: "Test Item",
    image: "test.jpg",
    box: 1  // This will need to be updated with actual box ID in tests
  }
};

// Mock tokens helper
jest.mock("./helpers/tokens", () => ({
  createToken: jest.fn(() => "test-token")
}));

// Global test configuration
jest.setTimeout(10000); // 10 second timeout

// Suppress console logs during tests unless explicitly needed
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

// Add custom matchers if needed
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
};
