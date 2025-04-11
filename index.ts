const { createServer } = require("http");
const { inspect } = require("util");
const {
  addMessage,
  removeMessage,
  getMessages,
} = require("./src/data-manager");
const { AppDataSource } = require("./src/data-source");

const server = createServer(async (request: any, response: any) => {
  let url: string = request.url;
  let params: Array<string> = [];
  let paramMap: Map<string, string> = new Map();
  let path: string = "";

  try {
    path = url.split("?")[0];
    params = url.split("?")[1].split("&");
  } catch (e) {
    console.log("No parameters");
  }

  for (let i = 0; i < params.length; i++) {
    let param: Array<string> = params[i].split("=");
    paramMap.set(param[0], param[1]);
  }

  response.writeHead(200, { "Content-Type": "application/json" });

  if (path === "/add-message") {
    let author: string = paramMap.get("author") || null;
    let message: string = paramMap.get("message") || null;
    let imageURI: string = paramMap.get("imageURI") || null;

    if (author === null || message === null) {
      response.write(JSON.stringify({ response: "author or message is null" }));
      response.end();
      return;
    }

    await addMessage(author, message, imageURI);

    response.write(JSON.stringify({ response: "ok" }));
    response.end();
    return;
  }

  if (path === "/remove-message") {
    let id: string = paramMap.get("id") || null;

    if (!id || isNaN(parseInt(id))) {
      response.write(JSON.stringify({ response: "id is not a number" }));
      response.end();
      return;
    }

    await removeMessage(parseInt(id));

    response.write(JSON.stringify({ response: "ok" }));
    response.end();
    return;
  }

  if (path === "/get-messages") {
    let messages = await getMessages();
    let messagesString = JSON.stringify(messages);

    response.write(JSON.stringify({ response: messages }));
    response.end();

    return;
  }

  response.write(JSON.stringify({ error: "404" }));
  response.end();
  return;
});

AppDataSource.initialize()
  .then(() => {
    server.listen(8080);
  })
  .catch((err) => {
    console.error("Failed to initialize DB:", err);
  });
