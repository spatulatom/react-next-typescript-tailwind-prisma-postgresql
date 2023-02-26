import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import prisma from '../../prisma/client';
import { Session } from "inspector";
import { PostsType } from '../types/Posts';
import EditPost  from './EditPost'

async function getSession(){return await unstable_getServerSession(authOptions)}


export default async function Dashboard() {
  const session: any = await getSession();
  if (!session) {
    redirect("/api/auth/signin")
  }
  async function handler(){
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        include: {
          posts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              comments: true,
            },
          },
        },
      })
  
      return data
    } catch (err) {
      return { err: "Error has occured while getting your posts" }
    }}
    async function getMyPosts() {
      const res = await handler();
      const data: PostsType[] = await res;
      return data;
    }

    const data:any = await getMyPosts()
  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome back {session?.user?.name}</h1>
      {data?.posts?.map((post:any) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </main>
  )
}
