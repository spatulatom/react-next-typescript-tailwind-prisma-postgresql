import "./globals.css"
import Nav from "./Nav"
import { Roboto } from "@next/font/google"
import AuthContext from "./AuthContext"
import QueryWrapper from "./QueryWrapper"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
})

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable} font-sans bg-zinc-200`}
      >
        <QueryWrapper>
          <AuthContext>
            {/* @ts-expect-error Server Component */}
            <Nav />
            {children}
          </AuthContext>
        </QueryWrapper>
      </body>
    </html>
  )
}
