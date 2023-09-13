import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {
  Button,
  CardContent,
  ChartPieItem,
  Container,
  ImageProduct,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {ArrowRight, ArrowRight2} from 'iconsax-react-native';
import {DateTime} from '../../utils/DateTime';

const ShopingHistory = () => {
  const data = [
    {
      id: '1',
      date: '2022-08-29T00:00:00.000Z',
      totalScore: 67,
      dataScore: [53, 21, 15],
      dataProducts: [
        {
          id: 'p1',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p2',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p3',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p4',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p5',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
      ],
    },
    {
      id: '2',
      date: '2022-08-29T00:00:00.000Z',
      totalScore: 67,
      dataScore: [53, 21, 15],
      dataProducts: [
        {
          id: 'p1',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p2',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p3',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p4',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p5',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
      ],
    },
    {
      id: '3',
      date: '2022-08-29T00:00:00.000Z',
      totalScore: 67,
      dataScore: [53, 21, 15],
      dataProducts: [
        {
          id: 'p1',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p2',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p3',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p4',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p5',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
      ],
    },
    {
      id: '4',
      date: '2022-08-29T00:00:00.000Z',
      totalScore: 67,
      dataScore: [53, 21, 15],
      dataProducts: [
        {
          id: 'p1',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p2',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p3',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p4',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p5',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1695600000&Signature=Lg1zOVGWIh-PObTZ~1emXensFTTJhm4mMd-MEaUH9Uzm3WkG~D46kmA6Q6OqdarLpSTtfLOy1gqdgja40gXnsWHqhABJpIWh6oLvlwHw5s3j~FylcAxldq6RyclYck-yzX0jHNzpMDPwl2t--2G11Ns9fGyAfVrE1~x5S85d1acRYh9i-6uCS1Na5DADtO0HN2eDJ5Had7g05llBicXHzuRlin0Hd8kKDWCI-vH9UWHVjG42fS63Z-zr1~rrHx~l8CdUHQBZWYbnN8DlZ8qAGr0VSKFu0Yvzo1GNFYIYYkUgSCegvTmj9CIuqASlRx2s5NtDymYai4uqfuDEMqemLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
      ],
    },
  ];

  const renderCardHistory = (item: any) => (
    <CardContent color={appColors.white} isShadow styles={{marginBottom: 16}}>
      <RowComponent onPress={() => {}}>
        <TextComponent text={DateTime.getDateString(item.date)} />
        <Button
          onPress={() => {}}
          icon={<ArrowRight2 size={18} color={appColors.gray} />}
        />
      </RowComponent>
      <SpaceComponent height={16} />
      <FlatList
        ListHeaderComponent={
          <ChartPieItem
            total={item.totalScore}
            size={40}
            fontSize={18}
            data={{values: item.dataScore}}
            radius={0.9}
          />
        }
        data={item.dataProducts}
        renderItem={({item, index}) => (
          <ImageProduct
            key={`image${index}`}
            imageUrl={item.imageUrl}
            styles={{marginLeft: 8}}
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </CardContent>
  );

  return (
    <Container back isScroll>
      <SectionComponent>
        <TitleComponent text="Grocery List History" size={32} />
        <SpaceComponent height={12} />
        {data.map(item => renderCardHistory(item))}
      </SectionComponent>
    </Container>
  );
};

export default ShopingHistory;
