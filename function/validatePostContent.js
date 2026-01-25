export const validatePostContent = (type, content) => {
  switch (type) {
    case "text":
      return !!content.text;

    case "code":
      return !!content.code.text;
    case "file":
      return !!content.file.urlFile;
    case "video":
      return content.video;

    default:
      return true;
  }
};
