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
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p2',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p3',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p4',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p5',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
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
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p2',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p3',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p4',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p5',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
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
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p2',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p3',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p4',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p5',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
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
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p2',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p3',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p4',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        },
        {
          id: 'p5',
          title: 'Dempsters Smooth Multigrains Bread',
          description: '',
          mart: 'Walmart',
          rating: 4.5,
          price: 3.99,
          imageUrl:
            'https://s3-alpha-sig.figma.com/img/0949/c4f3/9f08eaf9572c1baf96c42c3a212ccb1d?Expires=1693785600&Signature=Wfk91~3IQK9-u43WF0CyrjxiM9u6yFW81iobYnSa5uaWNuEfFlCUoy8fmtSKvD4WUK~RJDKLGYyY-j~sUxdwIplb7Z8EWoiWDdsTBiVjdJGf5kRO-rGg1dzjsRfmw2pIhaQi0FYG5oISIc0ImaALDz1XzOSqT0qorGGIS32HYxSoDeYWY5q2GI1QRpu2gRZ5yuAXxiETcdwEPp9tMjRunM1lgf5RWtImX6etBONZPnOAl4Ycq3Kmo7N2LCC4xoKA~KOXbyR8sbtnWogNzvAI5qpBjycyqXRSk7tSsV6tF~NMm12HdTWCLounKwM3N4ixaaHJr7TgkF7T~aoJ3bPmjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
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
        renderItem={({item}) => (
          <ImageProduct imageUrl={item.imageUrl} styles={{marginLeft: 8}} />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </CardContent>
  );

  return (
    <Container back isScroll barStyle="dark-content">
      <SectionComponent>
        <TitleComponent text="Grocery List History" size={32} />
        <SpaceComponent height={12} />
        {data.map(item => renderCardHistory(item))}
      </SectionComponent>
    </Container>
  );
};

export default ShopingHistory;
