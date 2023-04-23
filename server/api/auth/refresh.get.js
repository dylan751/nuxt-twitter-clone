import { sendError, parseCookies } from "h3";
import { getRefreshTokenByToken } from "~/server/db/refreshTokens";
import { decodeRefreshToken, generateTokens } from "~/server/utils/jwt";
import { getUserById } from "~/server/db/users";

export default defineEventHandler(async (event) => {
  // Get the refresh_token from cookie
  const cookies = parseCookies(event);

  const refreshToken = cookies.refresh_token;
  if (!refreshToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh token is invalid",
      })
    );
  }

  // Check if this refresh_token is in our DB
  const rToken = await getRefreshTokenByToken(refreshToken);

  if (!rToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh token is invalid",
      })
    );
  }

  // Check if the refresh token is valid or not
  const token = decodeRefreshToken(refreshToken);

  // Create new access_token from the refresh_token's info
  try {
    const user = await getUserById(token.userId);

    const { accessToken } = generateTokens(user);

    return { access_token: accessToken };
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Something went wrong",
      })
    );
  }
});
