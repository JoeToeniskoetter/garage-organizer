import { Button, Navbar } from "flowbite-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface MainLayoutProps {}

export const MainLayout: React.FC<MainLayoutProps> = ({}) => {
  const { data } = useSession();
  const { route } = useRouter();
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <span className="invisible self-center whitespace-nowrap text-xl font-semibold dark:text-white lg:visible">
          Garage Organizer
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {data ? <Button>Sign Out</Button> : <Button>Sign In</Button>}
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
