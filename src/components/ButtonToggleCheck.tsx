import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Button} from '.';
import {appColors} from '../constants/appColors';
import {Add} from 'iconsax-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import handleGetData from '../apis/productAPI';
interface Props {
  id: number;
  shop_id: number;
  onPress: () => void;
  isChecked: number;
}
const ButtonToggleCheck = (props: Props) => {
  const {id, shop_id, onPress, isChecked} = props;

  const [isAddtoList, setIsAddtoList] = useState(isChecked);

  const checkItemOfList = async () => {
    const api = `/getDetailProduct?id=${id}&shop_id=${shop_id}`;

    try {
      const res: any = await handleGetData.handleProduct(api);

      res.length > 0 && setIsCheckedItem(res[0].is_addedtolist);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      styles={{
        width: 28,
        height: 28,
        backgroundColor: isChecked ? '#263238' : appColors.primary,
        borderRadius: 14,
        position: 'absolute',
        top: 10,
        right: 10,
      }}
      icon={
        1 < 2 ? (
          <Add size={24} color={appColors.white} />
        ) : (
          <AntDesign name="check" size={20} color={appColors.white} />
        )
      }
      disable={true}
      onPress={onPress}
    />
  );
};

export default ButtonToggleCheck;
