var config = module.exports;

config["Browser tests"] = {
    env: "browser",        // or "node"
    rootPath: "../",
    sources: [
        "js/**/*.js",    // Paths are relative to config file
    ],
    tests: [
        "test/*-test.js"
    ]
};