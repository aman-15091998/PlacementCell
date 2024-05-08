import { mkConfig, generateCsv, asString } from "export-to-csv";
import fs from "fs";
import { Buffer } from "buffer";
import path from "path";

export const getDownloadableCSVFile = async (data) => {
  const fsPromises = fs.promises;
  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: "InterviewCSVData",
  });

  // Converts your Array<Object> to a CsvOutput string based on the configs
  const csv = generateCsv(csvConfig)(data);
  const filename = path.resolve("public", "CSV", `${csvConfig.filename}.csv`);
  const csvBuffer = new Uint8Array(Buffer.from(asString(csv)));

  // Write the csv file to disk
  //   writeFile(filename, csvBuffer, (err) => {
  //     if (err) throw err;
  //     console.log("file saved: ", filename);
  //   });
  await fsPromises.writeFile(filename, csvBuffer);
  return filename;
};
