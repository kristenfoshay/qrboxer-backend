"use strict";

const { query } = require('../config/db');
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config/config.js");

class User {

  static async authenticate(username, password) {

    const result = await query(
      `SELECT username,
                  password,
                  email,
                  firstName,
                  lastName,
                  admin
           FROM users
           WHERE username = $1`,
      [username],
    );

    const user = result.rows[0];

    if (user) {

      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  static async register(
    { username, password, email, firstName, lastName }) {
    const duplicateCheck = await query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await query(
      `INSERT INTO users
           (username,
            password,
            email,
            firstName,
            lastName,
            admin)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING username, email, firstName, lastName, admin`,
      [
        username,
        hashedPassword,
        email,
        firstName,
        lastName,
        false
      ],
    );

    const user = result.rows[0];

    return user;
  }

  static async findAll() {
    const result = await query(
      `SELECT *
           FROM users
           ORDER BY username`,
    );

    return result.rows;
  }

  static async get(username) {
    const userRes = await query(
      `SELECT username,
                  email,
                  admin,
                  firstName,
                  lastName
           FROM users
           WHERE username = $1`,
      [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    const movesRes = await query(
      `SELECT id, location, date, username
       FROM moves
       WHERE username = $1`,
      [username],
    );

    user.moves = movesRes.rows.map(move => ({
  ...move,
  date: new Date(move.date)
}));
    return user;
  }

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        admin: "admin",
      });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                email,
                                admin,
                                firstName,
                                lastName`;
    const result = await query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  static async remove(username) {
    let result = await query(
      `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
      [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }


}


module.exports = User;
