import { useState } from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Layout from '../../components/Layout';
import { useSession } from 'next-auth/react';


const Upload = () => {
    const [inputs, setInputs] = useState({});
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const { data: session, status } = useSession();
    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleLastChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value,["authorId"]: session.user.id,["authorName"]: session.user.name}))
    }

    const handleImgChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
        
            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));

            const name = event.target.name;
            const value = event.target.files[0].name
            console.log(event.target.files[0].name)
            setInputs(values => ({...values, [name]: value}))
        }
    };

    async function uploadArticle(article) {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: JSON.stringify(article)
        });
      
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return await response.json();
    }

    const uploadImage = async () => {        
        const body = new FormData();
        console.log("file", image)
        body.append("file", image);    
        const response = await fetch("/api/uploadImg", {
          method: "POST",
          body
        });
      };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        uploadImage()
        console.log(inputs);
        uploadArticle(inputs);
        alert("Article successfully submited!");
    }

  return (
      <Layout>
        <div className=' w-full md:w-2/3 lg:w-3/5 m-auto '>
        <h1 className='text-2xl font-semibold'>Article Upload form</h1>
        <form className='my-5 px-5 grid grid-cols-1 gap-5' onSubmit={handleSubmit}>
            <label>
                {/* <input 
                className='border-2 border-slate-700 rounded-lg ml-4'
                type="text" 
                name="title" 
                value={inputs.title || ""} 
                onChange={handleChange}
            /> */}
            <TextField
                value={inputs.title || ""}
                error={inputs.title === ""}
                id="filled-error-helper-text"
                label="Title"
                helperText={inputs.title === "" ? 'Empty!' : ' '}
                onChange={handleChange}
                name="title" 
                variant="filled"
                fullWidth
                color="secondary" 
                
            />
            </label>
            <label>
                {/* <input 
                    className='border-2 border-slate-700 rounded-lg ml-4'
                    type="text" 
                    name="short" 
                    value={inputs.short || ""} 
                    onChange={handleChange}
                /> */}
                <TextField
                    id="filled-multiline-static"
                    label="Short"
                    name="short" 
                    multiline
                    rows={6}
                    variant="filled"
                    onChange={handleChange}
                    value={inputs.short || ""} 
                    fullWidth
                    color="secondary" 
                />
            </label>
            <label>
                {/* <input 
                    className='border-2 border-slate-700 rounded-lg ml-4'
                    type="text" 
                    name="long" 
                    value={inputs.long || ""} 
                    onChange={handleChange}
                /> */}
                <TextField
                    id="filled-multiline-static"
                    label="Long"
                    name="long" 
                    multiline
                    rows={12}
                    variant="filled"
                    onChange={handleChange}
                    value={inputs.long || ""} 
                    fullWidth
                    color="secondary" 
                />
            </label>
            <label>
                <input 
                    type="file" 
                    name="image" 
                    accept=".jpeg,.jpg,.png"
                    onChange={handleImgChange} 
                    style={{display: 'none',}}
                />
                <Button variant="contained" component="span" >
                Upload <PhotoCamera className='ml-2'/>
                </Button>
            </label>
            <img src={createObjectURL} />
            <label>
                {/* <input 
                    className='border-2 border-slate-700 rounded-lg ml-4'
                    type="text" 
                    name="category" 
                    value={inputs.category || ""} 
                    onChange={handleChange}
                /> */}
                <TextField
                    id="filled-select-currency"
                    select
                    label="Category"
                    name="category"
                    value={inputs.category || ""}
                    onChange={handleChange}
                    helperText="Please select the category of the article"
                    variant="filled"
                    color="secondary" 
                    >
                    <MenuItem key="Sport" value="Sport">Sport</MenuItem>
                    <MenuItem key="Culture" value="Culture">Culture</MenuItem>
                    <MenuItem key="Politics" value="Politics">Politics</MenuItem>
                    <MenuItem key="Entertainment" value="Entertainment">Entertainment</MenuItem>
                </TextField>
            </label>
            <input className='bg-black px-6 py-2 text-white rounded-lg hover:invert' type="submit" />
        </form>
        </div>
      </Layout>
  )
}

export default Upload