
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const FileList = () => {
//   const [files, setFiles] = useState([]);
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       const response = await axios.get('http://localhost:3001/files');
//       setFiles(response.data);
//     };

//     fetchFiles();
//   }, []);

//   const handleFileSelect = event => {
//     const fileName = event.target.name;
//     const fileCID = event.target.value;

//     if (event.target.checked) {
//       setSelectedFiles(selectedFiles => [...selectedFiles, { name: fileName, cid: fileCID }]);
//     } else {
//       setSelectedFiles(selectedFiles => selectedFiles.filter(file => file.cid !== fileCID));
//     }
//   };

//   const handleSubmit = async event => {
//     event.preventDefault();

//     const response = await axios.post('http://localhost:3001/files', selectedFiles);
//     console.log(response.data);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         {files.map(file => (
//           <div key={file.cid}>
//             <input type="checkbox" name={file.name} value={file.cid} onChange={handleFileSelect} />
//             <label>{file.name}</label>
//           </div>
//         ))}
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default FileList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await axios.get('http://localhost:3001/files');
      setFiles(response.data);
    };

    fetchFiles();
  }, []);

  const handleFileSelect = event => {
    const fileName = event.target.name;
    const fileCID = event.target.value;

    if (event.target.checked) {
      setSelectedFiles(selectedFiles => [...selectedFiles, { name: fileName, cid: fileCID }]);
    } else {
      setSelectedFiles(selectedFiles => selectedFiles.filter(file => file.cid !== fileCID));
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await axios.post('http://localhost:3001/files', selectedFiles);
    console.log(response.data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="w-full max-w-sm bg-white rounded-lg shadow-md p-6" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Select Files</h1>
        {files.map(file => (
          <div key={file.cid} className="flex items-center mb-2">
            <input
              type="checkbox"
              name={file.name}
              value={file.cid}
              onChange={handleFileSelect}
              className="mr-2 border-gray-300 rounded"
            />
            <label className="text-gray-800">{file.name}</label>
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
          disabled={!selectedFiles.length}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FileList;
