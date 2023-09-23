import React from 'react';
import RenderHTML from 'react-native-render-html';
import {Tip} from '../../Models/TipModel';
import {Container, SectionComponent} from '../../components';
import {appSize} from '../../constants/appSize';
import {tagsStyles} from '../../constants/tagStyles';

const TipDetail = ({route, navigation}: any) => {
  const {item}: {item: Tip} = route.params;

  // console.log(item);
  return (
    <Container back title={item.title} isScroll>
      <SectionComponent>
        <RenderHTML
          source={{html: item.content}}
          contentWidth={appSize.width}
          tagsStyles={tagsStyles}
        />
      </SectionComponent>
    </Container>
  );
};

export default TipDetail;
