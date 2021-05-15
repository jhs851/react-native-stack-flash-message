import { requireNativeComponent, ViewStyle } from 'react-native';

type StackFlashMessageProps = {
  color: string;
  style: ViewStyle;
};

export const StackFlashMessageViewManager = requireNativeComponent<StackFlashMessageProps>(
'StackFlashMessageView'
);

export default StackFlashMessageViewManager;
