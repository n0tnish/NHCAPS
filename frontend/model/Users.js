import { connection as db } from "../config/index.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../middleware/AuthenticateUser.js";
class Users {
  fetchUsers(req, res) {
    const qry = `
        SELECT userID,firstName,lastName,email,password
        FROM users
        `;
    db.query(qry, (err, results) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        results,
      });
    });
  }
  fetchUser(req, res) {
    const qry = `
    SELECT userID,firstName,lastName,email,password
    FROM users
        WHERE userID = ${req.params.id}
        `;
    db.query(qry, (err, result) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        result,
      });
    });
  }
  async createUser(req, res) {
    //payload
    let data = req.body;
    data.userPwd = await hash(data?.userPwd, 10);
    let user = {
      emailAdd: data.emailAdd,
      userPwd: data.userPwd,
    };
    const qry = `
    INSERT INTO users
    SET ?;
    `;
    db.query(qry, [data], (err) => {
      if (err) {
        res.json({
          status: res.statusCode,
          msg: "already exists.please use another email address",
        });
      } else {
        //create token
        let token = createToken(user);
        res.json({
          status: res.statusCode,
          token,
          msg: "You're registered",
        });
      }
    });
  }

  deleteUsers(req, res) {
    const qry = `DELETE FROM users ;`;

    db.query(qry, (err) => {
      if (err) throw err;

      res.json({
        status: res.statusCode,
        msg: "Users are deleted!",
      });
    });
  }

  deleteUser(req, res) {
    const qry = `DELETE FROM users WHERE userID=${req.params.id} ;`;
    // const user = req.body

    db.query(qry, (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Users are deleted!",
      });
    });
  }

  async updateUser(req, res) {
    let data = req.body;
    if (data?.userPwd) {
      data.userPwd = await hash(data?.userPwd, 8);
    }
    const qry = `
      UPDATE users 
      SET ?
      WHERE userID = ${req.params.id};`;

    db.query(qry, [data], (err) => {
      if (err) throw err;

      res.json({
        status: res.statusCode,
        msg: "User updated!",
      });
    });
  }

  login(req, res) {
    const { email, password } = req.body;
    const qry = `SELECT userID,firstName,lastName,email,password
    FROM users
  WHERE email='${email}'`;

    db.query(qry, async (err, result) => {
      if (err) throw err;
      if (!result?.length) {
        res.json({
          status: res.statusCode,
          msg: "You provided a wrong email address",
        });
      } else {
        const validPass = await compare(password, result[0].password);
        if (validPass) {
          const token = createToken({
            email,
            password,
          });
          res.json({
            status: res.statusCode,
            msg: "You logged in",
            result,
            token,
          });
        } else {
          res.json({
            status: res.statusCode,
            msg: "Please provide correct password",
            result,
          });
        }
      }
    });
  }
}
export default  Users ;