import { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes, { string } from 'prop-types';
import * as Yup from 'yup';
import axios from 'axios';
import ImageUpload from './ImageUpload';
import { useForm, yupResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Group } from '@mantine/core';
import { Text, useMantineTheme, MantineTheme } from '@mantine/core';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Image from 'next/image';
import { showNotification, updateNotification } from '@mantine/notifications';
import { CheckIcon } from '@modulz/radix-icons';
import { Cross1Icon } from '@modulz/radix-icons';

const ListingSchema = Yup.object().shape({
  title: Yup.string().trim().required(),
  short: Yup.string().trim().required(),
  long: Yup.string().trim().required(),
  category: Yup.number().positive().integer().min(1).required(),
});

interface MyFormValues {
  title: string;
  short: string;
  long: string;
  category: number;
  image?: string;
}

interface MyProps {
  initialValues: MyFormValues,
  redirectPath: string,
  buttonText: string,
  onSubmit: Function,
}

const UploadFormTest = ({
  initialValues = null,
  redirectPath = '',
  buttonText = 'Submit',
  onSubmit = () => null
}:MyProps) => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialValues?.image ?? '');
  const [image, setImage] = useState({ src: null , alt: null});
  const [updatingPicture, setUpdatingPicture] = useState(false);
  const [reader, setReader] = useState<FileReader>(null) 
  const [imageTemp, setImageTemp] = useState<File>(null);

  const upload = async (image:ArrayBuffer|string) => {
    if (!image) {
      showNotification({
        message: "No image to upload",
        autoClose: 2000,
        icon: <Cross1Icon />,
        color: "red"
      })
      return;}

    try {
      setDisabled(true);
      showNotification({
        id: 'upload-image',
        message: "Uploading...",
        loading: true,
        disallowClose: true,
        autoClose: false,
      })
      const { data } = await axios.post('/api/uploadImg', { image });

      updateNotification({
        id: 'upload-image',
        message: "Successfully uploaded",
        autoClose: 2000,
        icon: <CheckIcon />,
        color: "teal"
      })
      
      return data?.url;
    } catch (e) {
      updateNotification({
        id: 'upload-image',
        message: "Unable to upload",
        autoClose: 2000,
        icon: <Cross1Icon />,
        color: "red"
      })
      setImageUrl('');
    } finally {
      setDisabled(false);
    }
  };


  const uploadArticle = async (values:MyFormValues,url:string) => {
    try {
      setDisabled(true);
      showNotification({
        id: 'upload-article',
        message: "Submitting...",
        loading: true,
        disallowClose: true,
        autoClose: false,
      })
      // Submit data
      if (typeof onSubmit === 'function') {
        await onSubmit({ ...values, image: url });
      }
      updateNotification({
        id: 'upload-article',
        message: "Article successfully submitted",
        autoClose: 2000,
        icon: <CheckIcon />,
        color: "teal"
      })
      // Redirect user
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (e) {
      updateNotification({
        id: 'upload-article',
        message: "Unable to submit article",
        autoClose: 2000,
        icon: <Cross1Icon />,
        color: "red"
      })
      setDisabled(false);
    }
  };

  const handleOnSubmit = async (values = null) => {
    const url = await upload(reader.result);
    uploadArticle(values,url);

    
  };


  const form = useForm({
    schema: yupResolver(ListingSchema),
    initialValues: {
      image: '',
      title: '',
      short: '',
      long: '',
      category: 1,
    },
  });

   const dropzoneChildren = (status: DropzoneStatus) => (
    <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
     
  
      <div>
        <Text size="xl" inline>
          Drag images here or click to select files
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          Attach as many files as you like, each file should not exceed 5mb
        </Text>
      </div>
    </Group>
  );

  const handleOnChangePicture = uploadedFile => {
    const file = uploadedFile[0];
    setImageTemp(file);
    
    const readerTemp = new FileReader();
    

    const fileName = file?.name?.split('.')?.[0] ?? 'New file';
    
    readerTemp.addEventListener(
      'load',
        function () {
        try {
          setImage({ src: readerTemp.result, alt: fileName });
          
            setReader(readerTemp);
           
          
          
          
         
        } catch (err) {
          showNotification({
            message: "Unable to update image",
            autoClose: 2000,
            icon: <Cross1Icon />,
            color: "red"
          })
        } finally {
          setUpdatingPicture(false);
        }
      },
      false
    );

    if (file) {
      if (file.size <= 10 * 1024 * 1024) {
        setUpdatingPicture(true);
        readerTemp.readAsDataURL(file);
      } else {

      }
    }
    
  };

  return (
    <div>
      <div className="mb-8 max-w-md">
        {/* <ImageUpload
          initialImage={{ src: image, alt: initialFormValues.title }}
          onChangePicture={upload}
        /> */}

      
      </div>

      <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit(handleOnSubmit)}>
        <Dropzone
          onDrop={handleOnChangePicture }
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          multiple={false}
          {...form.getInputProps('image')}
          name = "image"
        >
          {(status) => dropzoneChildren(status)}
        </Dropzone>
        {image?.src ? (
          <Image
            src={image.src}
            alt={image?.alt ?? ''}
            objectFit='cover'
            layout="responsive" 
            width={170} 
            height={100}
          />
        ) : null}

        <TextInput
          required
          label="Title"
          placeholder="Please enter title"
          {...form.getInputProps('title')}
        />
        <TextInput
          required
          label="Short description"
          placeholder="Please enter short desc"
          mt="sm"
          {...form.getInputProps('short')}
        />
        <TextInput
          required
          label="Long description"
          placeholder="Please enter long desc"
          mt="sm"
          {...form.getInputProps('long')}
        />
        
        <NumberInput
          required
          label="Category"
          placeholder="2"
          mt="sm"
          {...form.getInputProps('category')}
        />

        <Group position="right" mt="xl">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>

    </div>
  );
};



export default UploadFormTest;