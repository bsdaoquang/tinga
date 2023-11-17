import CheckBox from '@react-native-community/checkbox';
import {AddSquare, MinusSquare} from 'iconsax-react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Product} from '../../../Models/Product';
import {
  Button,
  ImageProduct,
  RowComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';

interface Props {
  item: Product;
  onSelecteItem: (cound: number) => void;
  isSelected: boolean;
  isEdit?: boolean;
  handleRemoveItem?: () => void;
}

const ProductItem = (props: Props) => {
  const [count, setCount] = useState(1);

  const {item, onSelecteItem, isSelected, isEdit, handleRemoveItem} = props;

  let color = isSelected ? appColors.gray : appColors.text;

  return (
    <RowComponent
      styles={{marginBottom: 16, marginTop: 8, paddingHorizontal: 16}}>
      {isEdit ? (
        <Button
          onPress={() =>
            isEdit && handleRemoveItem ? handleRemoveItem() : undefined
          }
          icon={<AntDesign name="close" size={20} color={appColors.text} />}
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
        />
        <TextComponent
          line={1}
          text={`$${item.price}`}
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
