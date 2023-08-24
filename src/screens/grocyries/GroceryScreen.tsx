import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
  Button,
  CardContent,
  ChartPieItem,
  Container,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {fontFamilys} from '../../constants/fontFamily';
import {global} from '../../styles/global';

const GroceryScreen = ({navigation}: any) => {
  const [store, setStore] = useState('all');

  const storeData = [
    {id: 'wallmart', title: 'Wallmart', totalItem: 3, totalPayment: 14.5},
    {id: 'wholeFoods', title: 'Whole Foods', totalItem: 1, totalPayment: 14.5},
  ];

  const renderTabStore = (item: any) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => setStore(item.id)}
      style={[
        global.tag,
        {
          borderRadius: 100,
          marginLeft: 12,
          marginRight: 0,
          backgroundColor:
            store === item.id ? appColors.success1 : appColors.white,
        },
      ]}>
      <TextComponent
        flex={0}
        font={store === item.id ? fontFamilys.bold : fontFamilys.medium}
        color={store === item.id ? appColors.text : appColors.gray}
        size={12}
        text={`${item.title} - ${item.totalItem} ($${item.totalPayment.toFixed(
          2,
        )})`}
      />
    </TouchableOpacity>
  );

  return (
    <Container
      right={<Feather name="more-vertical" size={22} color={appColors.gray} />}>
      <SectionComponent>
        <RowComponent justify="flex-start">
          <TitleComponent
            text="Your Grocery List"
            size={32}
            flex={0}
            height={32}
          />
          <SpaceComponent width={8} />
          <Button
            icon={
              <AntDesign name="infocirlceo" size={20} color={appColors.gray} />
            }
            onPress={() => {}}
          />
        </RowComponent>
        <CardContent
          isShadow
          color={appColors.white}
          styles={{padding: 12, marginVertical: 8, marginBottom: 0}}>
          <RowComponent>
            <RowComponent justify="flex-start" styles={{flex: 1}}>
              <TitleComponent text="List Score" flex={0} size={18} />
              <SpaceComponent width={4} />
              <Button
                icon={
                  <AntDesign
                    name="infocirlceo"
                    size={14}
                    color={appColors.gray}
                  />
                }
                onPress={() => {}}
              />
            </RowComponent>
            <Button
              text="Improve Score"
              textSize={14}
              textColor={appColors.primary}
              onPress={() => {}}
            />
          </RowComponent>
          <SpaceComponent height={12} />
          <RowComponent>
            <ChartPieItem
              total={67}
              size={74}
              fontSize={28}
              data={{values: [70, 20, 10]}}
              radius={0.9}
            />
            <View
              style={{
                flex: 1,
                paddingLeft: 34,
              }}>
              <RowComponent>
                <View
                  style={{
                    backgroundColor: '#E6EECC',
                    padding: 4,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextComponent text="👍" size={12} flex={0} />
                </View>
                <TitleComponent text={` 50%`} size={12} flex={0} />
                <TextComponent
                  text={` (14) Great Choices`}
                  size={12}
                  font={fontFamilys.regular}
                />
              </RowComponent>
              <SpaceComponent height={6} />
              <RowComponent>
                <View
                  style={{
                    backgroundColor: '#FFECBF',
                    padding: 4,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextComponent text="👌" size={12} flex={0} />
                </View>
                <TitleComponent text={` 20%`} size={12} flex={0} />
                <TextComponent
                  text={` (12) Good`}
                  size={12}
                  font={fontFamilys.regular}
                />
              </RowComponent>

              <SpaceComponent height={6} />
              <RowComponent>
                <View
                  style={{
                    backgroundColor: '#FFDBDB',
                    padding: 4,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: 'rotate(180deg)',
                  }}>
                  <TextComponent text="👍" size={12} flex={0} styles={{}} />
                </View>
                <TitleComponent text={` 10%`} size={12} flex={0} />
                <TextComponent
                  text={` (4) Limit`}
                  size={12}
                  font={fontFamilys.regular}
                />
              </RowComponent>
            </View>
          </RowComponent>
        </CardContent>
      </SectionComponent>
      <View>
        <FlatList
          data={storeData}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={renderTabStore({
            id: 'all',
            title: 'All',
            totalItem: 5,
            totalPayment: 38.96,
          })}
          renderItem={({item}) => renderTabStore(item)}
        />
      </View>

      <View style={{flex: 1, backgroundColor: 'coral'}}></View>
    </Container>
  );
};

export default GroceryScreen;
