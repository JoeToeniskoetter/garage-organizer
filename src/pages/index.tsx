import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

export default function Home() {
  const { data } = useSession();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <p className="text-2xl">Garage Organizer</p>
        {JSON.stringify(data)}
        <Link
          href={"/api/auth/signin"}
          className="m-10 w-4/5 rounded bg-slate-400 p-2 text-white hover:bg-slate-500"
        >
          Sign In
        </Link>
        <Link href={"/containers/list"}>View Containers</Link>
      </main>
    </>
  );
}