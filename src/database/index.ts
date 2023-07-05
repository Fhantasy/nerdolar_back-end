import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  username: "nerdolar",
  password: "nerdolar",
  database: "nerdolar_development",
  host: "127.0.0.1",
  dialect: "postgres",
  define: {
    underscored: true,
  },
});
