import prisma from '../../../db'


const handle = async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {

      const categoryName = JSON.parse(req.body);

      const category =  await prisma.category.findMany({
        where : {
            name: {
             contains: categoryName,
             mode: 'insensitive'
            }
        },
      })

      res.status(200).json(category);
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  };

  export default handle;
