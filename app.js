const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const url = require("url");

// get parameters from the env
const PORT = process.env.PORT || 3001;
const discord_client_id =
  process.env.discord_client_id || "1068620487082647694";
const discord_client_secret =
  process.env.discord_client_secret || "ukjSNa7f2AexpEouuaTxQfqY4fdQyF7P";
const Multi_bot_server = 742472532715634749;

app.use(express.static('assets'));

app.get('/', (request, response) => {
  return response.sendFile('/public/index.html', { root: '.' });
});

app.get("/health", (req, res) => {
  res.send("Multi Bot is healthy");
});

app.get("/status", (req, res) => {
  res.send("Multi Bot is online");
});

app.get('/invite.html', (request, response) => {
  return response.sendFile("/public/invite.html", { root: '.' });
});

app.get('/discord.html', (request, response) => {
  return response.sendFile('/public/discord.html', { root: '.' });
});

app.get('/arabic.html', (request, response) => {
  return response.sendFile('/public/arabic.html', { root: '.' });
});

app.get('/api/auth/discord/redirect', (request, response) => {
  return response.sendFile('/public/dashboard.html', { root: '.' });
});

// login with discord

app.get("/api/auth/discord/redirect", async (req, res) => {
  const { code } = req.query;
  if (code) {
    // Prepare the port request
    const formData = new url.URLSearchParams({
      client_id: discord_client_id,
      client_secret: discord_client_secret,
      grant_type: "authorization_code",
      code: code.toString(),
      redirect_uri: `http${
        req.headers.host.includes("localhost") ? "" : "s"
      }://${req.headers.host}/api/auth/discord/redirect`,
    });

    // send the request to the discord api
    const response = await axios.post(
      "https://discord.com/api/v8/oauth2/token",
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    
    // work with the discord's respons
    const { access_token } = response.data;
    const { data: userResponse } = await axios.get(
      "https://discord.com/api/v8/users/@me",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { data: guilds } = await axios.get(
      "https://discord.com/api/v8/users/@me/guilds",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log(userResponse);
    // console.log(guilds);

    res.send("data collected successfully");
  }
});

app.listen(PORT, () => console.log(`Running on Port ${PORT}`));