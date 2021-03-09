const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const setMetaTags = ({ title, description, img, url }) => {
    const metas = `
        <meta property="og:type" content="article">
        <meta property="og:site_name" content="Citiesapps">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${img}">
        <meta property="og:url" content="${url}">
    `;

    return metas;
};

app.use((req, res, next) => {
    next();
});

app.use(express.static(`${__dirname}/client-side`));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", __dirname);

app.get("*", (req, res) => {
    /**
     * Reading the  HTML file as string to add meta tags inside of it.
     *
     */
    const clientSideHTMLStr = fs.readFileSync(
        "./client-side/index.html",
        "utf8"
    );
    const DOM = new JSDOM(clientSideHTMLStr);
    const document = DOM.window.document;

    document.head.innerHTML =
        document.head.innerHTML +
        setMetaTags({
            title: "test title",
            description: "lorem.........",
            img: "https://............",
            url: "https://............",
        });

    const html = DOM.serialize();
    console.log(html);
    fs.writeFileSync("./index.html", html);

    res.send(html);
});
app.listen(port, () => {
    console.log("server is upp");
});
