import React from 'react';
import {Category} from '../../Models/Category';
import {Container, TextComponent} from '../../components';

const CategoryDetail = ({navigation, route}: any) => {
  const {category}: {category: Category} = route.params;

  return (
    <Container back isScroll title={category.title}>
      <TextComponent text="Category detail" />
    </Container>
  );
};

export default CategoryDetail;
