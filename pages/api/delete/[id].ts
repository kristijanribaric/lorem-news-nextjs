import prisma from "../../../db";

// DELETE /api/post/:id
export default async function handle(req, res) {
  const postId = req.query.id;
  if (req.method === 'DELETE') {
    const deletedArticle = await prisma.$transaction(async (prisma) => {

        const category= await prisma.categoriesOnArticles.deleteMany({
            where: { articleId: postId },
       })
       
       const article = prisma.articles.delete({ 
            where: { id: postId },
        });
     
        return article
      })

    res.json(deletedArticle);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}