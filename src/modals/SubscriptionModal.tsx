import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Modal, ScrollView, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {
  Button,
  ButtonComponent,
  CardContent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {fontFamilys} from '../constants/fontFamily';
import {addAuth} from '../redux/reducers/authReducer';
import {global} from '../styles/global';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const SubscriptionModal = (props: Props) => {
  const navigation: any = useNavigation();
  const {isVisible, onClose} = props;

  const descriptions = [
    'Build health-scored grocery lists tailored to your dietary needs',
    'Discover & swap for healthier options',
    'Simplified nutritional information ',
    'Access to a resource library to help you reach your goals',
  ];

  // const dispatch = useDispatch();

  // const handleSaveDemodata = () => {
  //   dispatch(
  //     addAuth({
  //       uid: 'admin',
  //     }),
  //   );
  // };

  return (
    <Modal visible={isVisible}>
      <Text>fkjahfk</Text>
    </Modal>
    // <Modal
    //   visible={isVisible}
    //   animationType="slide"
    //   style={{
    //     flex: 1,
    //     backgroundColor: appColors.white,
    //   }}>
    //   <ScrollView
    //     style={[
    //       {
    //         flex: 1,
    //       },
    //     ]}>
    //     <SectionComponent>
    //       <RowComponent justify="flex-end">
    //         <Button
    //           onPress={onClose}
    //           icon={
    //             <AntDesign name="close" size={22} color={appColors.gray2} />
    //           }
    //         />
    //       </RowComponent>

    //       <Text
    //         style={[
    //           global.text,
    //           {
    //             fontFamily: fontFamilys.bold,
    //             fontSize: 36,
    //             lineHeight: 32.5,
    //           },
    //         ]}>
    //         Try Tinga for free,{' '}
    //         <Text style={{fontSize: 24}}>cancel anytime.</Text>
    //       </Text>
    //       <SpaceComponent height={20} />

    //       {descriptions.map((desc, index) => (
    //         <RowComponent
    //           styles={{
    //             alignItems: 'flex-start',
    //             marginBottom: 8,
    //           }}
    //           key={`desc${index}`}>
    //           <FontAwesome name="check" color={appColors.success1} size={28} />
    //           <SpaceComponent width={12} />
    //           <TextComponent text={desc} />
    //         </RowComponent>
    //       ))}
    //     </SectionComponent>
    //     <SectionComponent styles={{marginTop: 80}}>
    //       <CardContent
    //         color={appColors.text}
    //         styles={{padding: 0, alignItems: 'center'}}>
    //         <TextComponent
    //           text="LIMITED-TIME OFFER"
    //           color={appColors.white}
    //           font={fontFamilys.semiBold}
    //           size={12}
    //           styles={{paddingVertical: 2}}
    //         />
    //         <CardContent
    //           styles={{
    //             flex: 1,
    //             width: '100%',
    //             padding: 12,
    //             marginBottom: 0,
    //           }}
    //           color={'#13917B'}>
    //           <RowComponent>
    //             <TitleComponent text="Annual" color={appColors.white} />
    //             <TextComponent
    //               size={12}
    //               color={appColors.white}
    //               font={fontFamilys.semiBold}
    //               text="55% OFF"
    //               flex={0}
    //               styles={[
    //                 {
    //                   backgroundColor: appColors.primary,
    //                   paddingHorizontal: 6,
    //                   paddingVertical: 2,
    //                   borderRadius: 3,
    //                 },
    //               ]}
    //             />
    //           </RowComponent>
    //           <SpaceComponent height={8} />
    //           <RowComponent
    //             onPress={handleSaveDemodata}
    //             justify="flex-start"
    //             styles={{alignItems: 'flex-end'}}>
    //             <TitleComponent
    //               text="$39.99"
    //               flex={0}
    //               size={20}
    //               height={22}
    //               color={appColors.white}
    //             />
    //             <TextComponent
    //               text=" $89.99 "
    //               color={appColors.white}
    //               size={14}
    //               flex={0}
    //               styles={{
    //                 textDecorationLine: 'line-through',
    //               }}
    //             />
    //             <TextComponent
    //               text=" after 30 day free trial"
    //               color={appColors.white}
    //               size={14}
    //               flex={0}
    //             />
    //           </RowComponent>
    //         </CardContent>
    //       </CardContent>

    //       <CardContent
    //         styles={{
    //           flex: 1,
    //           width: '100%',
    //           padding: 12,
    //           marginBottom: 0,
    //         }}
    //         color={appColors.white}>
    //         <RowComponent>
    //           <TitleComponent text="Monthly" color={appColors.text} />
    //           <TextComponent
    //             size={12}
    //             color={appColors.text}
    //             font={fontFamilys.semiBold}
    //             text="55% OFF"
    //             flex={0}
    //             styles={[
    //               {
    //                 backgroundColor: appColors.primary,
    //                 paddingHorizontal: 6,
    //                 paddingVertical: 2,
    //                 borderRadius: 3,
    //                 opacity: 0.5,
    //               },
    //             ]}
    //           />
    //         </RowComponent>
    //         <SpaceComponent height={8} />
    //         <RowComponent
    //           onPress={handleSaveDemodata}
    //           justify="flex-start"
    //           styles={{alignItems: 'flex-end'}}>
    //           <TitleComponent
    //             text="$3.99"
    //             flex={0}
    //             size={20}
    //             height={22}
    //             color={appColors.text}
    //           />
    //           <TextComponent
    //             text=" $8.99 "
    //             color={appColors.text}
    //             size={14}
    //             flex={0}
    //             styles={{
    //               textDecorationLine: 'line-through',
    //             }}
    //           />
    //           <TextComponent
    //             text=" after 7 day free trial"
    //             color={appColors.text}
    //             size={14}
    //             flex={0}
    //           />
    //         </RowComponent>
    //       </CardContent>
    //     </SectionComponent>
    //     <SectionComponent>
    //       <ButtonComponent
    //         text="Try free and subscribe"
    //         onPress={handleSaveDemodata}
    //         color={appColors.success1}
    //         textColor={appColors.text}
    //       />
    //     </SectionComponent>
    //     <SectionComponent>
    //       <RowComponent>
    //         <Button
    //           text="Restore Purchase"
    //           fontStyles={{
    //             fontFamily: fontFamilys.bold,
    //             color: appColors.primary,
    //           }}
    //           textSize={12}
    //           onPress={handleSaveDemodata}
    //         />
    //         <TextComponent text=" • " flex={0} />
    //         <Button
    //           text="Terms & Conditions"
    //           fontStyles={{
    //             fontFamily: fontFamilys.bold,
    //             color: appColors.primary,
    //           }}
    //           textSize={12}
    //           onPress={handleSaveDemodata}
    //         />
    //       </RowComponent>
    //     </SectionComponent>
    //   </ScrollView>
    //   <Image
    //     source={require('../assets/images/Ellipse.png')}
    //     style={{
    //       marginTop: 20,
    //       width: '100%',
    //       resizeMode: 'cover',
    //       position: 'absolute',
    //       bottom: -52,
    //       left: 0,
    //       right: 0,
    //       zIndex: -1,
    //     }}
    //   />
    // </Modal>
  );
};

export default SubscriptionModal;
