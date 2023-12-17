import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Category} from '../../Models/Category';
import {Product} from '../../Models/Product';
import handleGetData from '../../apis/productAPI';
import {
  Container,
  LoadingComponent,
  ProductItemComponent,
} from '../../components';
import {showToast} from '../../utils/showToast';

const CategoryDetail = ({navigation, route}: any) => {
  const {
    category,
    subCategory,
    subSubCategory,
  }: {
    category: Category;
    subCategory: Category;
    subSubCategory: Category;
  } = route.params;

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
      sub_subcategory_id: subSubCategory.id ?? 0,
      page: 1,
    };

    setIsLoading(true);
    try {
      const res: any = await handleGetData.handleProduct(api, data, 'post');
      setProducts(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      showToast(`Can not get producs items`);
      console.log(`Can not get producs items ${error}`);
    }
  };

  return (
    <Container
      back
      title={
        subSubCategory
          ? subSubCategory.name
          : subCategory
          ? subCategory.name
          : category.name
      }>
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
