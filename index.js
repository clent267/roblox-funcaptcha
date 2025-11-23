const express = require("express");
const fun = require("roblox-funcaptcha");

const app = express();
const PORT = process.env.PORT || 3000;

// Example: get a token and then a captcha challenge
app.get("/captcha", async (req, res) => {
  try {
    const publicKey = process.env.FUNCAPTCHA_PUBLIC_KEY; // set this in Render env
    const token = await fun.getToken(publicKey);
    const session = await fun.getFuncaptcha(token);

    // Return info about the captcha challenge
    res.json({
      challengeID: session.challengeID,
      gameVariant: session.gameVariant,
      waves: session.waves,
      // etc.
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching captcha");
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});
