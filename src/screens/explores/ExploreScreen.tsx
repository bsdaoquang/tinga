import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Button,
  ButtonComponent,
  Container,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {AddSquare, SearchNormal1, Setting4} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {global} from '../../styles/global';

const ExploreScreen = () => {
  return (
    <Container
      right={
        <Button
          icon={<AddSquare size={24} color={appColors.text3} variant="Bold" />}
          onPress={() => {}}
        />
      }>
      <SectionComponent>
        <RowComponent>
          <RowComponent
            styles={{
              ...global.shadow,
              flex: 1,
              marginRight: 12,
              backgroundColor: appColors.white,
              borderRadius: 8,
              height: 56,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 8,
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
              <Setting4 size={24} color={appColors.text} />
              <View style={{}} />
            </TouchableOpacity>
          </RowComponent>
          <ButtonComponent
            onPress={() => {}}
            icon={
              <FontAwesome6
                name="cart-shopping"
                size={18}
                color={appColors.white}
              />
            }
            text="0"
            textColor={appColors.white}
            styles={{
              width: 56,
              height: 56,
            }}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <TitleComponent text="Top categories" size={24} flex={0} />
      </SectionComponent>
    </Container>
  );
};

export default ExploreScreen;
