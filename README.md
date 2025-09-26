# NFM (Node File Manager)

A lightweight Node.js-based CLI tool for managing Node.js installations, packages, and simple maintenance tasks.

✨ Features

Node.js inspection

nfm node list – list all files in your Node.js installation directory

nfm node package list <package> – check if a package exists in your node_modules or NODE_PATH

Health & refresh

nfm restore health – restores NFM health by running D:\nfm\build.js (only inside nfm_home/bin)

nfm refresh – refreshes NFM state (only inside nfm_home/bin)

Downloader (restricted)

nfm download <url> – download files from

socket.io

cdn.socket.io
(Other URLs are blocked for safety)

🖥️ Usage
# List Node.js files
nfm node list

# Check if "express" is installed
nfm node package list express

# Restore health (only from nfm_home/bin)
nfm restore health

# Refresh NFM (only from nfm_home/bin)
nfm refresh

# Download from Socket.IO CDN
nfm download https://cdn.socket.io/4.7.5/socket.io.js

⚙️ Installation

Clone this repo and add nfm to your PATH:

git clone https://github.com/<your-username>/nfm.git
cd nfm/nfm_home/bin
npm link


Now nfm is available as a global command.

🔒 Note: restore health and refresh are intentionally locked to run only inside nfm_home/bin for security reasons.
