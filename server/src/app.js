import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// # routes
import userRoutes from "./routes/userRoute.js";
import feeStatusRoutes from "./routes/feeStatusRoute.js";
import itrFormStatusRoutes from "./routes/itrFormStatusRoute.js";
import itrFormTypeRoutes from "./routes/itrFormTypeRoute.js";
import financialYearRoutes from "./routes/financialYearRoute.js";
import clientRoutes from "./routes/clientRoute.js";

dotenv.config();
connectDB();

const PORT = 3000;

const app = express();
console.log(process.env.CLIENT_APP_BASE_URL);

const whitelist = [process.env.CLIENT_APP_BASE_URL, "http://localhost:5173"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.some((url) => origin && origin.startsWith(url)) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// const corsOptions = {
//   origin: true,
//   credentials: true,
//   optionsSuccessStatus: 200,
// };


app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/fee_status", feeStatusRoutes);
app.use("/api/itr_form_status", itrFormStatusRoutes);
app.use("/api/itr_form_type", itrFormTypeRoutes);
app.use("/api/financial_year", financialYearRoutes);
app.use("/api/clients", clientRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
