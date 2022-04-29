import { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import axios from 'axios';
import { useForm, yupResolver } from '@mantine/form';
import {  TextInput, Button, Box, Group, Textarea } from '@mantine/core';
import { Text, useMantineTheme, MantineTheme, Transition } from '@mantine/core';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Image from 'next/image';
import { showNotification, updateNotification } from '@mantine/notifications';
import { CheckIcon } from '@modulz/radix-icons';
import { Cross1Icon } from '@modulz/radix-icons';
import { MultiSelect } from '@mantine/core';
import { BsUpload } from 'react-icons/bs';


const ListingSchema = Yup.object().shape({
  title: Yup.string().trim().required(),
  short: Yup.string().trim().required(),
  long: Yup.string().trim().required(),
  category: Yup.array().min(1).max(3)
});

interface MyFormValues {
  title: string;
  short: string;
  long: string;
  category: Array<string>;
  image: string;
}


interface MyProps {
  initialValues: MyFormValues,
  initialCategories: Array<string>,
  redirectPath: string,
  buttonText: string,
  onSubmit: Function,
}

const UploadFormTest = ({
  initialValues = null,
  initialCategories = null,
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
  const [selectData, setSelectData] = useState(initialCategories)

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
        console.log({...values})
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
    if(!reader?.result) {
      showNotification({
        message: "Can't submit - No image uploaded",
        autoClose: 2000,
        icon: <Cross1Icon />,
        color: "red"
      })
      return;
    }
    const url = await upload(reader?.result);
    uploadArticle(values,url);

    
  };


  const form = useForm({
    schema: yupResolver(ListingSchema),
    initialValues: {
      image: initialValues?.image || '',
      title: initialValues?.title || '',
      short: initialValues?.short || '',
      long: initialValues?.long || '',
      category: initialValues?.category || [],
    },
  });

   

  const handleOnChangePicture = uploadedFile => {
    const file = uploadedFile[0];
    setImageTemp(file);
    console.log(selectData);
    
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

      <Box sx={{ maxWidth: "80%" }} mx="auto">
      <form onSubmit={form.onSubmit(handleOnSubmit)}>
        <Dropzone
          onDrop={handleOnChangePicture }
          onReject={(files) => console.log('rejected files', files)}
          maxSize={10*1024**2}
          accept={IMAGE_MIME_TYPE}
          multiple={false}
          {...form.getInputProps('image')}
          disabled={disabled}
          className="md:w-2/3 m-auto"
        >
          {(status) => (
          <div style={{ pointerEvents: 'none' }}>
            <Group position="center">
              <BsUpload size={50} className="text-red-600" />
            </Group>
            <Text
              align="center"
              weight={700}
              size="lg"
              mt="xl"
            >
              {status.accepted
                ? 'Drop files here'
                : status.rejected
                ? 'Image must be less than 10mb'
                : 'Upload image'}
            </Text>
            <Text align="center" size="sm" mt="xs" color="dimmed">
              Drag&apos;n&apos;drop files or click here to upload. Only <i>.jpeg/.jpg,.png,.gif,.webp</i> smaller than 10mb are accepted.
            </Text>
          </div>
        )}
        </Dropzone>
        {image?.src ? 
          <div className="my-4"><Image
            src={image.src}
            alt={image?.alt ?? ''}
            layout="responsive" 
            width={320} 
            height={180}
            className="rounded-lg"
            
          /></div>
         : null}

        <TextInput
          required
          label="Title"
          placeholder="Please enter title"
          disabled={disabled}
          {...form.getInputProps('title')}
        />
    

        <Textarea
        required
        label="Short description"
        placeholder="Please enter a short description of the article"
        autosize
        minRows={3}
        maxRows={5}
        mt="sm"
        disabled={disabled}
        {...form.getInputProps('short')}
        />
        <Textarea
        required
        label="Article content"
        placeholder="Please enter the main content of the article"
        autosize
        minRows={5}
        maxRows={9}
        mt="sm"
        disabled={disabled}
        {...form.getInputProps('long')}
        />
      
        

        <MultiSelect
          required
          label="Select category"
          data={selectData}
          placeholder="Select items"
          maxSelectedValues={3}
          transition="skew-down"
          transitionDuration={150}
          transitionTimingFunction="ease"
          searchable
          creatable
          disabled={disabled}
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => setSelectData((current) => [...current, query])}
          {...form.getInputProps('category')}
        />

        <Group position="right"  className='mt-9'>
          <Button type="submit" disabled={disabled}  className='bg-red-600 rounded-lg hover:bg-red-700 '>{buttonText}</Button>
        </Group>
      </form>
    </Box>

    </div>
  );
};



export default UploadFormTest;