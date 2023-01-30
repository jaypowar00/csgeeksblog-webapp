import PostArticleItem from "@/components/PostArticleItem";



function Posts({ articles }) {
    return (
        <section className="posts-sections">
            <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6">
                <div className="grid gap-8 pb-32 lg:grid-cols-2">
                    {
                        articles.map((article) => {
                            return (<PostArticleItem
                                id={article._id} author={article.author}
                                title={article.title}
                                description={article.description}
                                created={article.created} tags={article.tags}
                                thumbnail={article.thumbnail}
                            />)
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default Posts;

export const getStaticProps = async (ctx) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CSGEEKS_API}/blog/posts`)
    const data = await response.json()
    let articles = []
    if (data.articles && data.articles.length > 0) articles = data.articles
    console.log(articles)
    return {
        props: { articles },
        revalidate: 10
    }
}