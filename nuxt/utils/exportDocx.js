import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import saveAs from "file-saver";
// var LinkModule = require('docxtemplater-link-module');
import { store } from "~/store";
export default async function () {
  try {
    const response = await $fetch("/input.docx");
    const content = await response.arrayBuffer();
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      // modules: [new LinkModule()],
    });
    store.data
      .filter((x) => x.category == "Qualcomm相關新聞");

    const qualcommList = store.data
      .filter((x) => x.category == "Qualcomm相關新聞")
      .sort((a, b) => a.priority - b.priority);
    const mediatekList = store.data
      .filter((x) => x.category == "MediaTek相關新聞")
      .sort((a, b) => a.priority - b.priority);

    const commuList = store.data
      .filter((x) => x.category == "無線通訊市場")
      .sort((a, b) => a.priority - b.priority);
    const phoneList = store.data
      .filter((x) => x.category == "智慧型手機/消費性電子產品")
      .sort((a, b) => a.priority - b.priority);
    const otherList = store.data
      .filter((x) => x.category == "其他業界重要訊息")
      .sort((a, b) => a.priority - b.priority);
    const data = {
      date: new Date().toISOString().split("T")[0],
      //     qualcommTOCs: qualcommTOCs,
      //     mediatekTOCs: mediatekTOCs,
      //     commuTOCs: commuTOCs,
      //     phoneTOCs: phoneTOCs,
      //     otherTOCs: otherTOCs,
      qualcommList: qualcommList,
      mediatekList: mediatekList,
      commuList: commuList,
      phoneList: phoneList,
      otherList: otherList,
    };

    doc.render(data);

    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const newfilename =
      new Date().toISOString().split("T")[0] + " Qualcomm DMS.docx";
    saveAs(out, newfilename);
    console.log("file saved");
  } catch (error) {
    console.error("Error generating document:", error);
  }
}
