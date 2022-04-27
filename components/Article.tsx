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
  url : string
}


const Article = ({articleData,isEditable,refresher = () => null,url}) => {
  const { classes } = useStyles();
  const clipboard = useClipboard();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  console.log(articleData)

  async function deleteArticle(id: string): Promise<void> {
    await fetch(`/api/delete/${id}`, {
      method: 'DELETE',
    });
    setOpened(false);
    refresher();
    
  }
    

  return (
    <>
    {isEditable && <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Do you really want to delete this article?"
      >
        <Center className='flex space-x-4'>
          <Button onClick={() => deleteArticle(articleData.id)} className='bg-blue-600 hover:bg-blue-700'>Yes</Button> 
          <Button onClick={() => setOpened(false)} className='bg-red-600 hover:bg-red-700'>No</Button>
        </Center>
        
      </Modal>}
    <Card withBorder radius="md" className={classes.card} >
      <Card.Section>
        <Link href='/article/[id]' as={`/article/${articleData.id}`} passHref>
          <a>{articleData.image ? <Image  src={articleData.image} alt={articleData.title} placeholder="blur" blurDataURL={articleData.image} layout="responsive" width={320}  height={180}/> : <Loader className='m-auto my-10' color="red" size="lg" />}</a>
        </Link>
      </Card.Section>

      <div className={classes.categories}>
        {articleData.categories.map(categories => <Badge key={categories.category.id} variant="outline" className="mx-0.5 bg-gradient-to-r from-black/80 via-black/60  to-black/10 text-white border-none" >
          {categories.category.name}
        </Badge> )}
      </div>

     
      


      <Link href='/article/[id]' as={`/article/${articleData.id}`} passHref>
        <Text className={classes.title} weight={500} component="a">
          {articleData.title}
        </Text>
      </Link>
      
      <Text size="sm" color="dimmed" lineClamp={4}>
        {articleData.short}
      </Text>

      <Group position="apart" className={classes.footer}>
        
          {isEditable ? <Center><Tooltip 
            withArrow 
            gutter={5}
            placement="center"
            position="bottom"
            radius="md"
            transition="slide-down"
            transitionDuration={200} label={articleData.author.name}><Avatar src={articleData.author.image} size={24} radius="xl" mr="xs" /></Tooltip> </Center> : <Center><Avatar src={articleData.author.image} size={24} radius="xl" mr="xs" />
           <Text size="sm" inline>
            {articleData.author.name}
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
          
          <Text className='font-thin text-gray-600'>{new Date(articleData.publishedDate).toLocaleDateString("hr-HR")}</Text>
          <Tooltip
            label={<div className='flex items-center space-x-2 p-1'><BsClipboardCheck className='text-lg'/><p>Copied article link!</p> </div>}
            gutter={5}
            placement="center"
            position="bottom"
            radius="md"
            transition="slide-down"
            transitionDuration={200}
            opened={clipboard.copied}
          >
            <ActionIcon className={classes.action} onClick={() => clipboard.copy(`${url}/article/${articleData.id}`)}>
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