import AsyncStorage from '@react-native-async-storage/async-storage';
import profileAPI from '../apis/userAPI';
import {appInfos} from '../constants/appInfos';
import {addAuth} from '../redux/reducers/authReducer';

export class HandleLogin {
  static handleCheckUserLoginAgain = async (navigation: any, dispatch: any) => {
    const api = `/getUserProfile`;
    const apiChoces = '/getUserChoice';

    const resLocal = await AsyncStorage.getItem(
      appInfos.localDataName.userData,
    );

    try {
      const userData = resLocal ? JSON.parse(resLocal) : {};

      await profileAPI.HandleUser(apiChoces).then(async (res: any) => {
        if (res.diets && res.diets.length > 0) {
          await profileAPI.HandleUser(api).then((res: any) => {
            if (userData && res.id) {
              dispatch(
                addAuth({
                  ...userData,
                  ...res,
                }),
              );
            } else {
              dispatch(addAuth({}));
            }
          });
        } else {
          navigation.navigate('ChooseDiet');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}
