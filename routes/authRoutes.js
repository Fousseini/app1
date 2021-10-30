const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    res.send({
      user: req.user,
    });
  });
};
//mongodb+srv://konate:<password>@konateapp1.pmqty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
