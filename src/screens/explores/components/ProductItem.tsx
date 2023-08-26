import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {TextComponent} from '../../../components';
import {appSize} from '../../../constants/appSize';

interface Props {
  item: any;
}

const ProductItem = (props: Props) => {
  const {item} = props;

  return (
    <TouchableOpacity
      onPress={() => {}}
      key={item.id}
      style={{
        width: (appSize.width - 64) / 3,
        marginBottom: 16,
        marginRight: 16,
      }}>
      <Image
        source={{
          uri: 'https://s3-alpha-sig.figma.com/img/40d7/0023/5868cd6302567bf42e76f428442f47b7?Expires=1693785600&Signature=g7smBLUhN77wSMh~jRHZob99Le6q376mZzJ6BVhLHYBXj4IiV0I~aVYHlCtFXottxPmlldG1dAp1OGoiqmqujvOBLcFlT-IxkfVEOZviAcY87SF-3CTu6OOmuK3etGLt0bHfxutE5C5GRJ1Fz-3axOoDkkhpC0n2GZHH~QgQMTHXCX2ZCeZ3mr~~rXbMFEctVnmQnl2xySJ7XUpn3TWCMjBe3rAMpNySMSoM8O4kCfjK9nC7VhTOGBBjU~XDWBgnbK17kT43Ipj6i8tproTiugN66nHkGH5hfg2-za5krDdt2sbCrLdg~cp6fpk1ODmHuJwriVxrZ7iyLQobA9EU2Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        }}
        style={{
          width: '100%',
          height: 100,
          borderRadius: 8,
          resizeMode: 'cover',
        }}
      />
      <TextComponent text="Meat, seafood & alternatives" line={2} />
    </TouchableOpacity>
  );
};

export default ProductItem;
