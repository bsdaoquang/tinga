import {Share} from 'react-native';

export const onShare = async (title?: string, desc?: string) => {
  //share
  try {
    const result = await Share.share({
      message: `Hey, I use Tinga to create diet-friendly grocery lists and track my food choices. Makes food shopping a whole lot easier! Here’s a link to try it out for free.<Dynamic Link here>`,
    });

    if (result.action === Share.sharedAction) {
      //người dùng chia sẻ
      if (result.activityType) {
        console.log('activityType');
      } else {
        // updateCountValue('countShare', id, 1);
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Hủy bỏ share');
    }
  } catch (error) {
    console.log(error);
  }
};
