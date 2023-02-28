import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import prisma from '../../prisma/client';
import { Session } from 'inspector';
import { PostType } from '../../types/Post';
import EditPost from './EditPost';
import Uuu from './uuu'
import {UserPosts} from '../../types/UserPosts';

async function getSession() {
  return await unstable_getServerSession(authOptions);
}
 

export default async function Dashboard() {
  const session = await getSession();
  if (!session) {
    redirect('/api/auth/signin');
  }
  async function handler() {
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
        include: {
          posts: {
            orderBy: {
              createdAt: 'desc',
            },
            
          },
        },
      });

      return data;
    } catch (err) {
      return { err: 'Error has occured while getting your posts' };
    }
  }
  async function getMyPosts() {
    const res = await handler();
    const data: UserPosts = await res;
    return data;
  }

  const data: UserPosts = await getMyPosts();
  console.log('DATAAA', data)
  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome back {session?.user?.name}</h1>
      {data?.posts?.map((post) => (
        <>
        <EditPost
          id={post.id}
          key={post.id}
          avatar={post.user.image}
          name={post.user.name}
          title={post.title}
          comments={post.comments}
        />
        <Uuu comments={post.comments}/>
        
        </>
      ))}
    </main>
  );
}
