import React from 'react';
import {Category} from '../../Models/Category';
import {Container, SectionComponent, TextComponent} from '../../components';

const CategoryDetail = ({navigation, route}: any) => {
  const {category}: {category: Category} = route.params;

  return (
    <Container back isScroll title={category.name}>
      <SectionComponent>
        <TextComponent text="Category detail" />
      </SectionComponent>
    </Container>
  );
};

export default CategoryDetail;
