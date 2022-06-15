import Config from "./Config";

const getRelativePath = (video) => {
  if (!video) {
    return;
  }
  // TODO: dev
  return `${Config.multimediaServer}${video.folder}`;
  // TODO: not sure
  // return `${Config.multimediaServer}${video.folder}/${video.filename}`;
  // TODO: waku
  // const relativePath = video.folder.split("/");
  // relativePath.shift();
  // return `${Config.multimediaServer}${relativePath.join("/")}`;
};

export default { getRelativePath };
