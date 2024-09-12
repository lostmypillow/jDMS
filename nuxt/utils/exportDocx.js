import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import saveAs from 'file-saver'
export default async function () {
  try {
    const response = await $fetch("/input.docx");
    const content = await response.arrayBuffer();
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    
    // const data = {
    //     date: new Date().toISOString().split("T")[0],
    //     qualcommTOCs: qualcommTOCs,
    //     mediatekTOCs: mediatekTOCs,
    //     commuTOCs: commuTOCs,
    //     phoneTOCs: phoneTOCs,
    //     otherTOCs: otherTOCs,
    //     qualcommList: qualcommList,
    //     mediatekList: mediatekList,
    //     commuList: commuList,
    //     phoneList: phoneList,
    //     otherList: otherList,
    //   };
    
    doc.render({
        date: new Date().toISOString().split("T")[0],
    });

    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

const newfilename = new Date().toISOString().split("T")[0] + " Qualcomm DMS.docx"
    saveAs(out, newfilename);
    console.log("file saved")
  } catch (error) {
    console.error("Error generating document:", error);
  }
}
