import {View, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
import {
  Button,
  ButtonComponent,
  Container,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {AddSquare, SearchNormal1, Setting4} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {global} from '../../styles/global';
import {SettingIcon} from '../../assets/svg';
import {FlatList} from 'react-native';
import ProductItem from './components/ProductItem';

const ExploreScreen = () => {
  return (
    <Container
      right={
        <Button
          icon={<AddSquare size={24} color={appColors.text3} variant="Bold" />}
          onPress={() => {}}
        />
      }>
      <StatusBar barStyle="dark-content" />
      <SectionComponent>
        <RowComponent>
          <View style={{flex: 1}}>
            <RowComponent
              styles={{
                ...global.shadow,
                flex: 1,
                backgroundColor: appColors.white,
                borderRadius: 8,
                height: 48,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 8,
              }}>
              <SearchNormal1 size={22} color={appColors.gray} />
              <TextInput
                style={{
                  margin: 0,
                  paddingHorizontal: 8,
                  flex: 1,
                }}
                placeholder="Search groceries"
              />
              <TouchableOpacity>
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
          </View>
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
      <SectionComponent>
        <TitleComponent text="Top categories" size={24} flex={0} />
      </SectionComponent>
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          numColumns={3}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal: 16}}
          data={Array.from({length: 20})}
          renderItem={({item, index}) => <ProductItem item={{id: index}} />}
        />
      </View>
    </Container>
  );
};

export default ExploreScreen;
