import http from "node:http";

const PORT = 3000;

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(payload));
};

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (req.method !== "POST" || req.url !== "/auth/register") {
    sendJson(res, 404, {
      success: false,
      message: "Route not found.",
    });
    return;
  }

  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    let requestBody;

    try {
      requestBody = body ? JSON.parse(body) : {};
    } catch {
      sendJson(res, 400, {
        success: false,
        message: "Invalid JSON body.",
      });
      return;
    }

    const { name, email, password } = requestBody;

    if (!name || !email || !password) {
      sendJson(res, 400, {
        success: false,
        message: "Name, email, and password are required.",
      });
      return;
    }

    const user = {
      id: Date.now(),
      name,
      email,
    };

    sendJson(res, 201, {
      success: true,
      message: "User registered successfully.",
      data: user,
    });
  });
});

server.listen(PORT, () => {
  console.log(`Register API running at http://localhost:${PORT}/auth/register`);
});
