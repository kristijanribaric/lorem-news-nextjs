import prisma from '../../../db'
import { getSession } from 'next-auth/react';


const uploaderForm = async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {

      const article = JSON.parse(req.body);
      const session = await getSession({ req });

      const savedArticle = await prisma.$transaction(async (prisma) => {

        const category= await prisma.category.createMany({
         data: article.category.map(name => ({name})),
         skipDuplicates: true,
       })
       
       const articles = prisma.articles.create({ 
          data: {
            title: article.title,
            short: article.short,
            long: article.long,
            categories: { 
              create: article.category.map(name => ({name})).map(connect => ({connect})).map(category => ({category}))
                
            },
            image: article.image,
            author: { connect: { email: session?.user?.email } },
            publishedDate: new Date()
          } 
        });
     
        return articles
      })

      res.status(200).json(savedArticle);
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  };

  export default uploaderForm;
