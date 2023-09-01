import { Button, Card } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { MainLayout } from "~/layout/MainLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Garage Organizer</title>
        <meta name="description" content="garage organizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout />
      <main className="m-10 flex min-h-screen flex-col items-center">
        <p className="visible text-2xl lg:invisible">Garage Organizer</p>
        <div className="m-10 w-full">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card>
              <p className="text-xl font-bold">Step 1</p>
              <div>Create a new tub and print your QR code</div>
            </Card>
            <Card>
              <p className="text-xl font-bold">Step 2</p>
              <div>Add items to you tub</div>
            </Card>
            <Card>
              <div>
                <p className="text-xl font-bold">Step 3</p>
                Store your tub anywhere you can still scan the QR Code
              </div>
            </Card>
            <Card>
              <p className="text-xl font-bold">Step 4</p>
              <div>Scan your tub to see whats inside</div>
            </Card>
          </div>
        </div>
        <div className="flex items-center">
          <Link href={"/containers"}>
            <Button className="max-w-full">View My Containers</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
