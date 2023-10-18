export const handleResizeImage = async (file: any) => {
  console.log(file);
  // ImageResizer.createResizedImage(file.uri, 500, 500, 'PNG', 30, 0)
  //   .then((newImage: any) => {
  //     console.log(newImage);
  // const newFile = {
  //   uri: newImage.uri,
  //   name: `image-${new Date().getTime()}`,
  //   type: newImage.type as string,
  //   size: newImage.size ?? 0,
  // };

  //     // console.log(newFile);
  //     onSelectedFile(newFile);
  //     // onClose();
  //   })
  //   .catch(error =>
  //     console.log(`Can not resize this image: ${error}`),
  //   );
};
