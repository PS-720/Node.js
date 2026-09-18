import User from "../models/user.js";

export const handleGetAllUsers = async (req, res) => {
	const allDbUsers = await User.find({});
	return res.json(allDbUsers);
};

export const handleCreateNewUser = async (req, res) => {
	const body = req.body;
	if (
		!body ||
		!body.first_name ||
		!body.last_name ||
		!body.email ||
		!body.job_title ||
		!body.gender
	) {
		return res.status(400).json({
			msg: "All fields are required",
		});
	}

	const result = await User.create({
		first_name: body.first_name,
		last_name: body.last_name,
		email: body.email,
		job_title: body.job_title,
		gender: body.gender,
	});

	return res.status(201).json({
		msg: "Successfully Created",
		id: result._id,
	});
};

export const handleGetUserById = async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) return res.status(404).json({ error: "User not found" });
	return res.json(user);
};

export const handleUpdateUserById = async (req, res) => {
	const updatedUser = await User.findByIdAndUpdate(req.params.id, {
		last_name: "Shah",
	});
	return res.json(updatedUser);
};

export const handleDeleteUserById = async (req, res) => {
	const deletedUser = await User.findByIdAndDelete(req.params.id);
	return res.status(200).json({ status: "Successfully Deleted" });
};
