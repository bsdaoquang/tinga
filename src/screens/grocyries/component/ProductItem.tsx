import CheckBox from '@react-native-community/checkbox';
import {AddSquare, MinusSquare} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ProductDetail} from '../../../Models/Product';
import {
  Button,
  ImageProduct,
  RowComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {useDispatch} from 'react-redux';
import {updateQuatity} from '../../../redux/reducers/groceryReducer';

interface Props {
  item: ProductDetail;
  onSelecteItem: (count: number) => void;
  isSelected: boolean;
  isEdit?: boolean;
  onRemoveItem: () => void;
}

const ProductItem = (props: Props) => {
  const {item, onSelecteItem, isSelected, isEdit, onRemoveItem} = props;
  const dispatch = useDispatch();

  // console.log(item.qty);
  const [count, setCount] = useState(item.qty ?? 1);

  useEffect(() => {
    count !== item.qty && dispatch(updateQuatity({item, qty: count}));
  }, [count]);

  let color = isSelected ? appColors.gray : appColors.text;

  return (
    <>
      <RowComponent
        styles={{
          marginBottom: 16,
          marginTop: 8,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isEdit ? (
          <Button
            onPress={onRemoveItem}
            icon={
              <AntDesign
                name="close"
                size={18}
                color={appColors.text}
                style={{marginRight: 8}}
              />
            }
          />
        ) : (
          <TouchableOpacity onPress={() => onSelecteItem(count)}>
            <CheckBox
              disabled
              lineWidth={1.0}
              tintColors={{true: appColors.success1, false: appColors.gray}}
              value={isSelected}
            />
          </TouchableOpacity>
        )}

        <ImageProduct imageUrl={item.image} />
        <TouchableOpacity
          onPress={() => onSelecteItem(count)}
          style={{flex: 1, paddingHorizontal: 12}}>
          <TextComponent
            line={1}
            color={color}
            styles={{
              textDecorationColor: appColors.gray,
              textDecorationLine: isSelected ? 'line-through' : 'none',
            }}
            text={item.name}
            size={14}
            flex={0}
          />
          {!isEdit && (
            <TextComponent
              line={1}
              text={`$${item.price}`}
              size={12}
              color={appColors.gray4}
            />
          )}
        </TouchableOpacity>
        <RowComponent>
          {count > 1 && !isEdit && (
            <Button
              disable={isSelected}
              icon={<MinusSquare size={22} color={color} />}
              onPress={() => setCount(count - 1)}
            />
          )}

          <TextComponent
            styles={{paddingHorizontal: 8}}
            text={`${count} ct`}
            flex={0}
            size={14}
            color={color}
          />
          {!isEdit && (
            <Button
              disable={isSelected}
              icon={<AddSquare size={22} color={color} />}
              onPress={() => setCount(count + 1)}
            />
          )}
        </RowComponent>
      </RowComponent>
    </>
  );
};

export default ProductItem;
