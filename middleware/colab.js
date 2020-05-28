require("dotenv").config();
const env = process.env;
const Client = require("ssh2-sftp-client");
const node_ssh = require("node-ssh");
const fs = require("fs");

exports.uploadColab = (req, res, next) => {
  const config = {
    host: env.NGROK_HOST,
    username: env.NGROK_USERNAME,
    password: env.NGROK_PWD,
    port: env.NGROK_PORT,
  };
  const sftp = new Client("colab-client");
  const localPath = "uploads/post/";
  const colabRemotePath = "/tmp/";
  const colabCmd = "python3 NST.py ";
  const resultPrefix = "result_";

  // img file name from multer
  const contentName = req.files[0].filename;
  const styleName = req.files[1].filename;

  const content = fs.createReadStream(localPath.concat(contentName));
  const style = fs.createReadStream(localPath.concat(styleName));

  // path where content and style img will be uploaded at colab
  const styleRemotePath = colabRemotePath.concat(styleName);
  const contentRemotePath = colabRemotePath.concat(contentName);

  class uploadImgtoColab {
    enject() {
      return new Promise((resolve, reject) => {
        sftp
          .connect(config)
          .then(() => {
            return sftp.put(content, contentRemotePath);
          })
          .then((p) => {
            console.log(p);
          })
          .then(() => {
            return sftp.put(style, styleRemotePath);
          })
          .then((result) => {
            console.log(result);
            sftp.end();
            resolve(result);
          })
          .catch((err) => {
            console.log(`Error: ${err.message}`);
            reject(err);
          });
      });
    }
    getResultNST() {
      return new Promise((resolve, reject) => {
        const ssh = new node_ssh();
        const resultRemotePath = colabRemotePath + resultPrefix + contentName;
        const resultLocalPath = localPath + resultPrefix + contentName;
        ssh
          .connect(config)
          .then(() => {
            ssh.getFile(resultLocalPath, resultRemotePath).then(
              () => {
                console.log("completely get result file");
                ssh.dispose();
                res.result = resultPrefix + contentName;
                resolve();
                next();
              },
              (err) => {
                console.log(err);
                reject(err);
              }
            );
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    }

    excuteNST() {
      return new Promise((resolve, reject) => {
        const ssh = new node_ssh();

        ssh
          .connect(config)
          .then(() => {
            ssh
              .execCommand(colabCmd + contentName + " " + styleName, {
                cwd: colabRemotePath,
              })
              .then((result) => {
                console.log("STDOUT: " + result.stdout);
                console.log("STDERR: " + result.stderr);
                ssh.dispose();
                getResultNST();
                resolve(result.stdout);
              })
              .catch((err) => {
                console.log(err);
                reject(err);
              });
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    }
  }

  const main = async () => {
    try {
      const upload = new uploadImgtoColab();
      upload.enject().then(() => {
        upload.excuteNST();
        return res
          .status(200)
          .json({ message: "wait for the result comming..." });
      });
    } catch (error) {
      console.log(error);
    }
  };
  main();
};
