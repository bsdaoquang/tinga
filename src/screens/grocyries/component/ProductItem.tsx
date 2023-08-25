import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Product} from '../../../Models/Product';
import {
  Button,
  ImageProduct,
  RowComponent,
  TextComponent,
} from '../../../components';
import CheckBox from '@react-native-community/checkbox';
import {global} from '../../../styles/global';
import {appColors} from '../../../constants/appColors';
import {AddSquare, MinusSquare} from 'iconsax-react-native';

interface Props {
  item: Product;
  onSelecteItem: (count: number) => void;
  onRemoveItem: () => void;
}

const ProductItem = (props: Props) => {
  const [isSelected, setIsSelected] = useState(false);
  const [count, setCount] = useState(1);

  const {item, onSelecteItem, onRemoveItem} = props;

  useEffect(() => {
    if (isSelected) {
      onSelecteItem(count);
    } else {
      onRemoveItem();
    }
  }, [isSelected]);

  let color = isSelected ? appColors.gray : appColors.text;

  return (
    <RowComponent
      styles={{marginBottom: 16, marginTop: 8, paddingHorizontal: 16}}>
      <CheckBox
        lineWidth={1.0}
        tintColors={{true: appColors.success1, false: appColors.gray}}
        value={isSelected}
        onChange={() => setIsSelected(!isSelected)}
      />
      <ImageProduct imageUrl={item.imageUrl} />
      <TouchableOpacity
        onPress={() => setIsSelected(!isSelected)}
        style={{flex: 1, paddingHorizontal: 12}}>
        <TextComponent
          line={1}
          color={color}
          styles={{
            textDecorationColor: appColors.gray,
            textDecorationLine: isSelected ? 'line-through' : 'none',
          }}
          text={item.title}
          size={14}
        />
        <TextComponent
          line={1}
          text={`$${item.price.toFixed(2)}`}
          size={12}
          color={appColors.gray4}
        />
      </TouchableOpacity>
      <RowComponent>
        {count > 1 && (
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
        <Button
          disable={isSelected}
          icon={<AddSquare size={22} color={color} />}
          onPress={() => setCount(count + 1)}
        />
      </RowComponent>
    </RowComponent>
  );
};

export default ProductItem;
