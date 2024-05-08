import dotenv from "dotenv";

dotenv.config();
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import expressEjsLayouts from "express-ejs-layouts";
import { employeeRoutes } from "./src/routes/employee.routes.js";
import { handleError } from "./middlewares/error.middleware.js";
import cors from "cors";
import { studentRoutes } from "./src/routes/student.routes.js";
import { interviewRoutes } from "./src/routes/interview.routes.js";
export const app = express();

app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false },
  })
);
app.use(cors());
// Setting up express for parsing req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Making public folder publically accessible
app.use(express.static(path.resolve("public")));

// ejs setup
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "view"));
app.use(expressEjsLayouts);

// Homepage
app.get("/", (req, res, next) => {
  res.render("index", { loggedIn: req.session.employee });
});
// Routes
app.use("/employee", employeeRoutes);
app.use("/student", studentRoutes);
app.use("/interview", interviewRoutes);
// Error 404
app.use("/error", (req, res) => {
  res.render("error", { loggedIn: false, error: "Page not found" });
});
// Error 404 handler
app.use((req, res, next) => {
  res.render("error", {
    loggedIn: req.session.employee,
    error: "Page Not Found!",
  });
});
// Error Handler
app.use((err, req, res, next) => {
  handleError(err, req, res, next);
});
