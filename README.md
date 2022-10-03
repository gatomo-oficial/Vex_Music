# Music commands of Vex
### Information:
This bot uses [erela.js](https://www.npmjs.com/package/erela.js) as music player in this Open Source, we recommend you to have some basic knowledge about this module, if not, here you have a [guide](https://erelajs-docs.netlify.app/guides/introduction.html) and [documentation](https://erelajs-docs.netlify.app/docs/gettingstarted.html).

### Features:
- Multi-platform support. **_Spotify_**, **_Soundcloud_** and more.
- Fast and of good quality.
- Easy to use.

### Installation:
- File `.env`:
```js
Token = YOUR_DISCORD_TOKEN
Prefix = YOUR_PREFIX
```
- Dependencies used for this Open Source:
```js
"dependencies": {
    "better-erela.js-apple": "^1.0.5",
    "discord.js": "^14.5.0",
    "dotenv": "^16.0.3",
    "erela.js": "^2.4.0",
    "erela.js-deezer": "^1.0.7",
    "erela.js-spotify": "^1.2.0",
    "erela.js-tidal": "^1.0.2",
    "glob": "^7.1.7"
  }
````
- We install the dependencies:
```
node install
```
- We start the bot:
```
node .
```