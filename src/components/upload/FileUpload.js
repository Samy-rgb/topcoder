import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { uploadAsset, validateFile } from '../../services/upload';

const FileUpload = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    rejectedFiles.forEach(file => {
      toast.error(`File ${file.file.name} was rejected: ${file.errors[0].message}`);
    });

    setUploading(true);
    for (const file of acceptedFiles) {
      try {
        const validation = validateFile(file);
        if (!validation.isValid) {
          toast.error(`${file.name}: ${validation.error}`);
          continue;
        }
        const response = await uploadAsset(file);
        setUploadedFiles(prev => [...prev, {
          id: response.id,
          name: file.name,
          size: file.size,
          url: response.url,
          thumbnail: response.thumbnail
        }]);
        toast.success(`${file.name} uploaded successfully`);
        onUploadSuccess && onUploadSuccess(response);
      } catch (error) {
        toast.error(`Failed to upload ${file.name}: ${error.message}`);
      }
    }
    setUploading(false);
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
    maxFiles: 10,
    maxSize: 50 * 1024 * 1024,
    multiple: true
  });

  return (
    <div className="file-upload-container">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}>
        <input {...getInputProps()} />
        <div className="dropzone-content">
          <Upload size={48} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <>
              <p>Drag & drop high-resolution assets here, or click to select</p>
              <p className="dropzone-hint">Supports: PNG, JPEG • Max size: 50MB • Max files: 10</p>
            </>
          )}
        </div>
      </div>

      {uploading && (
        <div className="upload-progress">
          <div className="spinner"></div>
          <span>Uploading files...</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
