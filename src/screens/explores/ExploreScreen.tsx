import {AddSquare} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Category} from '../../Models/Category';
import handleGetData from '../../apis/productAPI';
import {
  Button,
  CategoryItem,
  Container,
  LoadingComponent,
  SectionComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import SearchFilterComponent from './components/SearchFilterComponent';
import {LoadingModal} from '../../modals';

const ExploreScreen = ({navigation}: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const api = `/getCategories`;

    try {
      await handleGetData.handleProduct(api).then((res: any) => {
        if (res.length > 0) {
          setCategories(res);
        }
      });
    } catch (error: any) {
      setIsLoading(false);
      console.log(`Can not get sub categories ${error.message}`);
      console.log(error);
    }
  };

  const handleCheckChildrenValues = async (item: Category) => {
    setIsChecking(true);
    const api = `/getSubCategories/${item.id}`;

    try {
      await handleGetData.handleProduct(api).then((res: any) => {
        if (res.length > 0) {
          navigation.navigate('SubCategories', {category: item});
        } else {
          navigation.navigate('CategoryDetail', {category: item});
        }
      });
      setIsChecking(false);
    } catch (error) {
      setIsChecking(false);
      console.log(error);
    }
  };

  return (
    <>
      <Container
        right={
          <Button
            icon={
              <AddSquare size={24} color={appColors.text3} variant="Bold" />
            }
            onPress={() => {}}
          />
        }>
        <SearchFilterComponent category_id={0} />

        {!isLoading ? (
          <>
            <SectionComponent>
              <TitleComponent text={'Top categories'} size={24} flex={0} />
            </SectionComponent>
            <View
              style={{
                flex: 1,
              }}>
              <FlatList
                numColumns={3}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                style={{paddingHorizontal: 16}}
                data={categories}
                renderItem={({item, index}) => (
                  <CategoryItem
                    onPress={() => handleCheckChildrenValues(item)}
                    item={item}
                    key={`category${item.id}${index}`}
                  />
                )}
              />
            </View>
          </>
        ) : (
          <LoadingComponent isLoading={isLoading} value={categories.length} />
        )}
      </Container>

      <LoadingModal visible={isChecking} />
    </>
  );
};

export default ExploreScreen;
