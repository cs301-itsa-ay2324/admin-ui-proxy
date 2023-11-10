import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import useSWR from 'swr';
import  logo from '../../public/Ascenda.png';

const loadData = (url: string) =>
  fetch(url).then((resp) => {
    if (resp.ok) {
      return resp.json() as Promise<any>;
    } else {
      return resp.json().then((error) => {
        throw error;
      });
    }
  });

export default function Profile() {
    const { data: session, status } = useSession();

    const loading = status === 'loading';
  
    const { data: user, isValidating } = useSWR(`/api/userinfo`, (url) => loadData(url));
  
    const scope = 'urn:zitadel:iam:org:project:roles';

  
  const companyName = 'Ascenda Loyalty';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <div className="flex justify-center mb-4">
          <Image src={logo} width={150} height={50} alt={`${companyName} logo`} priority={true} />
        </div>
        {!session && (
          <>
            <p className="text-center text-lg mb-4">Sign in to your account</p>
            <button
              onClick={() => signIn('zitadel', { callbackUrl: 'http://localhost:3000/' })}
              className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Sign in
            </button>
          </>
        )}
        {(loading || isValidating) && <span>Loading...</span>}
      </div>
    </div>
  );
}