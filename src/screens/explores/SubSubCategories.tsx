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

const SubSubCategories = ({route, navigation}: any) => {
  const {parentCategory, category} = route.params;

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const api = `/getSubSubCategories/${category.id}`;

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

  return (
    <Container
      back
      right={
        <Button
          icon={<AddSquare size={24} color={appColors.text3} variant="Bold" />}
          onPress={() => navigation.navigate('AddNewScreen')}
        />
      }>
      <SearchFilterComponent
        category_id={parentCategory.id}
        subCategory_id={category.id}
        subSubCategory_id={0}
      />
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
                  onPress={() =>
                    navigation.navigate('CategoryDetail', {
                      category: parentCategory,
                      subCategory: category,
                      subSubCategory: item,
                    })
                  }
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

export default SubSubCategories;
