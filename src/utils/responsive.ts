import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const guideLineBaseWidth = 375;
const guideLineBaseHeight = 812;

//width, marginLeft, marginRight, marginHorizontal,paddingLeft, paddingRight, paddingHorizontal
const horizontalScale = (size: number) => (width / guideLineBaseWidth) * size;

// height, marginTop, marginBottom, marginVertical, lineHeight, paddingTop, paddingBottom, paddingVertical
const verticalScale = (size: number) => (height / guideLineBaseHeight) * size;

//fontSize, borderRadius
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export {horizontalScale, verticalScale, moderateScale};
