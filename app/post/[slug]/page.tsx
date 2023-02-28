import Post from '../../Post';
import AddComment from './AddComment';
import Image from 'next/image';
import { useQuery } from 'react-query';
import axios from 'axios';
import { PostType } from '../../../types/Post';
import { motion } from 'framer-motion';
import Comments from './comments';
import prisma from '../../../prisma/client';


async function handler(id: string) {
  try {
    const data = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        hearts: true,
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            user: true,
          },
        },
      },
    });

    return data;
  } catch (err) {
    return { err: 'Error has occured while making a post' };
  }
}

type comment = {
  createdAt?: string;
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
};

type URL = {
  params: {
    slug: string;
  };
  // searchParams: string
};
//Fetch All posts
const fetchDetails = async (slug: string) => {
  const response: PostType = await handler(slug);
  return response;
};

// url below equals to router().query.parans
export default async function PostDetail(url: URL) {
  const data = await fetchDetails(url.params.slug);

  return (
    <div>
      <Post
        id={data?.id}
        name={data?.user.name}
        avatar={data?.user.image}
        postTitle={data?.title}
        comments={data?.comments}
      />
      <AddComment id={data?.id} />
      <Comments comments={data?.comments} />
    </div>
  );
}
