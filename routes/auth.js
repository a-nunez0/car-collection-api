const express = require("express");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// Starts GitHub OAuth login
router.get("/github", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.CALLBACK_URL}&scope=user:email`
  );
});

// GitHub sends the user back here after login
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/status" }),
  (req, res) => {
    res.redirect("/auth/status");
  }
);

// Logs out the current user
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
});

// Shows if someone is logged in
router.get("/status", (req, res) => {
  if (req.user) {
    res.json({
      loggedIn: true,
      user: {
        username: req.user.username,
        displayName: req.user.displayName,
        profileUrl: req.user.profileUrl
      }
    });
  } else {
    res.json({
      loggedIn: false,
      message: "No user is logged in"
    });
  }
});

module.exports = router;