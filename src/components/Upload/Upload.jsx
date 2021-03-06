import React, { useState } from 'react';
import Dropzone from '../Dropzone/Dropzone';
import Progress from '../Progress/Progress';
import './Upload.css';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [successfullUploaded, setSuccessfullUploaded] = useState(false);

  const onFilesAdded = (newFiles) => {
    const newFilesArray = files.concat(newFiles);
    setFiles(newFilesArray)
  };

  const renderProgress = (file) => {
    const uploadProg = uploadProgress[file.name];
    if (uploading || successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProg ? uploadProg.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProg && uploadProg.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  const renderActions = () => {
    if (successfullUploaded) {
      return (
        <button
          onClick={() => {
            setFiles([]);
            setSuccessfullUploaded(false);
          }}
        >
          Clear
        </button >
      );
    } else {
      return (
        <button
          disabled={files.length < 0 || uploading}
          onClick={uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  const uploadFiles = async () => {
    setUploadProgress({});
    setUploading(true);
    const promises = [];
    files.forEach(file => {
      promises.push(sendRequest(file));
    });
    try {
      await Promise.all(promises);
      setSuccessfullUploaded(true);
      setUploading(false);
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      setSuccessfullUploaded(true);
      setUploading(false);
    }
  }

  const sendRequest = (file) => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          setUploadProgress(copy)
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        setUploadProgress(copy)
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        setUploadProgress(copy)
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);

      req.open("POST", "http://localhost:4000/api/upload");
      req.send(formData);
    });
  }
  return (
    <div className="Upload">
      <span className="Title">Upload Files</span>
      <div className="Content">
        <div>
          <Dropzone
            onFilesAdded={onFilesAdded}
            disabled={uploading || successfullUploaded}
          />
        </div>
        <div className="Files">
          {files.map(file => {
            return (
              <div key={file.name} className="Row">
                <span className="Filename">{file.name}</span>
                {renderProgress(file)}
              </div>
            );
          })}
        </div>
      </div>
      <div className="Actions">{renderActions()}</div>
    </div>
  );
};


export default Upload;