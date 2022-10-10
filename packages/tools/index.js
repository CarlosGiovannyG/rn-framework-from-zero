const glob = require("glob");
const fs = require("fs-extra");

async function processJsonData() {
  let parentDirectoryPath = "../app/src/store/template";
  let data = {};

  let jsoncFilePaths = glob.sync(`${parentDirectoryPath}/**/*.jsonc`);
  let jsonFilePaths = glob.sync(`${parentDirectoryPath}/**/*.json`);
  const paths = jsoncFilePaths.concat(jsonFilePaths);

  for (const jsonFilePath of paths) {
    let content = await fs.readJsonSync(jsonFilePath);

    Object.assign(data, { [content.name]: content });
  }

  await fs.writeJson("./store.json", data, { spaces: 2 });
  //here specify your file path
}

processJsonData();
