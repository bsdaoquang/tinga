import React from 'react';
import {Container, SectionComponent, TitleComponent} from '../../components';

const RecipesScreen = () => {
  return (
    <Container>
      <SectionComponent
        styles={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TitleComponent text="Wait for design" flex={0} />
      </SectionComponent>
    </Container>
  );
};

export default RecipesScreen;
