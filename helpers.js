const ua = require("useragent");
const axios = require("axios").default;

const setMetaTags = ({ title, description, img, url }) => {
    const metas = `
        <meta property="og:type" content="article">
        <meta property="og:site_name" content="Testing">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${img}">
        <meta property="og:url" content="${url}">
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="${url}">
        <meta property="twitter:title" content="${title}">
        <meta property="twitter:description" content="${description}">
        <meta property="twitter:image" content="${img}">
    `;
    return metas;
};

const isBot = (useragent) => {
    const agent = ua.is(useragent);
    return (
        !agent.webkit &&
        !agent.opera &&
        !agent.ie &&
        !agent.chrome &&
        !agent.safari &&
        !agent.mobile_safari &&
        !agent.firefox &&
        !agent.mozilla &&
        !agent.android
    );
};

const getDummyPosts = async (id) => {
    return await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
};

const pathIntoArray = (path) => {
    if (typeof path === "string") {
        return path.split("/").slice(1);
    }
    return path;
};

module.exports = {
    setMetaTags,
    isBot,
    getDummyPosts,
    pathIntoArray,
};
