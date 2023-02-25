

import Post from "./Post"
import AddPost from "./AddPost"
// import { useQuery } from "react-query"
import axios from "axios"
import { PostsType } from "./types/Posts"

//Fetch All posts
// const allPosts = async () => {
//   const response = await axios.get("/api/posts/getPosts")
//   return response.data
// }
// async function getPosts() {
//   const res = await fetch("/api/posts/getPosts");
//   const data: PostsType[] = await res.json();
//   return data;


export default async function Home() {
  // const { data, error, isLoading } = useQuery<PostsType[]>({
  //   queryFn: allPosts,
  //   queryKey: ["posts"],
  // })
  // if (error) return error
  // if (isLoading) return "Loading....."
  const res = await fetch("http://localhost:3000/api/posts/getPosts");
  const data: PostsType[] = await res.json();


  return (
    <div>
      <AddPost />
      {data?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  )
}
