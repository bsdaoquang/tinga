import AsyncStorage from '@react-native-async-storage/async-storage';
import {appInfos} from '../constants/appInfos';
import {addAuth} from '../redux/reducers/authReducer';

export const handleSaveUser = async (dispatch: any) => {
  const res = await AsyncStorage.getItem(appInfos.localDataName.userData);
  res && dispatch(addAuth(JSON.parse(res)));
};
