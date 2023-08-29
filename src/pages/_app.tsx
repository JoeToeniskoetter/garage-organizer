import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { env } from "~/env.mjs";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-red-500 hover:bg-red-600",
    },
  },
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Flowbite theme={{ theme: customTheme }}>
        <Component {...pageProps} />
      </Flowbite>
      {env.NEXT_PUBLIC_NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
