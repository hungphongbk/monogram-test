import Avatar from "./avatar";
import { useAuthContext } from "../utils/authContext";
import TextArea from "./text-area";
import Button from "./button";
import styles from "./post-tweet.module.scss";
import { Prisma } from "@prisma/client";
import { useCallback, useState } from "react";

const fetcher = (content: Prisma.PostCreateInput, token: string) =>
  fetch("/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(content),
  }).then((res) => res.json());

type PostTweetProps = {
  onPosted: () => Promise<void>;
};
export default function PostTweet(props: PostTweetProps): JSX.Element {
  const user = useAuthContext(),
    [content, setContent] = useState(""),
    handlePosted = useCallback(async () => {
      await fetcher(
        {
          content,
        },
        user.idToken
      );
      await props.onPosted();
      setContent("");
    }, [content, props, user.idToken]);

  return (
    <div className={styles.Container}>
      <Avatar src={user.image!} />
      <div className={styles.Inner}>
        <TextArea
          className={"self-stretch"}
          type={"textarea"}
          rows={3}
          placeholder={"What's on your mind..."}
          value={content}
          // @ts-ignore
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant={"contained"} size={"large"} onClick={handlePosted}>
          Send mweet
        </Button>
      </div>
    </div>
  );
}
