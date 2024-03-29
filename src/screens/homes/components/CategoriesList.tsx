import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Tip} from '../../../Models/TipModel';
import dashboardAPI from '../../../apis/dashboardAPI';
import {
  CardContent,
  TabbarComponent,
  TextComponent,
  TitleComponent,
} from '../../../components';
import LockPremiumComponent from '../../../components/LockPremiumComponent';
import {appColors} from '../../../constants/appColors';
import {authSelector} from '../../../redux/reducers/authReducer';
import {showToast} from '../../../utils/showToast';
interface Props {
  title: string;
  url: string;
}

const CategoriesList = ({title, url}: Props) => {
  const [indexItem, setIndexItem] = useState(0);

  const [tips, setTips] = useState<Tip[]>([]);
  const navigation: any = useNavigation();
  const auth = useSelector(authSelector);

  useEffect(() => {
    getTips();
  }, []);

  const getTips = async () => {
    try {
      await dashboardAPI.HandleAPI(url).then((res: any) => {
        setTips(res);
      });
    } catch (error) {
      console.log(error);
      showToast('Can not get tips by user');
    }
  };

  const renderDotsView = (array: any[], position: any) => (
    <View style={{flexDirection: 'row'}}>
      {array.map((_item, i: any) => (
        <View
          key={i}
          style={{
            height: 6,
            width: position === i ? 24 : 6,
            backgroundColor:
              position === i ? appColors.primary : 'rgba(50, 100, 91, 0.20);',
            marginHorizontal: 4,
            borderRadius: 5,
          }}
        />
      ))}
    </View>
  );

  const renderCardItem = (item: Tip) => (
    <CardContent
      onPress={
        auth.is_premium === 0
          ? undefined
          : () => navigation.navigate('TipDetail', {item})
      }
      isShadow
      color={appColors.white}
      styles={{
        marginHorizontal: 16,
        marginVertical: 12,
        width: 186,
        height: 114,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
      }}>
      <LockPremiumComponent />
      <TitleComponent
        text={item.title}
        flex={0}
        size={20}
        color={item.color}
        styles={{
          textAlign: 'center',
        }}
      />
    </CardContent>
  );

  return (
    <View style={{marginBottom: 24}}>
      <View style={{paddingHorizontal: 16}}>
        <TabbarComponent
          styles={{marginBottom: 0}}
          title={title}
          seemore
          onPress={() =>
            navigation.navigate('TipsScreens', {
              title,
              tips,
            })
          }
        />
      </View>
      {tips.length > 0 ? (
        <>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={tips}
            onScroll={event => {
              const index = Math.round(event.nativeEvent.contentOffset.x / 186);
              setIndexItem(index);
            }}
            renderItem={({item}) => renderCardItem(item)}
            horizontal
          />
          <View
            style={{
              flex: 1,
              marginTop: 4,
              alignItems: 'center',
            }}>
            {renderDotsView(tips, indexItem)}
          </View>
        </>
      ) : (
        <TextComponent
          text={`${title} not found`}
          flex={0}
          styles={{textAlign: 'center', marginTop: 8}}
        />
      )}
    </View>
  );
};

export default CategoriesList;
