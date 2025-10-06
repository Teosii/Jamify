const bcrypt = require("bcryptjs");

const password = "Admin123"; // choose your admin password
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

console.log("Hashed password:", hashedPassword);
