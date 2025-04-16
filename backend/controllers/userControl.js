const User = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*** Login Controller*/

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            // console.error("User not found.");
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            // console.error("Password mismatch.");
            return res.status(401).json({ success: false, message: "Invalid password." });
        }

        const token = jwt.sign(
            { email: user.email, id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );


        // HttpOnly Cookie for Authentication
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: token
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

/** * Signup Controller */

const signup = async (req, res) => {
    const { username, email, mobileNo, password, referralCode } = req.body;

    if (!username || !email || !mobileNo || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(409).json({ message: "Email already in use!" });
        }

        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(409).json({ message: "Username already in use!" });
        }

        let usernameAsReferralCode = null;

        if (referralCode) {
            usernameAsReferralCode = await User.findOne({ username: referralCode });

            if (!usernameAsReferralCode) {
                return res.status(409).json({ message: "Invalid referral code!" });
            }

            // add cash bonus to the refferer
            usernameAsReferralCode.wallet.cashBonus += 10;
            await usernameAsReferralCode.save();
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            mobileNo,
            password: hashedPassword,
            referralCode: referralCode || null,
        });

        const userSaved = await newUser.save();//console.log(userSaved)
        if (referralCode) {
            userSaved.wallet.cashBonus += 30;
        } else {
            userSaved.wallet.cashBonus += 20;
        }
        await userSaved.save();

        return res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        // console.error(" Signup Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { login, signup };
