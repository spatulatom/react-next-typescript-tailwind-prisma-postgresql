import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import prisma from '../../prisma/client';
import { Session } from 'inspector';
import { PostType } from '../../types/Post';
import EditPost from './EditPost';
import Comments from './comments';


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
            include: {
              comments: {
                orderBy: {
                  createdAt: 'desc',
                },
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });

      return data;
    } catch (err) {
      return { err: 'Error has occured while getting your posts' };
    }
  }
 
  
   type UserPosts={
      id: string,
      name: string,
      email:string,
      emailVerified: boolean,
      image: string,
      posts:  {
        id: string
        title: string
        createdAt: string
        updatedAt?: string
        published: Boolean
        userId: string
        user: {
          email: string
          id: string
          image: string
          name: string
        }
        comments: {
          createdAt: string
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
      }[]
    
    }

  async function getMyPosts() {
    try {
      const res = await handler();
      const userPosts: UserPosts = await res;
      return userPosts;
    } catch (err) {
      return err;
    }
  }

  const userPosts: UserPosts = await getMyPosts();
  console.log('userPostsAA', userPosts);
  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome back {session?.user?.name}</h1>
      {userPosts?.posts?.map((post) => (
        <>
          <EditPost
            id={post.id}
            key={post.id}
            avatar={userPosts.image}
            name={userPosts.name}
            title={post.title}
            comments={post.comments}
          />
          <Comments comments={post.comments} />
        </>
      ))}
    </main>
  );
}
