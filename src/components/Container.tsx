import {useNavigation} from '@react-navigation/native';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StatusBarStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../constants/appColors';
import {appSize} from '../constants/appSize';
import {global} from '../styles/global';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

const wait = (timeout: number) => {
  return new Promise((resolve: any) => setTimeout(resolve, timeout));
};

const Container = ({
  children,
  float,
  top,
  onRefesh,
  backgroundColor,
  title,
  right,
  left,
  back,
  isScroll,
  isShowFooter,
  isTitleCenter,
  isFlex,
  search,
  onScrollToTop,
  onBack,
  flexRight,
  barStyle,
}: {
  children: any;
  float?: boolean;
  top?: number;
  backgroundColor?: string;
  onRefesh?: () => void;
  title?: string;
  back?: boolean;
  right?: any;
  left?: any;
  isScroll?: boolean;
  isShowFooter?: boolean;
  isTitleCenter?: boolean;
  isFlex?: boolean;
  search?: ReactNode;
  onScrollToTop?: boolean;
  flexRight?: number;
  barStyle?: StatusBarStyle;
  onBack?: () => void;
}) => {
  const [contentY, setContentY] = useState<number>(0);
  const [refeshing, setRefeshing] = useState(false);

  const scrollRef = useRef<any>();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setContentY(event.nativeEvent.contentOffset.y);
  };

  useEffect(() => {
    onScrollToTop &&
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
  }, [onScrollToTop]);

  const handleRefesh = useCallback(() => {
    if (onRefesh) {
      setRefeshing(true);

      wait(2000).then(() => {
        onRefesh();
        setRefeshing(false);
      });
    }
  }, []);

  const navigation: any = useNavigation();

  return (
    <View
      style={{
        paddingTop: top ?? 0,
        flex: 1,
        backgroundColor: backgroundColor ? backgroundColor : appColors.bgColor,
      }}>
      <StatusBar
        barStyle={barStyle ? barStyle : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      {title || back || left || right ? (
        <View
          style={{
            ...global.rowCenter,
            paddingTop: Platform.OS === 'ios' ? 58 : 42,
            padding: 16,
            paddingVertical: 10,
          }}>
          <RowComponent
            styles={{
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <RowComponent>
                {left && left}
                {back && (
                  <TouchableOpacity
                    style={{paddingRight: 10}}
                    onPress={() =>
                      onBack
                        ? onBack()
                        : navigation.canGoBack()
                        ? navigation.goBack()
                        : navigation.navigate('HomeScreen')
                    }>
                    <AntDesign
                      name="arrowleft"
                      size={22}
                      color={appColors.text}
                    />
                  </TouchableOpacity>
                )}
              </RowComponent>
            </View>
            <View
              style={{
                flex: right ? 2 : 8,
                paddingHorizontal: 8,
              }}>
              {search
                ? search
                : title && (
                    <View
                      style={{
                        zIndex: -1,
                      }}>
                      <TextComponent
                        text={title}
                        line={1}
                        styles={{
                          ...global.text,
                          flex: 0,
                          fontSize: appSize.titleSize,
                          lineHeight: 24,
                          textAlign: 'center',
                        }}
                      />
                    </View>
                  )}
            </View>
            <View style={{alignItems: 'flex-end', flex: flexRight ?? 1}}>
              {right ? right : <View style={{width: 10}} />}
            </View>
          </RowComponent>
        </View>
      ) : null}

      {isScroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: isFlex ? 1 : 0}}
          automaticallyAdjustContentInsets={false}
          ref={scrollRef}
          scrollEventThrottle={16}
          refreshControl={
            onRefesh ? (
              <RefreshControl refreshing={refeshing} onRefresh={handleRefesh} />
            ) : undefined
          }
          onScroll={event => handleScroll(event)}
          style={{
            ...global.container,
            flex: 1,
            backgroundColor: backgroundColor ?? appColors.bgColor,
          }}>
          {children}
        </ScrollView>
      ) : (
        <View
          style={{
            ...global.container,

            backgroundColor: backgroundColor ?? appColors.bgColor,
          }}>
          {children}
        </View>
      )}
    </View>
  );
};

export default Container;
