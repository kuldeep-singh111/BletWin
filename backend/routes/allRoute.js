const express = require("express");
const { authenticate } = require("../middleware/auth")
const { login, signup } = require("../controllers/userControl")
const { userProfile, getAllUser } = require("../controllers/userProfile")
const { updateUserProfile } = require("../controllers/updateUserProfile");
const { logoutUser } = require("../controllers/logoutUser");
const { TeamChooseGet, TeamChoosePost, createLineUp } = require("../controllers/teamChooseGet")
const { MatchOverview, createMatch, deleteMatch, updateMatch } = require("../controllers/matchOverview");
const { WalletPage, AddFunds, AddFundssSuccess, Withdrawal } = require("../controllers/wallet");
const { ContestHandle, JoinContest, checkUserContest, createContest, getAllContests, deleteContest, updateContest } = require("../controllers/contest");
const { LeaderBoard, Finalize, CalculateScores, createPlayerStat } = require("../controllers/leaderboard");
const { contact } = require("../controllers/contact.controller.js");

const router = express.Router();

// Contact Routes
router.post('/api/contact', contact);

// Auth Routes
router.post("/login", login)
router.post("/signup", signup)

// Profile Routes
router.get("/profile", authenticate, userProfile)
router.put("/profile/update", authenticate, updateUserProfile)

// Team Routes
router.get('/team/choose/:matchId', authenticate, TeamChooseGet)
router.post("/team/choose/save/:matchId", authenticate, TeamChoosePost)

// Match Overview Route
router.get("/match/overview", authenticate, MatchOverview)

router.get('/contest/check-contest/:userId/:matchId', checkUserContest)

// Wallet Route
router.get("/wallet", authenticate, WalletPage);
router.post("/wallet/add-funds", authenticate, AddFunds);
router.get("/wallet/add-funds/success", authenticate, AddFundssSuccess);
router.post("/wallet/withdraw", authenticate, Withdrawal);

//Contest Route
// router.get("/contest", authenticate, ContestHandle);
router.get("/contest/:matchId", authenticate, ContestHandle);
router.post("/contest/join", authenticate, JoinContest)

//LeaderBoard Route
router.get("/leaderboard", authenticate, LeaderBoard)
router.post("/leaderboard/finalize/:contestId", authenticate, Finalize)
router.post("/leaderboard/calculate/scores", authenticate, CalculateScores)



// Logout Route
router.post("/logout", authenticate, logoutUser)

// admin routes
router.post("/admin/match", authenticate, createMatch)
router.post("/admin/contest", authenticate, createContest)
router.post("/admin/team", authenticate, createLineUp)
router.post('/admin/player-stats', createPlayerStat);

router.get("/admin/getMatches", authenticate, MatchOverview);
router.delete("/admin/deleteMatch/:matchId", authenticate, deleteMatch);
router.put("/admin/updateMatch/:matchId", authenticate, updateMatch);
// router.get("/admin/getTeams", authenticate, getAllTeams);

router.get("/admin/getContests", authenticate, getAllContests);
router.delete("/admin/deleteContest/:contestId", authenticate, deleteContest);
router.put("/admin/updateContest/:contestId", authenticate, updateContest);

router.get("/admin/getUsers", authenticate, getAllUser);
module.exports = router;