import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import handleGetData from '../../apis/productAPI';
import {
  Button,
  ButtonComponent,
  Container,
  InputComponent,
  RowComponent,
  SectionComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfos} from '../../constants/appInfos';
import {fontFamilys} from '../../constants/fontFamily';
import {LoadingModal} from '../../modals';
import {addAuth, authSelector} from '../../redux/reducers/authReducer';
import {showToast} from '../../utils/showToast';
import ModalUpdatePhoto from '../../modals/ModalUpdatePhoto';
import FastImage from 'react-native-fast-image';

const PersionalInfomation = ({navigation}: any) => {
  const [profileDetail, setProfileDetail] = useState({
    first_name: '',
    last_name: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isVisibleModalUpdatePhoto, setIsVisibleModalUpdatePhoto] = useState(
    false,
  );
  const [imageFile, setImageFile] = useState<any>();

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    auth &&
      setProfileDetail({
        first_name: auth.first_name,
        last_name: auth.last_name,
      });
  }, [auth]);

  const handleUpdateProfile = async () => {
    const api = `/save`;
    setIsUpdating(true);
    const data = new FormData();

    data.append('first_name', profileDetail.first_name);
    data.append('last_name', profileDetail.last_name);

    if (imageFile) {
      data.append('image', imageFile);
    }

    await handleGetData
      .handleAuth(api, data, 'post', true)
      .then((res: any) => {
        if (res.success) {
          showToast(res.message);
          handleGetAndUpdateProfile();
        }
        setIsUpdating(false);
      })
      .catch(error => {
        setIsUpdating(false);
        console.log(error);
        showToast(JSON.stringify(error));
      });
  };

  const handleGetAndUpdateProfile = async () => {
    const api = `/getUserProfile`;
    try {
      await handleGetData.handleUser(api).then(async (res: any) => {
        const data = {...auth, ...res, premium_till: res.premium_till};

        dispatch(addAuth(data));

        await AsyncStorage.setItem(
          appInfos.localDataName.userData,
          JSON.stringify(data),
        ).then(() => {
          navigation.goBack();
        });
      });
    } catch (error) {
      // console.log(error.message);
      showToast(`Can not get profile`);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Container back isFlex isScroll>
        <SectionComponent styles={{flex: 1}}>
          <TitleComponent text={`Persional\nInfomation`} size={28} flex={0} />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}
          >
            {imageFile && (
              <FastImage
                source={{uri: imageFile.uri}}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 100,
                  marginBottom: 20,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
            <RowComponent
              styles={{
                marginBottom: 20,
                width: '100%',
                justifyContent: 'flex-start',
              }}
            >
              <Button
                styles={{flex: 0}}
                text="Edit Photo"
                onPress={() => setIsVisibleModalUpdatePhoto(true)}
                textColor={appColors.success1}
                fontStyles={{
                  fontFamily: fontFamilys.bold,
                  fontSize: 18,
                }}
              />
            </RowComponent>
            <InputComponent
              placeholder="First name"
              value={profileDetail.first_name}
              onChange={val =>
                setProfileDetail({
                  ...profileDetail,
                  first_name: val,
                })
              }
              clear
              styles={{
                width: '100%',
              }}
            />
            <InputComponent
              placeholder="Last name"
              value={profileDetail.last_name}
              onChange={val =>
                setProfileDetail({
                  ...profileDetail,
                  last_name: val,
                })
              }
              clear
              styles={{
                width: '100%',
              }}
            />
          </View>
          <ButtonComponent
            text="Save change"
            disable={
              profileDetail.first_name && profileDetail.last_name ? false : true
            }
            onPress={handleUpdateProfile}
            fontStyles={{
              textAlign: 'center',
            }}
            iconRight
          />
        </SectionComponent>
        <LoadingModal visible={isUpdating} />
        <ModalUpdatePhoto
          onSelectedFile={(file: any) => setImageFile(file)}
          isVisible={isVisibleModalUpdatePhoto}
          onClose={() => setIsVisibleModalUpdatePhoto(false)}
        />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default PersionalInfomation;
