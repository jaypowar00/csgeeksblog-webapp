import Head from "next/head";
function Home() {
  return (
    <>
      <Head>
        <title>CSGeeks Blog</title>
        <meta name="description" content="Official CS Geeks Blog, know the tech, feel the tech! A place for tech." />
        <meta name="og:image" content="/CSGeeksBlog-OG-Thumbnail.jpg" />
        <meta property="og:image:width" content="1140" />
        <meta property="og:image:height" content="540" />
        <meta name="og:title" content="CSGeeks Blog | Official" />
        <meta name="og:description" content="Want to know tech, then take your tech with CS Geeks' Official Blog!" />
        <meta name="og:url" content={`${window.location.host}/`} />
        <meta property="og:type" content="website" />
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