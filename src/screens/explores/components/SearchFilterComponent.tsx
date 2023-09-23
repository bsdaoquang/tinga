import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {global} from '../../../styles/global';
import {appColors} from '../../../constants/appColors';
import {SearchNormal1} from 'iconsax-react-native';
import {SettingIcon} from '../../../assets/svg';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const SearchFilterComponent = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isVisibleModalFilter, setIsVisibleModalFilter] = useState(false);
  return (
    <SectionComponent styles={{zIndex: 5}}>
      <RowComponent>
        <RowComponent
          onPress={() => console.log('fafs')}
          styles={{
            ...global.shadow,
            backgroundColor: appColors.white,
            borderRadius: 8,
            paddingHorizontal: 8,
            flex: 1,
            paddingVertical: 12,
          }}>
          <SearchNormal1 size={18} color={appColors.gray} />
          <TextComponent
            text={searchValue ? searchValue : 'Search groceries'}
            color={searchValue ? appColors.text3 : appColors.gray}
            flex={1}
            styles={{paddingHorizontal: 8}}
          />
          <TouchableOpacity onPress={() => setIsVisibleModalFilter(true)}>
            <SettingIcon width={24} color={appColors.text} />
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 6,
                height: 6,
                borderRadius: 4,
                backgroundColor: appColors.error,
              }}
            />
          </TouchableOpacity>
        </RowComponent>

        <SpaceComponent width={12} />
        <ButtonComponent
          color={appColors.primary}
          onPress={() => {}}
          icon={
            <FontAwesome6
              name="cart-shopping"
              size={14}
              color={appColors.white}
            />
          }
          text="0"
          textColor={appColors.white}
          styles={{
            width: 48,
            height: 48,
          }}
        />
      </RowComponent>
    </SectionComponent>
  );
};

export default SearchFilterComponent;
