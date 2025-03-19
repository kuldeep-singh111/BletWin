const logoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        expires: new Date(0),
    });

    return res.status(200).json({ success: true, message: "Logged out successfully." });
};

module.exports = { logoutUser };
