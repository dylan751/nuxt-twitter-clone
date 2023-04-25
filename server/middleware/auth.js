import UrlPattern from "url-pattern";
import { decodeAccessToken } from "~/server/utils/jwt";
import { sendError } from "h3";
import { getUserById } from "../db/users";

export default defineEventHandler(async (event) => {
  const endpoints = ["/api/auth/user", "/api/user/tweets"];

  // Check if this pattern matches with the endpoint we hitting
  const isHandledByThisMiddleware = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);

    return pattern.match(event.node.req.url);
  });

  if (!isHandledByThisMiddleware) {
    return;
  }

  const token = event.node.req.headers["authorization"]?.split(" ")[1];

  const decoded = decodeAccessToken(token);

  if (!decoded) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      })
    );
  }

  try {
    const userId = decoded.userId;

    const user = await getUserById(userId);

    event.context.auth = { user };
  } catch (error) {
    return;
  }
});
