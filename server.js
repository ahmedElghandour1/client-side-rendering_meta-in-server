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
/**
 * Reading the  HTML file as string to add meta tags inside of it.
 *
 */
const clientSideHTMLStr = fs.readFileSync("./client-side/index.html", "utf8");
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

fs.writeFileSync("./index.html", DOM.serialize());

app.listen(port, () => {
    console.log("server is upp");
});
