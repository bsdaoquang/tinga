import {ArrowRight2} from 'iconsax-react-native';
import React from 'react';
import {
  Container,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilys} from '../../constants/fontFamily';
import {global} from '../../styles/global';

const AddNewScreen = ({navigation}: any) => {
  return (
    <Container back>
      <SectionComponent>
        <TitleComponent text="Add New" flex={0} size={22} />
      </SectionComponent>
      <SectionComponent styles={{flex: 1}}>
        <RowComponent
          onPress={() => navigation.navigate('AddNewProduct')}
          styles={[
            global.tag,
            global.shadow,
            {
              width: '100%',
              justifyContent: 'flex-start',
              shadowColor: 'rgba(0, 0, 0, 0.15)',
              paddingVertical: 14,
              paddingHorizontal: 12,
            },
          ]}>
          <TextComponent
            text={'Product'}
            color={appColors.text2}
            size={16}
            font={fontFamilys.bold}
          />
          <ArrowRight2 size={20} color={appColors.text} />
        </RowComponent>
      </SectionComponent>
    </Container>
  );
};

export default AddNewScreen;
