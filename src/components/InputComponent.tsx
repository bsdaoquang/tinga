import {Eye, EyeSlash} from 'iconsax-react-native';
import React, {ReactNode, useState} from 'react';
import {
  KeyboardTypeOptions,
  Platform,
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextComponent} from '.';
import {appColors} from '../constants/appColors';
import {appSize} from '../constants/appSize';
import {fontFamilys} from '../constants/fontFamily';

interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (val: string) => void;
  flex?: number;
  clear?: boolean;
  show?: boolean;
  type?: KeyboardTypeOptions;
  required?: boolean;
  isSecure?: boolean;
  onEnd?: () => void;
  helpText?: string;
  color?: string;
  prefix?: ReactNode;
  affix?: ReactNode;
  isCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  setIsShowPass?: (val: boolean) => void;
  height?: number;
  autoFocus?: boolean;
  styles?: StyleProp<ViewStyle>;
  disable?: boolean;
  inputStyles?: StyleProp<TextStyle>;
  isMultible?: boolean;
  rows?: number;
  max?: number;
  autoComplete?:
    | 'birthdate-day'
    | 'birthdate-full'
    | 'birthdate-month'
    | 'birthdate-year'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-day'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'gender'
    | 'name'
    | 'name-family'
    | 'name-given'
    | 'name-middle'
    | 'name-middle-initial'
    | 'name-prefix'
    | 'name-suffix'
    | 'password'
    | 'password-new'
    | 'postal-address'
    | 'postal-address-country'
    | 'postal-address-extended'
    | 'postal-address-extended-postal-code'
    | 'postal-address-locality'
    | 'postal-address-region'
    | 'postal-code'
    | 'street-address'
    | 'sms-otp'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-device'
    | 'username'
    | 'username-new'
    | 'off'
    | undefined;
  ref?: any;
  readOnly?: boolean;
}

export const InputComponent = (props: Props) => {
  const [isFocus, setIsFocus] = useState(false);

  const {
    label,
    placeholder,
    value,
    onChange,
    flex,
    clear,
    show,
    type,
    isSecure,
    onEnd,
    helpText,
    setIsShowPass,
    color,
    prefix,
    affix,
    isCapitalize,
    height,
    autoFocus,
    styles,
    autoComplete,
    disable,
    inputStyles,
    isMultible,
    rows,
    ref,
    readOnly,
    max,
  } = props;

  return (
    <View style={[{marginBottom: 16, flex: flex ?? 0}, styles]}>
      {label && <TextComponent text={label} styles={{marginBottom: 4}} />}
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 14,
            paddingHorizontal: 16,
            borderWidth: 2,
            borderColor: isFocus ? '#ABC43F' : '#EEF3DC',
            paddingVertical: Platform.OS === 'ios' ? 14 : 8,
            minHeight: height ?? 40,
            backgroundColor: disable
              ? appColors.gray
              : color ?? appColors.white,
          },
        ]}>
        {prefix && prefix}
        <TextInput
          ref={ref}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={value}
          onChangeText={val => onChange(val)}
          placeholder={placeholder ? placeholder : label}
          secureTextEntry={isSecure ? !show : false}
          placeholderTextColor={appColors.gray}
          keyboardType={type ? type : 'default'}
          maxLength={max}
          style={[
            {
              flex: 1,
              margin: 0,
              padding: 0,
              // paddingVertical: 4,
              color: appColors.text2,
              fontFamily: fontFamilys.medium,
              marginLeft: prefix ? 10 : 0,
              fontSize: appSize.textSize,
            },
            {
              textAlignVertical: isMultible ? 'top' : 'center',
              height: '100%',
            },
            inputStyles,
          ]}
          autoCapitalize={isCapitalize}
          onEndEditing={onEnd}
          autoFocus={autoFocus}
          autoComplete={autoComplete ?? 'off'}
          editable={disable ? false : true}
          multiline={isMultible}
          numberOfLines={rows && isMultible ? rows : 1}
        />

        {affix && affix}

        {isSecure && setIsShowPass ? (
          <TouchableOpacity onPress={show => setIsShowPass(true)}>
            {show ? (
              <EyeSlash size={18} color={appColors.gray} />
            ) : (
              <Eye size={18} color={appColors.gray} />
            )}
          </TouchableOpacity>
        ) : null}

        {clear ? (
          <TouchableOpacity
            onPress={() => {
              onChange('');
            }}>
            <AntDesign name="close" size={18} color={appColors.gray} />
          </TouchableOpacity>
        ) : null}
      </View>

      {helpText ? (
        <TextComponent
          text={helpText}
          color={appColors.error}
          size={12}
          flex={0}
        />
      ) : null}
    </View>
  );
};
