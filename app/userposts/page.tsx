"use client"


import { redirect } from "next/navigation"
import { PostType } from "../../types/Post"
import Comments from "../myposts/comments"
import EditPost from "../myposts/EditPost"
import React, { useState, useEffect } from 'react';
import AddPost from "../AddPost"
import Post from "../Post"
    
const fetchAuthPosts = async () => {
    const response = await fetch("/api/userposts")
    const data = await response.json()
    return data
  }

export default function Userposts() {

const[data, setData]=useState([])

useEffect(()=>{
    const response = fetchAuthPosts();
    setData(response)
},[])
  

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