import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import handleGetData from '../../apis/productAPI';
import {
  Container,
  LoadingComponent,
  SectionComponent,
  TextComponent,
} from '../../components';

const ListScoreDetail = ({navigation, route}: any) => {
  const {id} = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [dataScore, setDataScore] = useState<any[]>([]);

  useEffect(() => {
    id && getScoreDetailById();
  }, [id]);

  const getScoreDetailById = async () => {
    const api = `/groceryListById?id=${id}`;
    setIsLoading(true);
    try {
      const res: any = await handleGetData.handleProduct(api);
      if (res && res.length > 0) {
        setDataScore(res);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Container back>
      <SectionComponent>
        {dataScore.length > 0 ? (
          <></>
        ) : (
          <LoadingComponent isLoading={isLoading} value={dataScore.length} />
        )}
      </SectionComponent>
    </Container>
  );
};

export default ListScoreDetail;
