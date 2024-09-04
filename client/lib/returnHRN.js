export function returnHRN(name) {
  return name == "Qualcomm相關新聞"
    ? "qualcomm"
    : (name = "MediaTek相關新聞"
        ? "mediatek"
        : (name = "無線通訊市場"
            ? "commu"
            : (name = "智慧型手機/消費性電子產品" ? "phone" : "other")));
}
