![](repository/banner.png)

<p align="center">
    <a><img src="https://github.com/4dams/achorn/workflows/build/badge.svg"></a>
    <br>
    <a><img src="https://img.shields.io/npm/v/achorn"></a>
    <a><img src="https://img.shields.io/badge/node-v8%2B-brightgreen"></a>
    <a><img src="https://img.shields.io/npm/dt/achorn"></a>
    <a><img src="https://img.shields.io/github/issues/4dams/achorn"></a>
    <a><img src="https://img.shields.io/github/issues-pr/4dams/achorn"></a>
</p>

[`Achorn`](https://github.com/4dams/achorn) is a colorful, good-looking, fully customizable logging utility for the Browser. It is heavily inspired by [@klaussinani](https://github.com/klaussinani/signal)s [Signale](https://github.com/klaussinani/signale) logger for Node.js backend applications.

![](repository/example.png)

## Core Features

-   Fully customizable
-   No dependencies
-   Webpack Support (for Angular, React, ...)
-   Written and strongly typed in TypeScript
-   Easy to use **Timers**, e.g. for HTTP requests
-   ... you can even add your own loggers/prefixes!

## But does it work in...?

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Latest ✔                                                                                            | Latest ✔                                                                                               | 10+ ✔                                                                                       | Latest ✔                                                                                         | 6.1+ ✔                                                                                              |

## How to Install

### NPM

```
npm install achorn
```

### Yarn

```
yarn add achorn
```

### CDN

```html
<!-- unpkg -->
<script src="https://unpkg.com/achorn/lib/achorn.js"></script>

<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/achorn/lib/achorn.js"></script>
```

## How to Use

The first thing after importing Achorn is creating a `new Achorn()` instance:

```js
// Without config
const achorn = new Achorn();

// With custom config
const achorn = new Achorn({
    showTimestamp: true,
    globalPrefix: [...]
});
```

Achorn takes an optional Config object as input. For all config options, see the [config interface file](src/interfaces/config.interface.ts).

After the initial setup, you can already use any of Achorns default loggers, which are defined in their dedicated prefixes file. Optionally, you can add your own prefixes/loggers by providing them in the `prefixes` field in the Config.

## Timers

The most common use for Timers in Achorn are probably HTTP requests. Here's an example implementation:

```js
// Create new Timer called "Async"
const timer = achorn.timer("Async");

// Make request
request("https://google.com")
    .then((res) => {
        // End timer with success message
        timer.success("Request successful! 🎉", res);
    })
    .catch((err) => {
        // End timer with error message
        timer.error("Request failed.", err);
    });
```

![](repository/timer.png)

## Local Development

After cloning the repository, all you have to do is run `npm run watch` to start Webpack in watch mode, which will listen for file changes and rebuild Achorn accordingly.

Then, simply open the `index.html` of this project in the browser!
