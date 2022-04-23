import Link from 'next/link'
import { useState } from 'react';
import Image from 'next/image'
import {
  Card,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  createStyles,
  Loader,
  Tooltip,
  Modal, 
  Button
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { Category } from '@prisma/client';
import { BsBookmarkPlus, BsHeart, BsClipboardCheck } from 'react-icons/bs';
import { BiEdit, BiTrashAlt, BiShareAlt } from 'react-icons/bi';
import { useRouter } from 'next/router';




const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  categories: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: 'none',
    marginRight: "10px"
  },

  

  title: {
    display: 'block',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));



interface ArticleCardProps {
  id: string
  title: string
  description: string
  image: string
  date: string
  author: {
    name: string
    image: string
  }
  categories: Array<{category:Category}>
  isEditable: boolean
}


const Article = ({id,title,description,image,date,author,categories, isEditable}: ArticleCardProps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const clipboard = useClipboard();
  const [opened, setOpened] = useState(false);
  const { asPath } = useRouter();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const URL = `${origin}${asPath}`;
  const router = useRouter();

  async function deleteArticle(id: string): Promise<void> {
    await fetch(`/api/delete/${id}`, {
      method: 'DELETE',
    });
    setOpened(false);
    router.push("/myarticles");
    
  }
    

  return (
    
    // <Link href='/article/[id]' as={`/article/${id}`} passHref>
    //     <div className='cursor-pointer'>
    //     {image ? <Image src={image} alt={title} placeholder="blur" blurDataURL={image} layout="responsive" width={170} height={100} sizes="50vw"/> : <Loader className='m-auto' color="red" size="xl" variant="bars"/> }
    //     <h1 className='font-bold text-xl'>{title}</h1>
    //     <div className='flex'>
    //       <p className='font-thin text-gray-600'>{author}</p>
    //       <p className='font-thin text-gray-600'>{new Date(date).toLocaleDateString("hr-HR")}</p>
    //     </div>
    //     {categories.map(categories => <p className="bg-blue-600 text-white rounded-lg inline-block p-2 mx-2" key={categories.category.id}>{categories.category.name}</p>)}
        
    //     </div>
        
    // </Link>
    <>
    {isEditable && <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Do you really want to delete this article?"
      >
        <Center className='flex space-x-4'>
          <Button onClick={() => deleteArticle(id)} className='bg-blue-600 hover:bg-blue-700'>Yes</Button> 
          <Button onClick={() => setOpened(false)} className='bg-red-600 hover:bg-red-700'>No</Button>
        </Center>
        
      </Modal>}
    <Card withBorder radius="md" className={classes.card} >
      <Card.Section>
        <Link href='/article/[id]' as={`/article/${id}`} passHref>
          <a>{image ? <Image  src={image} alt={title} placeholder="blur" blurDataURL={image} layout="responsive" width={320}  height={180}/> : <Loader className='m-auto my-10' color="red" size="lg" />}</a>
        </Link>
      </Card.Section>

      <div className={classes.categories}>
        {categories.map(categories => <Badge key={categories.category.id} className="mx-0.5" variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
          {categories.category.name}
        </Badge> )}
      </div>

     
      


      <Link href='/article/[id]' as={`/article/${id}`} passHref>
        <Text className={classes.title} weight={500} component="a">
          {title}
        </Text>
      </Link>
      
      <Text size="sm" color="dimmed" lineClamp={4}>
        {description}
      </Text>

      <Group position="apart" className={classes.footer}>
        
          {isEditable ? <Center><Tooltip 
            withArrow 
            gutter={5}
            placement="center"
            position="bottom"
            radius="md"
            transition="slide-down"
            transitionDuration={200} label={author.name}><Avatar src={author.image} size={24} radius="xl" mr="xs" /></Tooltip> </Center> : <Center><Avatar src={author.image} size={24} radius="xl" mr="xs" />
           <Text size="sm" inline>
            {author.name}
          </Text></Center>}
          
          
        

        <Group spacing={8} mr={0}>
          {/* <ActionIcon className={classes.action} style={{ color: theme.colors.red[6] }}>
            <BsHeart size={16} />
          </ActionIcon>
          <ActionIcon className={classes.action} style={{ color: theme.colors.yellow[7] }}>
            <BsBookmarkPlus size={16} />
          </ActionIcon> */}

          {isEditable && <ActionIcon className={classes.action} >
            <BiEdit size={20} />
          </ActionIcon>}
          {isEditable && <ActionIcon className="text-red-600 hover:bg-red-400" onClick={() => setOpened(true)}>
            <BiTrashAlt size={20} />
          </ActionIcon>}
          
          <Text className='font-thin text-gray-600'>{new Date(date).toLocaleDateString("hr-HR")}</Text>
          <Tooltip
            label={<div className='flex space-x-2 p-1'><BsClipboardCheck className='text-lg'/><p>Copied article link!</p> </div>}
            gutter={5}
            placement="center"
            position="bottom"
            radius="md"
            transition="slide-down"
            transitionDuration={200}
            opened={clipboard.copied}
          >
            <ActionIcon className={classes.action} onClick={() => clipboard.copy(`${URL}article/${id}`)}>
              <BiShareAlt size={16} />
            </ActionIcon>
          </Tooltip>
         
        </Group>
      </Group>
    </Card>
    </>
  )
}

export default Article