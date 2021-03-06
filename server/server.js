const express = require("express");
const app = express();
const path = require("path");
const publicPath = path.join(__dirname, "..", "build");
const port = process.env.PORT || 3001;
const cors = require("cors")
const helmet = require("helmet");


app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                "default-src": ["'self'"],
                "script-src": ["'self'", "'unsafe-inline'"],
                "script-src-elem": ["'self'", "'unsafe-inline'"],
            },
        },
    })
);

app.use(express.static(publicPath));
app.use(cors());

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(port, () => {
    console.log("Server is up!!");
});
