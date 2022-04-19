import { Prisma } from "@prisma/client";
import prisma from '../../../db'
import { getSession } from 'next-auth/react';


const uploaderForm = async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {

      const article = JSON.parse(req.body);
      const session = await getSession({ req });
      const savedArticle = await prisma.articles.create({ 
        data: {
          title: article.title,
          short: article.short,
          long: article.long,
          category: { connect: {id: article.category } },
          image: article.image,
          author: { connect: { email: session?.user?.email } },
          publishedDate: new Date()
          
        } });
      res.status(200).json(savedArticle);
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  };

  export default uploaderForm;
