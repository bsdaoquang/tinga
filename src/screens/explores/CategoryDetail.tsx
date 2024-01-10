import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {Category} from '../../Models/Category';
import {Product} from '../../Models/Product';
import handleGetData from '../../apis/productAPI';
import {
  Container,
  LoadingComponent,
  ProductItemComponent,
  TextComponent,
} from '../../components';
import {showToast} from '../../utils/showToast';

const CategoryDetail = ({navigation, route}: any) => {
  const {
    category,
    subCategory,
    subSubCategory,
  }: {
    category: Category;
    subCategory?: Category;
    subSubCategory?: Category;
  } = route.params;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [page, setPage] = useState(1);
  const [loadmoreable, setLoadmoreable] = useState(true);

  const api = `/getProductListing`;
  const data = {
    category_id: category.id,
    subcategory_id: subCategory ? subCategory.id : 0,
    sub_subcategory_id: subSubCategory
      ? subSubCategory.id
        ? subSubCategory.id
        : 0
      : 0,
    page: 1,
  };

  useEffect(() => {
    getProducts();
  }, [category]);

  useEffect(() => {
    page > 1 && handleLoadmore();
  }, [page]);

  const handleLoadmore = async () => {
    setLoadmore(true);
    const currentData = [...products];
    try {
      const res: any = await handleGetData.handleProduct(
        api,
        {...data, page},
        'post',
      );
      if (res && res.length > 0) {
        res.forEach((item: any) => currentData.push(item));
        setProducts(currentData);
      } else {
        setLoadmoreable(false);
      }
      setLoadmore(false);
    } catch (error) {
      setLoadmore(false);
      console.log(error);
    }
  };

  const getProducts = async () => {
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
          onEndReached={() => loadmoreable && setPage(page + 1)}
          onEndReachedThreshold={0.5}
          numColumns={2}
          ListFooterComponent={loadmore ? <ActivityIndicator /> : null}
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={({item, index}) => (
            <ProductItemComponent
              item={item}
              key={`product${index}${item.id}${item.shopname}`}
              styles={{marginLeft: 16}}
            />
          )}
          keyExtractor={(item, _index) => `product${item.id}${item.shopname}`}
        />
      ) : (
        <LoadingComponent isLoading={isLoading} value={products.length} />
      )}
    </Container>
  );
};

export default CategoryDetail;
