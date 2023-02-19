import jwt from "jsonwebtoken";

const jwtToken = (user, statusCode, req, res) => {
	// eslint-disable-next-line no-underscore-dangle
	const token = jwt.sign({ Id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
	res.cookie("jwt", token, {
		expires: new Date(Date.now() + 30 * 60 * 1000),
		httpOnly: true,
		secure: req.secure || req.headers["x-forwarded-proto"] === "https",
	});
	// eslint-disable-next-line no-param-reassign
	user.password = undefined;
	res.status(statusCode).json({
		status: "Success",
		token,
		data: {
			user,
		},
	});
};

export default jwtToken;