import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover and Share
            <br className="max-md:gidden" />
            <span className="orange_gradient text-center">
                AI-Powered Prompts
            </span>
        </h1>
        <p className="desc text-center">
            Promptverse is an open source AI Prompting tools for modern world to discover and share creative prompts
        </p>

        <Feed />
    </section>
  )
}

export default Home
