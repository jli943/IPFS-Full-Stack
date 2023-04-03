const ipfs = require("ipfs-http-client");
const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

const ipfsClient = ipfs.create('/ip4/127.0.0.1/tcp/5001');


const getAllFilesByNameAndCID = async (req, res) => {
    const localFiles = await ipfsClient.files.ls('/');
    const files = [];

    for await (const file of localFiles) {
        if (!file.type || file.type === "file") {
            files.push({ cid: file.cid.toString(), name: file.name });
        }
      }

      res.json(files);

    
}

const sendSelectedFilesContent = async (req, res) => {
    const selectedFiles = req.body;
    const cidList = [];
    const cidContents = [];

    for await (const file of selectedFiles) {
        if (!file.type || file.type === "file") {
            cidList.push(file.cid.toString());
        }
      }
        console.log(cidList);

        for await (const cid of cidList) {
            const result = await ipfsClient.cat(cid);
            let contents = "";
            for await (const item of result) {
                contents += new TextDecoder().decode(item);
            }
            contents = contents.replace(/\0/g, "");
            // const input = {cid, contents};
            // let data = JSON.stringify(input);
            // fs.writeFileSync('cid_content.json', data);           
            
            cidContents.push({ cid, contents});
        }
        console.log(cidContents);
        runPythonScript(cidContents);


        res.json(cidContents);

        // const result = await ipfsClient.cat("QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u")


        // // create a string to append contents to
        // let contents = ""


        // // loop over incoming data
        // for await(const item of result){
        //     // turn string buffer to string and append to contents
        //     contents += new TextDecoder().decode(item)
        // }

        // // remove null characters
        // contents = contents.replace(/\0/g, "")

        // // return results as a json
        // console.log(contents)
        // res.json({contents })

}

function runPythonScript(data) {
    const pythonScriptPath = path.join(__dirname, '..', 'controllers', 'index_builder_txt.py');
    const pythonProcess = spawn('python', [pythonScriptPath, JSON.stringify(data)]);
  
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python script stdout: ${data}`);
    });
  
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python script stderr: ${data}`);
    });
  
    pythonProcess.on('exit', (code) => {
      console.log(`Python script exited with code ${code}`);
    });
  }


module.exports = { sendSelectedFilesContent, getAllFilesByNameAndCID }