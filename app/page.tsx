"use client"

import Post from "./Post"
import AddPost from "./AddPost"
import { useQuery } from "react-query"
import axios from "axios"
import { PostType } from "../types/Post"

//Fetch All posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}

// without the return type here npm run build produces Entry type error, 
// even wuth the return type the line 'if(error) return error' produces error
export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ["posts"],
    
  })
  // if (error) return error
  if (error) return "Something went wrong. Try again in a minute"
  if (isLoading) return "Loading....."
const response: PostType[] = data;
  return (
    <div>
      <AddPost />
      {response?.map((post) => (
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