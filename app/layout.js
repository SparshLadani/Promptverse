import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Feed from "@components/Feed";

export const metadata = {
    title: "Promptverse",
    description: "Welcome to the world of prompting. Discover and share AI prompts"
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout;
