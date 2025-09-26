#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');
const http = require('http');

const args = process.argv.slice(2);
const BIN_DIR = path.resolve(__dirname); // nfm_home/bin

function nodeList() {
    const nodeDir = path.dirname(process.execPath);
    console.log('Node.js files in:', nodeDir);
    fs.readdirSync(nodeDir).forEach(f => console.log(f));
}

function nodePackageList(packageName) {
    const locations = [];
    const pathsToCheck = process.env.NODE_PATH ? process.env.NODE_PATH.split(path.delimiter) : [];
    pathsToCheck.push(path.join(process.cwd(), 'node_modules'));

    if (!packageName) {
        console.log('Usage: nfm node package list <package>');
        return;
    }

    pathsToCheck.forEach(dir => {
        const pkgPath = path.join(dir, packageName);
        if (fs.existsSync(pkgPath)) locations.push(pkgPath);
    });

    if (locations.length) {
        console.log(`Package "${packageName}" found in:`);
        locations.forEach(loc => console.log(loc));
    } else {
        console.log(`Package not found: ${packageName}`);
    }
}

function restoreHealth() {
    if (process.cwd() !== BIN_DIR) {
        console.log("Error: 'restore health' can only be run inside nfm_home/bin");
        return;
    }
    console.log("Restoring NFM health...");
    execSync("node " + path.join("D:", "nfm", "build.js"), { stdio: "inherit" });
}

function refreshNFM() {
    if (process.cwd() !== BIN_DIR) {
        console.log("Error: 'refresh' can only be run inside nfm_home/bin");
        return;
    }
    console.log("Refreshing NFM...");
    console.log("NFM is refreshed and ready.");
}

function downloadFile(url) {
    if (
        !(url.startsWith("http://socket.io/") ||
          url.startsWith("https://socket.io/") ||
          url.startsWith("http://cdn.socket.io/") ||
          url.startsWith("https://cdn.socket.io/"))
    ) {
        console.log("Only socket.io and cdn.socket.io are supported (http/https).");
        return;
    }

    let filename;
    if (url === "http://socket.io/" || url === "https://socket.io/") {
        filename = "socket.io.html"; // homepage HTML
    } else {
        filename = path.basename(new URL(url).pathname) || "download.js";
    }

    const file = fs.createWriteStream(filename);
    const client = url.startsWith("https") ? https : http;

    client.get(url, res => {
        if (res.statusCode !== 200) {
            console.error(`Download failed: ${res.statusCode}`);
            return;
        }
        res.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded: ${filename}`);
        });
    }).on("error", err => {
        console.error("Error: " + err.message);
    });
}

// -------------------- CLI --------------------
if (args[0] === 'node') {
    if (args[1] === 'list') {
        nodeList();
    } else if (args[1] === 'package' && args[2] === 'list') {
        nodePackageList(args[3]);
    } else {
        console.log('Unknown node command');
    }
} else if (args[0] === 'restore' && args[1] === 'health') {
    restoreHealth();
} else if (args[0] === 'refresh') {
    refreshNFM();
} else if (args[0] === 'download') {
    if (!args[1]) {
        console.log("Usage: nfm download <url>");
    } else {
        downloadFile(args[1]);
    }
} else {
    console.log('Commands available: node list, node package list <package>, restore health, refresh, download');
}
