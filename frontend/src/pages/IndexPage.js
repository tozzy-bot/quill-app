import Post from "../Post";
import {useEffect, useState} from "react";

const BASE_URL='https://quill-app-backend.onrender.com';

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/post`).then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
    </>
  );
}
