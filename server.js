const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const {
    isBot,
    setMetaTags,
    getDummyPosts,
    pathIntoArray,
} = require("./helpers");

app.use((req, res, next) => {
    next();
});

app.get("*", async (req, res) => {
    /**
     * Reading the  HTML file as string to add meta tags inside of it.
     */
    const clientSideHTMLStr = fs.readFileSync(
        "./client-side/index.html",
        "utf8"
    );
    if (!isBot(req.headers["user-agent"])) {
        res.send(clientSideHTMLStr);
    } else {
        /**
         * Transfer the string html file into Dom object to edit it.
         */
        const DOM = new JSDOM(clientSideHTMLStr);
        const document = DOM.window.document;
        const pathArr = pathIntoArray(req.url);
        if (+pathArr[1]) {
            const { data } = await getDummyPosts(pathArr[1]);
            document.head.innerHTML =
                document.head.innerHTML +
                setMetaTags({
                    title: data.title,
                    description:
                        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, expedita!",
                    img: data.url,
                    url: req.url,
                });
        }

        /**
         * Transform DOM  intro string contains the new updated HTML
         */
        const html = DOM.serialize();

        /**
         * In case of a bot this rendered.html is created for testing purposes
         */
        fs.writeFileSync("./rendered.html", html);
        /**
         *===========================
         */

        res.send(html);
    }
});
app.listen(port, () => {
    console.log(`🚀 [server]: started on port http://localhost:${port}`);
});
