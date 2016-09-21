#Eliza

A Jason version of [Eliza](https://en.wikipedia.org/wiki/ELIZA) chatbot.

# How it works

The core logic is just a typical NLP technique I took from another open source module called `elizabot.js`.

Here's how the JASON part (`main.js`) works:

1. It starts an [express server](https://expressjs.com/)
2. A Jasonette client makes a GET request to `/`.
3. The server responds by sending back the JASON markup, and the client renders accordingly.
4. The JASON markup contains a [footer input](document.md#user-content-body-footer-input).
5. When a user presses the `send` button, it [triggers](interaction.md#how-can-actions-be-triggered) the `say` action, which makes a POST request to `/messages`.
6. The server responds to the `POST /messages` request by saving it into local variable and returning the result. (This doesn't use any persistent DB, so the variable only stays on memory and will get reset when the server becomes idle)

#License

Here's the license for the core Eliza logic.

    elizabot.js v.1.1 - ELIZA JS library (N.Landsteiner 2005)
    Eliza is a mock Rogerian psychotherapist.
    Original program by Joseph Weizenbaum in MAD-SLIP for "Project MAC" at MIT.
    cf: Weizenbaum, Joseph "ELIZA - A Computer Program For the Study of Natural Language
    Communication Between Man and Machine"
        in: Communications of the ACM; Volume 9 , Issue 1 (January 1966): p 36-45.
        JavaScript implementation by Norbert Landsteiner 2005; <http://www.masserk.at>
