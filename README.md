# LinkedIn Invitation Acceptor — Chrome Extension

A Chrome Extension (Manifest V3) built as an educational project to explore browser extension development, DOM manipulation, and asynchronous JavaScript patterns.

## Features

- Triggered manually via toolbar icon (no background automation)
- Accepts invitations top-to-bottom with humanized random delays
- Configurable delay interval and batch limit via extension options
- Visual progress banner, cancel anytime by re-clicking the icon
- Supports EN (`Accept`) and PL (`Akceptuj`) interfaces

## Installation

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** and select this folder
4. Navigate to LinkedIn invitations page and click the extension icon

## Configuration

Right-click the extension icon → **Options** to adjust:
- Delay between clicks (min/max in ms)
- Maximum invitations per batch

## Disclaimer

> **This project is created solely for educational purposes related to Chrome extension development.**
>
> It is intended as a learning exercise in Manifest V3 APIs, content script injection, DOM interaction, and asynchronous JavaScript patterns. It is **not** intended to be used for automating any LinkedIn functionality.
>
> Using automated tools on LinkedIn may violate their [User Agreement](https://www.linkedin.com/legal/user-agreement) and [Terms of Service](https://www.linkedin.com/legal/l/service-terms). The author does not encourage or endorse any use of this extension that would violate LinkedIn's terms.
>
> **Use at your own risk.** The author assumes no responsibility for any consequences resulting from the use of this software.

## License

MIT
