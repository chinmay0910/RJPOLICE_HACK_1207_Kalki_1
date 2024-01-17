import React, { useState, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';

export const CreatePost = (props) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [data, setData] = useState({
    caption: "",
    location: "",
    taggedPerson: "",
    image: null
  });
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);
  const [isTaggedPersonExpanded, setIsTaggedPersonExpanded] = useState(false);
  const { setProgress } = props;

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log(file);
      setData({ ...data, image: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    e.preventDefault()
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault()
    try {
      setProgress(10)
      // Upload the image to Cloudinary
      const formData = new FormData();
      formData.append('image', data.image);
      formData.append('caption', data.caption);
      formData.append('location', data.location);
      formData.append('taggedPerson', data.taggedPerson);
      setProgress(30)
      const responseImg = await fetch('http://localhost:5000/api/post/uploadimage', {
        method: 'POST',
        headers: {
          "auth-token": localStorage.getItem('token')
        },
        body: formData,
      });
      setProgress(70)
      if (!responseImg.ok) {
        console.error('Image upload failed');
        return;
      }

      const imageUrl = await responseImg.text();
      setProgress(100)
      navigate('/feed')
      
    } catch (error) {
      console.error('Error submitting post:', error);
    }

    // Reset form state
    setData({ caption: '', location: '', taggedPerson: '', image: null });
    setPreviewSrc(null);
  };


  const toggleLocation = () => {
    setIsLocationExpanded(!isLocationExpanded);
  };

  const toggleTaggedPerson = () => {
    setIsTaggedPersonExpanded(!isTaggedPersonExpanded);
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-4 bg-white rounded shadow text-black">
      <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
      <form
        onSubmit={handlePostSubmit}
        encType="multipart/form-data"
      >
        <div className="mb-4">
          <label
            htmlFor="image"
            className={`block cursor-pointer text-sm font-medium text-gray-700 border-dashed border-2 p-4 rounded-md hover:border-blue-500 ${data.image ? 'bg-gray-200' : ''
              }`}
          >
            {data.image ? data.image.name : 'Upload Image'}
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
        {previewSrc && (
          <div className="m-4 shadow-md">
            <img src={previewSrc} alt="Image Preview" className="max-w-full h-auto rounded" />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
            Caption:
          </label>
          <textarea
            id="caption"
            name="caption"
            value={data.caption}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 resize-none"
          ></textarea>
        </div>
        <div className="flex flex-row">
          <div className="mb-4 w-1/2">
            <label htmlFor="location" className="block text-sm font-medium text-blue-500" onClick={toggleLocation}>
              {isLocationExpanded ? <RemoveIcon /> : <AddIcon />}
              Add Location
            </label>
            {isLocationExpanded && (
              <input
                type="text"
                id="location"
                name="location"
                value={data.location}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 shadow-md"
              />
            )}
          </div>
          <div className="mb-4 w-1/2">
            <label htmlFor="taggedPerson"
              className="block text-sm font-medium text-blue-500"
              onClick={toggleTaggedPerson}
            >
              {isTaggedPersonExpanded ? <RemoveIcon /> : <AddIcon />}
              Tag a Person
            </label>
            {isTaggedPersonExpanded && (
              <input
                type="text"
                id="taggedPerson"
                name="taggedPerson"
                value={data.taggedPerson}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 shadow-md"
              />
            )}
          </div>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Post
        </button>
      </form>
    </div>
  );
};
