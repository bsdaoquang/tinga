import { Dimensions, Platform, StyleSheet } from 'react-native';
import { appColors } from '../constants/appColors';
import { fontFamilys } from '../constants/fontFamily';

export const global = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.bgColor,
  },

  sections: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  inner: {
    paddingHorizontal: 16,
    padding: 15,
  },

  card: {
    padding: 16,
    backgroundColor: '#BFBFBF36',
    borderRadius: 10,
    marginBottom: 12
  },

  row: {
    flexDirection: 'row',
    //alignItems: 'center',
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  rowCenter: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },


  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.55)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12.16,
    elevation: 5,
  },

  buttonIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },

  buttonIconIcon: {
    color: appColors.text,
  },

  buttonIconTitle: {
    color: appColors.text,
    fontFamily: fontFamilys.medium,
    fontSize: 12,
    marginTop: 8,
    lineHeight: 19.1,
    textAlign: 'center',
    flex: 0,
  },

  seemore: {
    fontSize: 12,
    lineHeight: 19.1,
  },

  modalContent: {
    padding: 16,
    borderRadius: 12,
    width: Dimensions.get('window').width - 32,
    backgroundColor: appColors.white,
  },

  percentContent: {
    borderRadius: 10,
    height: 10,
    backgroundColor: '#b2ebf2',
  },

  dotColor: {
    width: 8,
    height: 8,
  },

  titleModal: {
    position: 'absolute',
    textAlign: 'center',
    zIndex: -1,
    width: '100%',
    flex: 1,
  },
  text: {
    fontFamily: fontFamilys.regular,
    color: appColors.text,
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
    lineHeight: 20,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  buttonTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: appColors.primary,
    marginRight: 8,
  },

  buttonSelectDate: {
    flexDirection: 'row',
    flex: 1,

    alignItems: 'center',
    marginTop: 2,
  },
});
