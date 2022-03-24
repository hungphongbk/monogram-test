import Avatar from "./avatar";
import { useAuthContext } from "../utils/authContext";
import TextArea from "./text-area";
import Button from "./button";
import styles from "./post-tweet.module.scss";

type PostTweetProps = {};
export default function PostTweet(props: PostTweetProps): JSX.Element {
  const user = useAuthContext();
  return (
    <div className={styles.Container}>
      <Avatar src={user.image!} />
      <div className={styles.Inner}>
        <TextArea
          className={"self-stretch"}
          type={"textarea"}
          rows={3}
          placeholder={"What's on your mind..."}
        />
        <Button variant={"contained"} size={"large"}>
          Send mweet
        </Button>
      </div>
    </div>
  );
}
