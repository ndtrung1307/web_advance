import path from "path";
import fs from "fs";
import multiparty from "multiparty";
import randomstring from "randomstring";
const AdmZip = require("adm-zip");

const rootPath = path.join(__dirname, "..", "files");
let currentPath = "";

const fileType = {
  zip: "zipper",
  rar: "zipper",
  pdf: "pdf",
  doc: "word",
  docx: "word",
  xls: "excel",
  xlsx: "excel",
  ppt: "powerpoint",
  pptx: "powerpoint",
  txt: "text",
  mp3: "audio",
  wav: "audio",
  mp4: "video",
  mkv: "video",
  png: "image",
  jpg: "image",
  jpeg: "image",
  gif: "image",
  webp: "image",
};

function readDirectory(dir) {
  const fullPath = rootPath + dir;
  const files = fs.readdirSync(fullPath);

  const filesDetail = files.map((file) => {
    const filePath = path.join(fullPath, file);
    const stats = fs.statSync(filePath);

    const obj = {
      name: file,
      path: currentPath.split(path.sep).join("-") + "-" + file,
      mtime: new Date(stats.mtimeMs).toLocaleString("vi-VN"),
    };

    if (stats.isDirectory()) {
      obj.type = "Folder";
      return obj;
    }

    obj.type = file.split(".").pop();
    obj.size = parseFloat((stats.size / 1024 / 1024).toFixed(2));
    obj.icon = `fa-solid fa-file-${fileType[obj.type]}`;

    return obj;
  });

  //sort by type
  filesDetail.sort((a, b) => {
    if (a.type === "Folder") {
      return -1;
    }
    if (b.type === "Folder") {
      return 1;
    }
    return 0;
  });
  return filesDetail;
}

class FileController {
  index(req, res) {
    currentPath = "";
    //read directory
    const files = readDirectory(currentPath);
    files.map((file) => {
      file.pathImage = file.path.slice(1);
    });

    res.render("files", { files });
  }

  move(req, res) {
    const { link } = req.params;
    currentPath = path.sep + link.split("-").join(path.sep);

    const files = readDirectory(currentPath);
    files.map((file) => {
      file.pathImage = file.path.slice(1).replaceAll("-", "/");
    });

    res.json({ files });
  }

  downloadFolder(req, res) {
    const { link } = req.params;
    console.log(link);
    const fullPath = rootPath + link.split("-").join(path.sep);

    console.log(fullPath);

    const folderName = link.split("-").slice(-1).pop().trim();
    const zip = new AdmZip();
    const filesInFolder = fs.readdirSync(fullPath);
    if (filesInFolder.length > 0) {
      for (var i = 0; i < filesInFolder.length; i++) {
        const itemPath = fullPath + "/" + filesInFolder[i];
        var stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
          zip.addLocalFolder(fullPath + "/" + filesInFolder[i]);
        } else {
          zip.addLocalFile(fullPath + "/" + filesInFolder[i]);
        }
      }
    }

    const data = zip.toBuffer();
    console.log("filesInFolder: ", filesInFolder.length);
    const downloadName = `${folderName}.zip`;
    res.set("Content-Type", "application/octet-stream");
    res.set("Content-Disposition", `attachment; filename=${downloadName}`);
    res.set("Content-Length", data.length);
    res.send(data);
  }

  store(req, res, next) {
    try {
      const { folderName } = req.body;

      //create folder
      const fullPath = rootPath + currentPath + path.sep + folderName;

      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
        res.json({ folderName });
      } else {
        const newFolderName = folderName + "_" + Date.now();
        fs.mkdirSync(rootPath + currentPath + path.sep + newFolderName);
        res.json({ folderName: newFolderName });
      }
    } catch (err) {
      next(err);
    }
  }

  destroy(req, res) {
    const { link } = req.params;
    console.log(link);
    const fullPath = rootPath + link.split("-").join(path.sep);

    console.log(fullPath);

    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true });
      res.json({ status: "success" });
    } else {
      res.json({ status: "error" });
    }
  }

  editName(req, res) {
    const { link } = req.params;
    const { newName } = req.body;
    const fullPath = rootPath + link.split("-").join(path.sep);
    const newPath = rootPath + "/" + newName;
    console.log(fullPath);
    console.log(newPath);
    if (fs.existsSync(fullPath)) {
      fs.renameSync(fullPath, newPath);
      res.json({ status: "success" });
    } else {
      res.json({ status: "error" });
    }
  }

  save(req, res) {
    const form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
      const { file } = files;
      const { link } = fields;

      const tempPath = file[0].path;
      let targetPath =
        rootPath +
        link[0].replace("-", path.sep) +
        path.sep +
        file[0].originalFilename;

      targetPath = targetPath.replaceAll("-", "_");

      if (fs.existsSync(targetPath)) {
        targetPath =
          rootPath +
          link[0].replace("-", path.sep) +
          path.sep +
          file[0].originalFilename.split(".")[0] +
          "_" +
          Date.now() +
          "." +
          file[0].originalFilename.split(".").pop();
      }
      fs.copyFileSync(tempPath, targetPath);

      const file1 = {
        name: file[0].originalFilename,
        size: parseFloat((file[0].size / 1024 / 1024).toFixed(2)),
        type: file[0].originalFilename.split(".").pop(),
        path: link[0] + "-" + file[0].originalFilename,
        mtime: new Date().toLocaleString("vi-VN"),
        icon: `fa-solid fa-file-${
          fileType[file[0].originalFilename.split(".").pop()]
        }`,
        pathImage: file[0].originalFilename.slice(1),
      };

      console.log(file1);

      res.json({
        status: "success",
        file: file1,
      });
    });
  }
}

export default new FileController();
