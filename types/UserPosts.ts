type PostType = {
    id: string
    title: string
    updatedAt?: string
    user: {
      email: string
      id: string
      image: string
      name: string
    }
    comments: {
      createdAt?: string
      id: string
      postId: string
      title: string
      userId: string
      user: {
        email: string
        id: string
        image: string
        name: string
      }
    }[]
  }
  

export type UserPosts={
    id: string,
    name: string,
    emailVerified: boolean,
    image: string,
    posts: PostType[]
  
  }