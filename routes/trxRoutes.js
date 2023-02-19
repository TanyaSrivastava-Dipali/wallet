import express from "express";

// eslint-disable-next-line import/extensions
import * as trxController from "../controllers/trxController.js";
// eslint-disable-next-line import/extensions
import isUserLoggedIn from "../middleware/UserLoginStatus.js";

const trxRouter = express.Router();

trxRouter.route("/transfer").post(isUserLoggedIn, trxController.transferFunds);

trxRouter
	.route("/getTransactionDetail/:trxHash")
	.get(isUserLoggedIn, trxController.getTransactionDetail);
trxRouter.route("/getAllTransactions").get(isUserLoggedIn, trxController.getAllTransactions);

export default trxRouter;
