import formidable from "formidable";
import { createTweet } from "~/server/db/tweets";
import { tweetTransformer } from "~/server/transformers/tweet";
import { createMediaFile } from "~/server/db/mediaFiles";

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const response = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });

  const { fields, files } = response;

  const userId = event.context?.auth?.user?.id;

  const tweetData = {
    text: fields.text,
    authorId: userId,
  };

  const tweet = await createTweet(tweetData);

  const filePromises = Object.keys(files).map(async (key) => {
    return createMediaFile({
      url: "",
      providerPublicId: "random_id",
      userId: userId,
      tweetId: tweet.id,
    });
  });

  await Promise.all(filePromises);

  return {
    tweet: tweetTransformer(tweet),
  };
});
