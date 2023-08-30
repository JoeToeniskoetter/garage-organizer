import { Button, Navbar } from "flowbite-react";
import { signOut, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const MainLayout: React.FC = ({}) => {
  const { data } = useSession();
  const { route } = useRouter();
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <Image
          src={"/warehouse.png"}
          alt="logo"
          height={50}
          width={50}
          className="p-2"
        />
        <span className="invisible self-center whitespace-nowrap text-xl font-semibold dark:text-white lg:visible">
          Garage Organizer
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {data ? (
          <Button onClick={signOut}>Sign Out</Button>
        ) : (
          <Button onClick={signIn}>Sign In</Button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={route === "/"} href="/" as={Link}>
          <p>Home</p>
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/containers/list"
          active={route.toString().includes("containers")}
        >
          Containers
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
