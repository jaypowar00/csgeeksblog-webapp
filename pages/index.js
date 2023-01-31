import Head from "next/head";
function Home() {
  return (
    <>
    <Head>
      <title>CSGeeks Blog</title>
      <meta name="description" content="Official CS Geeks Blog, know the tech, feel the tech! A place for tech."/>
    </Head>
      <div className="flex justify-center text-center w-[80vw] h-screen mt-52">
        <h1 className="mx-auto justify-center">
          CSGeeks Blog V2.0
          <br />
          Created Using NextJS + Tailwind
        </h1>
      </div>
    </>
  );
}

export default Home;