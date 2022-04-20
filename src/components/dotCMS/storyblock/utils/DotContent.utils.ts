export const getImageURL = ({ mimeType, titleImage, inode }): string => {
  return mimeType === 'application/pdf'
    ? `/contentAsset/image/${inode}/${titleImage}/pdf_page/1/resize_w/250/quality_q/45`
    : `/dA/${inode}/500w/20q`
}
