import mongoose from "mongoose";
// eslint-disable-next-line import/no-extraneous-dependencies
import validator from "validator";
// eslint-disable-next-line import/order
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		min: 6,
		max: 255,
		required: [true, "name can not be null"],
	},
	walletAddress: {
		type: String,
		required: [true, "wallet address can not ne null"],
		validate: [validator.isEthereumAddress, "Not an Ethereum-compatible wallet address"],
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		lowercase: true,
		required: [true, "email can not be null"],
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
	pass: {
		type: String,
		required: [true, "Password can not be null"],
		min: 8,
		max: 255,
		select: false,
	},
	confirmPass: {
		type: String,
		min: 8,
		max: 255,
		select: false,
	},
	isEmailVerified: {
		type: Boolean,
		default: false,
	},
	otpDetails: {
		otp: {
			type: String,
		},
		otpExpiration: {
			type: Number,
		},
	},
	created: {
		type: Date,
		default: Date.now,
	},
});

userSchema.pre("save", async function (next) {
	if (this.isModified("pass")) {
		this.pass = await bcrypt.hash(this.pass, 10);
		this.confirmPass = undefined;
	}
	next();
});
userSchema.methods.validatePassword = async function (pass, userpass) {
	// eslint-disable-next-line no-return-await
	return await bcrypt.compare(pass, userpass);
};

const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;
