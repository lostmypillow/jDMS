export default function(title) {
    let category;
  switch (true) {
    case title.includes("高通"):
      category = "Qualcomm相關新聞";
      break;

    case title.includes("聯發科"):
      category = "MediaTek相關新聞";
      break;

    case title.includes("5G"):
      category = "無線通訊市場";
      break;

    case title.includes("三星") || title.includes("PC"):
      category = "智慧型手機/消費性電子產品";
      break;

    default:
      category = "其他業界重要訊息";
      break;
  }
  return category;
}