import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  CategoryItem,
  Container,
  LoadingComponent,
  SectionComponent,
  TitleComponent,
} from '../../components';
import {AddSquare} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import SearchFilterComponent from './components/SearchFilterComponent';
import {Category} from '../../Models/Category';
import handleGetData from '../../apis/productAPI';
import {useIsFocused} from '@react-navigation/native';

const SubCategories = ({route, navigation}: any) => {
  const {category} = route.params;

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const api = `/getSubCategories/${category.id}`;

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
          navigation.navigate('SubSubCategories', {
            parentCategory: category,
            category: item,
          });
        } else {
          navigation.navigate('CategoryDetail', {category, subCategory: item});
        }
      });
      setIsChecking(false);
    } catch (error) {
      setIsChecking(false);
      console.log(error);
    }
  };

  return (
    <Container
      back
      right={
        <Button
          icon={<AddSquare size={24} color={appColors.text3} variant="Bold" />}
          onPress={() => navigation.navigate('AddNewScreen')}
        />
      }>
      <SearchFilterComponent category_id={category.id} />
      {!isLoading ? (
        <>
          <SectionComponent>
            <TitleComponent text={category.name} size={24} flex={0} />
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
                  key={`category${item.id}`}
                />
              )}
            />
          </View>
        </>
      ) : (
        <LoadingComponent isLoading={isLoading} value={categories.length} />
      )}
    </Container>
  );
};

export default SubCategories;
