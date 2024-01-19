import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Product} from '../../Models/Product';
import {
  Button,
  CardContent,
  ChartPieItem,
  Container,
  ProductItemComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilys} from '../../constants/fontFamily';
import {ModalInfoScore} from '../../modals';
import handleGetData from '../../apis/productAPI';
import {Scoredetails} from '../../Models/Score';
import CardScore from './component/CardScore';
import SwapItemsComponent from '../../components/SwapItemsComponent';

const YourListScore = ({navigation, route}: any) => {
  // const {products}: {products: Product[]} = route.params;
  const [isVisibleModalScoreInfo, setIsVisibleModalScoreInfo] = useState(false);
  const [listScore, setListScore] = useState<Scoredetails>();

  useEffect(() => {
    getListScore();
  }, []);

  const getListScore = async () => {
    const api = `/groceryListScore`;
    try {
      const res: any = await handleGetData.handleProduct(api);
      if (res && res.length > 0) {
        setListScore(res[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container back isScroll paddingBottom={0}>
      <SectionComponent>
        <RowComponent justify="flex-start">
          <TitleComponent
            text="Your List Score"
            styles={{textTransform: 'capitalize'}}
            size={32}
            height={32}
          />
          <SpaceComponent width={8} />
          <Button
            icon={
              <AntDesign name="infocirlceo" size={20} color={appColors.gray} />
            }
            onPress={() => setIsVisibleModalScoreInfo(true)}
          />
        </RowComponent>
      </SectionComponent>
      {/* {listScore && <CardScore listScore={listScore} />} */}
      <CardScore />
      <SectionComponent>
        <TitleComponent
          text="Improve Your Score"
          styles={{textTransform: 'capitalize'}}
          size={20}
        />
        <SwapItemsComponent />
      </SectionComponent>

      <ModalInfoScore
        visible={isVisibleModalScoreInfo}
        onClose={() => setIsVisibleModalScoreInfo(false)}
      />
    </Container>
  );
};

export default YourListScore;
