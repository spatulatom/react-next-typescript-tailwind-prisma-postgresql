import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { signIn } from 'next-auth/react';
import Login from './Login';
import Logged from './Logged';
import Link from 'next/link';

export default async function Nav() {
  const session = await unstable_getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center py-8 ">
      <Link href={'/'}>
        <h1 className="font-bold text-lg italic">SendPost</h1>
      </Link>
      <ul className="flex items-center gap-6">
      <li>
            <Link href={'/'}>
              <h1 className="text-lg">Home</h1>
            </Link>
          </li>
        {session && (
          <li>
            <Link href={'/myposts'}>
              <h1 className="text-lg">My Posts</h1>
            </Link>
          </li>
        )}
        {!session && <Login />}
        {session?.user && <Logged image={session.user.image || ''} />}
      </ul>
    </nav>
  );
}
