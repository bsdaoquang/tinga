import AsyncStorage from '@react-native-async-storage/async-storage';
import {appInfos} from '../constants/appInfos';
import handleMealApi from '../apis/mealplannerAPI';

export class HandleFavourites {
  static syncDatabase = async () => {
    const res = await AsyncStorage.getItem(appInfos.localDataName.favourites);
    if (res) {
      const items = JSON.parse(res);
      const api = `syncRecipes`;

      if (items.length > 0) {
        let ids = ``;

        items.forEach(
          (item: any, index: number) =>
            (ids += `${item.id}${index < items.length - 1 ? ', ' : ''}`),
        );

        const data = new FormData();
        data.append('id', ids);

        try {
          const res = await handleMealApi.handleMealPlanner(
            api,
            data,
            'post',
            true,
          );
          console.log('Sync recipes favourites successfully!!!');
        } catch (error) {
          console.log(`Can not sync recipe favourites ${error}`);
        }
      }
    }
  };
}
