import { getSession, useSession } from "next-auth/react";
import { Layout } from "../components/layout"
import { Session } from "next-auth";
import { GetServerSideProps } from "next";
import useSWR from "swr";

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

export default function Home() {
  const { data: session, status } = useSession();

  const loading = status === 'loading';

  const { data: user, isValidating } = useSWR(`/api/userinfo`, (url) => loadData(url));

  const scope = 'urn:zitadel:iam:org:project:roles';
  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-10 text-5xl `}
      >
        Hello world {user?.name}
      </main>
    </Layout>
  )
}
