import { getUserByUsername } from "~/server/db/users";
import { generateTokens } from "~/server/utils/jwt";
import bcrypt from "bcrypt";
import { userTransformer } from "~/server/transformers/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }

  // Is the user registered
  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or password is invalid",
      })
    );
  }

  // Compare passwords
  const doesThePasswordMatch = await bcrypt.compare(password, user.password);

  // Generate Tokens
  // Access token
  // Refresh token
  const { accessToken, refreshToken } = generateTokens(user);

  // Save refresh token inside db

  // Add http only cookie

  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});
