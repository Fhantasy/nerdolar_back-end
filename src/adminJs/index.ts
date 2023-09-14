import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { brandingOptions } from "./branding";
import { authenticationOptions } from "./authentication";
import { adminJSResources } from "./resources";
import { locale } from "./locale";
import session from "express-session";
import connectSession from "connect-session-sequelize";
import { ADMINJS_COOKIE_PASS } from "../config/enviroment";

const SequelizeStore = connectSession(session.Store);
const store = new SequelizeStore({ db: sequelize });
store.sync();

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  resources: adminJSResources,
  locale: locale,
  branding: brandingOptions,
});

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  authenticationOptions,
  null,
  {
    resave: false,
    saveUninitialized: false,
    store: store,
    secret: ADMINJS_COOKIE_PASS,
  }
);
