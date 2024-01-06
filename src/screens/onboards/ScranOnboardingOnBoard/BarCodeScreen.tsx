import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {Product} from '../../../Models/Product';
import handleGetData from '../../../apis/productAPI';
import {
  Button,
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
  TitleComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {appSize} from '../../../constants/appSize';
import {ModalProduct} from '../../../modals';
import ModalResultScan from '../../../modals/ModalResultScan';
import ModalizeProducDetail from '../../../modals/ModalizeProducDetail';
import {
  addGroceries,
  groceriesSelector,
} from '../../../redux/reducers/groceryReducer';
import {handleSaveUser} from '../../../utils/handleSaveUser';
import {showToast} from '../../../utils/showToast';
import {appInfos} from '../../../constants/appInfos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HandleProduct} from '../../../utils/HandleProduct';

const BarCodeScreen = ({navigation}: any) => {
  const [codeDetail, setCodeDetail] = useState('');
  const [showProduct, setShowProduct] = useState(false);
  const [product, setProduct] = useState<Product>();
  const [showError, setShowError] = useState(false);
  const [isVisibleModalResult, setIsVisibleModalResult] = useState(false);
  const [groceriesList, setGroceriesList] = useState<Product[]>([]);

  const renderQrCode = (
    <QRCodeScanner
      cameraStyle={{
        width: appSize.width,
        height: appSize.height,
        position: 'absolute',
      }}
      onRead={val => setCodeDetail(val.data)}
      cameraType="back"
      showMarker
      markerStyle={{
        borderColor: appColors.white,
        borderRadius: 12,
        width: appSize.width - 64,
      }}
      cameraProps={{
        captureAudio: false,
        ratio: '1:1',
      }}
    />
  );

  const [QRCodeCotainer, setQRCodeCotainer] = useState(renderQrCode);

  // const groceriesList = useSelector(groceriesSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    requestPermision();
    getGroceriesList();
  }, []);

  useEffect(() => {
    if (codeDetail) {
      getProductDetail(codeDetail);
    }
  }, [codeDetail]);

  useEffect(() => {
    if (showProduct || showError) {
      setQRCodeCotainer(<></>);
    } else {
      setQRCodeCotainer(renderQrCode);
    }
  }, [showProduct, showError]);

  const getGroceriesList = async () => {
    const api = `/listOfProductsCategorywise`;

    await handleGetData
      .handleProduct(api, undefined, 'post')
      .then((res: any) => {
        setGroceriesList(res);
      })
      .catch(error => console.log(error));
  };

  const getProductDetail = async (id: string) => {
    const api = `/getProductByBarcode`;
    const data = {
      barcode: `${id}`,
    };
    try {
      await handleGetData.handleProduct(api, data, 'post').then((res: any) => {
        if (res.length > 0) {
          setProduct(res[0]);
          setShowProduct(true);
        } else {
          setProduct(undefined);
          setShowError(true);
        }
      });
    } catch (error) {
      console.log(error);
      showToast('Can not get product detail by code');
    }
  };

  const requestPermision = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'RequestAuth',
            message: 'Please allow camera permission to scan QR code',
            buttonNeutral: 'Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'Agree',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission granted');
        } else {
          console.log('Yêu cầu bị từ chối');
          handleSaveUser(dispatch);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {QRCodeCotainer}
      <LinearGradient
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
        colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}>
        <RowComponent
          styles={{
            paddingVertical: 42,
            paddingHorizontal: 16,
          }}>
          <Button
            icon={<AntDesign name="close" size={22} color={appColors.white} />}
            onPress={() => navigation.goBack()}
          />
          <TitleComponent
            text="Scan at least 5 pantry items"
            color={appColors.white}
            size={18}
            styles={{textAlign: 'center'}}
          />
          <View>
            <TextComponent
              text={`${groceriesList.length}/5`}
              styles={{
                backgroundColor: appColors.white,
                paddingVertical: 4,
                borderRadius: 100,
                flex: 0,
                paddingHorizontal: 12,
              }}
              size={20}
            />
          </View>
          {groceriesList.length === 1 && (
            <View
              style={{
                position: 'absolute',
                top: 84,
                right: 20,
                backgroundColor: appColors.white,
                borderRadius: 12,
                paddingVertical: 10,
                paddingHorizontal: 12,
              }}>
              <TextComponent text="You scanned your first item!" flex={1} />
            </View>
          )}
          {groceriesList.length >= 5 && (
            <View
              style={{
                position: 'absolute',
                top: 84,
                right: 20,
                backgroundColor: appColors.white,
                borderRadius: 12,
                paddingVertical: 10,
                paddingHorizontal: 12,
              }}>
              <TextComponent
                text="Well done! You’ve scanned 5 items"
                flex={1}
              />

              <ButtonComponent
                styles={{marginTop: 12, paddingVertical: 8}}
                text="Finish Pantry Reset"
                onPress={() => setIsVisibleModalResult(true)}
              />
            </View>
          )}
        </RowComponent>
      </LinearGradient>

      <SectionComponent
        styles={{
          position: 'absolute',
          bottom: 24,
          right: 0,
          left: 0,
        }}>
        <RowComponent styles={{marginBottom: 24}}>
          <TextComponent
            text="Scanning for barcodes..."
            flex={0}
            color={appColors.white}
          />
        </RowComponent>
        <ButtonComponent
          text="Finish Pantry Reset"
          onPress={() => setIsVisibleModalResult(true)}
        />
      </SectionComponent>

      <ModalizeProducDetail
        visible={showError}
        onClose={() => {
          setShowError(false);
          setCodeDetail('');
        }}
      />

      <ModalProduct
        visible={showProduct}
        onClose={() => {
          setCodeDetail('');
          setProduct(undefined);
          setShowProduct(false);
        }}
        product={product}
        onAddToList={async (count: number, shop_id) =>
          product &&
          (await HandleProduct.addToList(product, count, shop_id, true).then(
            () => getGroceriesList(),
          ))
        }
        products={groceriesList ?? []}
      />

      <ModalResultScan
        isVisible={isVisibleModalResult}
        onClose={async () => {
          setIsVisibleModalResult(false);
          // navigation.navigate('HomeScreen');
          handleSaveUser(dispatch);

          await AsyncStorage.setItem(
            appInfos.localDataName.scanlist,
            JSON.stringify(groceriesList),
          );
        }}
        groceriesList={groceriesList}
        onKeepScan={() => setIsVisibleModalResult(false)}
        count={groceriesList.length}
      />
    </>
  );
};

export default BarCodeScreen;
