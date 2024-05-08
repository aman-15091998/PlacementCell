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
  const filename = `${csvConfig.filename}.csv`;
  const csvBuffer = new Uint8Array(Buffer.from(asString(csv)));

  // Writing the data to the file and returning the filepath
  await fsPromises.writeFile(filename, csvBuffer);
  return path.resolve(`${filename}`);
};
