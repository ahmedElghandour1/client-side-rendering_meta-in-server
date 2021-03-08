(() => {
    const app = document.querySelector("#app");
    app.innerHTML = `
        <style>
            *{
                box-sizing: border-box;
            }
            html, body{
                margin: 0;
                padding: 0
            }
            h1{
                text-align: center;
                color: red;
                margin-top: 100px;
            }
        </style>
        <h1>Rendered in the browser!</h1>
    `;
})();
