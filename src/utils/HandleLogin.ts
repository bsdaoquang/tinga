import profileAPI from '../apis/userAPI';
import {addAuth} from '../redux/reducers/authReducer';

export class HandleLogin {
  static handleCheckUserLoginAgain = async (
    data: any,
    navigation: any,
    dispatch: any,
  ) => {
    const api = `/getUserChoice`;
    try {
      await profileAPI.HandleUser(api).then((res: any) => {
        if (res.diets && res.diets.length > 0) {
          dispatch(addAuth(data));
        } else {
          navigation.navigate('ChooseDiet');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}
