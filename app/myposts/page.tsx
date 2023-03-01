import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import prisma from '../../prisma/client';
import { Session } from 'inspector';
import { PostType } from '../../types/Post';
import EditPost from './EditPost';
import Comments from './comments';

type UserPosts = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  posts: {
    id: string;
    title: string;
    createdAt: string;
    updatedAt?: string;
    published: Boolean;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
    comments: {
      createdAt: string;
      id: string;
      postId: string;
      title: string;
      userId: string;
      user: {
        email: string;
        id: string;
        image: string;
        name: string;
      };
    }[];
  }[];
};
type session = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};
async function handler() {
  const session: session | null = await unstable_getServerSession(authOptions);
  console.log('SESSION', session);

  try {
    const data = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            comments: {
              include:{
                user:true
              }
            }
          },
        },
      },
    });

    return data;
  } catch (err) {
    throw new Error('Error has occured while making a post');
  }
}

async function getMyPosts() {
  try {
    // const res = await fetch(`${process.env.URL}api/posts/addComment`);
    // const userPosts: UserPosts = await res.json();
    const userPosts = await handler();
    return userPosts;
  } catch (err) {
    throw new Error();
  }
}
export default async function Dashboard() {
  const session = await unstable_getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }

  const userPosts: UserPosts = await getMyPosts();
  console.log('userPostsAA', userPosts);
  return (
    <main>
      <h1 className="text-lg font-bold">
        Welcome {session?.user?.name}, here are your posts:
      </h1>
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
