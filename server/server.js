const express = require("express");
const csp = require('content-security-policy');
const app = express();
const path = require("path");
const publicPath = path.join(__dirname, "..", "build");
const port = process.env.PORT || 3001;
const cors = require("cors")


const cspPolicy = {
    'report-uri': '/reporting',
    'default-src': csp.SRC_NONE,
    'script-src': [ csp.SRC_SELF, csp.SRC_DATA ]
};

const globalCSP = csp.getCSP(csp.STARTER_OPTIONS);
const localCSP = csp.getCSP(cspPolicy);

app.use(globalCSP);

app.use(express.static(publicPath));
app.use(cors());

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(port, () => {
    console.log("Server is up!!");
});
