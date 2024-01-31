import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {TitleComponent} from '.';
import {appColors} from '../constants/appColors';
import {appSize} from '../constants/appSize';

const CountDownComponent = ({visible}: {visible: boolean}) => {
  const [limit, setLimit] = useState(90);

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit(limit => limit - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    !visible && setLimit(90);
  }, [visible]);

  return (
    <View
      style={{
        position: 'absolute',
        top: appSize.height * 0.31,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TitleComponent
        text={`${limit}`}
        size={38}
        color={appColors.success1}
        flex={0}
        styles={{marginBottom: 0}}
      />
      <TitleComponent
        text="sec"
        size={18}
        color={appColors.success1}
        flex={0}
      />
    </View>
  );
};

export default CountDownComponent;
