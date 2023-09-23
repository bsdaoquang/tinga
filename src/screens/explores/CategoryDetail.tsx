import React, {useEffect, useState} from 'react';
import {Category} from '../../Models/Category';
import {
  Container,
  LoadingComponent,
  ProductItemComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {Product} from '../../Models/Product';
import {showToast} from '../../utils/showToast';
import handleGetData from '../../apis/productAPI';
import {FlatList} from 'react-native';

const CategoryDetail = ({navigation, route}: any) => {
  const {
    category,
    subCategory,
    subSubCategory,
  }: {category: Category; subCategory: Category; subSubCategory: Category} =
    route.params;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, [category]);

  const getProducts = async () => {
    const api = `/getProductListing`;
    const data = {
      category_id: category.id,
      subcategory_id: subCategory.id ?? 0,
      sub_subcategory_id: subSubCategory ?? 0,
      offset: 1,
    };
    console.log(data);
    setIsLoading(true);
    try {
      await handleGetData.handleProduct(api, data, 'post').then((res: any) => {
        setProducts(res);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      showToast(`Can not get producs items`);
      console.log(`Can not get producs items ${error}`);
    }
  };

  return (
    <Container back title={category.name}>
      {products.length > 0 ? (
        <FlatList
          numColumns={2}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={({item, index}) => (
            <ProductItemComponent item={item} styles={{marginLeft: 16}} />
          )}
        />
      ) : (
        <LoadingComponent isLoading={isLoading} value={products.length} />
      )}
    </Container>
  );
};

export default CategoryDetail;
