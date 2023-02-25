

import Post from "./Post"
import AddPost from "./AddPost"
// import { useQuery } from "react-query"
// import axios from "axios"
import { PostsType } from "./types/Posts"
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../prisma/client"


//Fetch All posts
// const allPosts = async () => {
//   const response = await axios.get("/api/posts/getPosts")
//   return response.data
// }

async function handler() {
  
    try {
      const data = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
          hearts: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      return data
    } catch (err) {
      return { err: "Error has occured while making a post" }
    }
  }


async function getPosts() {
  const res = await handler();
  const data: PostsType[] = await res
  return data;}


export default async function Home() {
  // const { data, error, isLoading } = useQuery<PostsType[]>({
  //   queryFn: allPosts,
  //   queryKey: ["posts"],
  // })
  // if (error) return error
  // if (isLoading) return "Loading....."
  const data = await getPosts()


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
