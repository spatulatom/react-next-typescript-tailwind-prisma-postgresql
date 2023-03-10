// 'use client';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { signIn } from 'next-auth/react';
import Login from './Login';
import Logged from './Logged';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default async function Nav() {
  const data = await unstable_getServerSession(authOptions);
  // const router = useRouter();
  // const { data } = useSession();

  return (
    <nav className="flex justify-between items-center py-8 ">
    
      <ul className="flex items-center gap-2 md:gap-6">
      <Link href={"/"}>
        <h1 className="font-bold text-2lg italic text-teal-700">Chat Room</h1>
      </Link>
     

        {data && (
          <li>
            <Link href={'/myposts'}>
              <h1 className="hover:text-teal-600 transition-all md:text-lg">
                My Chats
              </h1>
            </Link>
          </li>
        )}
          {data && (
          <li>
            <Link href={'/userposts'}>
              <h1 className="hover:text-teal-600 transition-all md:text-lg">
                User Posts
              </h1>
            </Link>
          </li>
        )}
        {!data && <Login />}
        {data?.user && <Logged image={data.user.image || ''} />}
      </ul>
    </nav>
  );
}
