import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {

  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e, fileType) => {
    if (fileType === 'image') {
      setImageFile(e.target.files[0]);
    } else if (fileType === 'video') {
      setVideoFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file, type) => {
    if (!file) {
      setUploadStatus(`No ${type} file selected`);
      return;
    }

    console.log(file.name);
    console.log(file.type);
    try {
      // Step 1: Request a pre-signed URL from the backend
      const { data } = await axios.post('http://localhost:3010/auth/presigned-url', {
        fileName: file.name,
        fileType: file.type,
      }, { withCredentials: true });

      const presignedUrl = data.url;

      // Step 2: Upload the file directly to S3 using the pre-signed URL
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      // Step 3: Update the user database with the file name
      if(file.type.startsWith('image/')){
            await axios.put('http://localhost:3010/user', {
                avatar: file.name,
            },{ withCredentials: true } );
      }
      if(file.type.startsWith('video/')){
        await axios.put('http://localhost:3010/user', {
            introVideo: file.name,
        },{ withCredentials: true } );
  }

      setUploadStatus(`${type.charAt(0).toUpperCase() + type.slice(1)} file uploaded successfully!`);
    } catch (error) {
      setUploadStatus(`Upload failed for ${type}: ${error.message}`);
    }
  };

  const handleUpload = async () => {
    if (imageFile) {
      await uploadFile(imageFile, 'image');
    }
    if (videoFile) {
      await uploadFile(videoFile, 'video');
    }
  };

  return (
    <div>
      <div>
        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} />
      </div>
      <div>
        <label>Upload Video:</label>
        <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, 'video')} />
      </div>
      <button onClick={handleUpload}>Upload Files</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default FileUpload;
