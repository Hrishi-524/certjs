export const JAVASCRIPT_SNIPPET = `app.post(
    "/certjs/webhook",
    async (req, res) => {
        const event = req.body;

        console.log(event);

        res.sendStatus(200);
    }
);`;

export const PYTHON_SNIPPET = `@app.post("/certjs/webhook")
def webhook():
    event = request.json

    print(event)

    return "", 200`;