import React, { ElementType, ReactNode } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextProps,
  View,
  ViewStyle,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Message from './components/Message';

export type ColorScheme = {
  color: string;
  backgroundColor: string;
};

export type Theme = {
  success: ColorScheme;
  info: ColorScheme;
  error: ColorScheme;
};

export type Icon = {
  success: ReactNode;
  info: ReactNode;
  error: ReactNode;
};

export type Props = {
  containerStyle?: ViewStyle;
  messageContainerStyle?: ViewStyle;
  messageWrapperStyle?: ViewStyle;
  messageStyle?: ViewStyle;
  contentsWrapperStyle?: ViewStyle;
  titleProps?: TextProps & { [key: string]: any };
  contentsProps?: TextProps & { [key: string]: any };
  titleComponent: ElementType;
  contentsComponent: ElementType;
  theme: Theme;
  icons: Icon;
  visibleProgress: boolean;
};

export type Type = 'success' | 'info' | 'error';

export type Stack = {
  id: string;
  type: Type;
  title: string;
  contents: string;
  duration?: number;
};

export type Options = {
  type: Type;
  title: string;
  contents: string;
  duration?: number;
};

type S = {
  stacks: Stack[];
};

class StackFlashMessage extends React.Component<Props, S> {
  static defaultProps: Props = {
    theme: {
      success: {
        color: 'blue',
        backgroundColor: 'white',
      },
      info: {
        color: 'green',
        backgroundColor: 'white',
      },
      error: {
        color: 'red',
        backgroundColor: 'white',
      },
    },
    icons: {
      success: (
        <Image
          source={require('./assets/success.png')}
          style={{ width: 20, height: 20 }}
        />
      ),
      info: (
        <Image
          source={require('./assets/info.png')}
          style={{ width: 20, height: 20 }}
        />
      ),
      error: (
        <Image
          source={require('./assets/error.png')}
          style={{ width: 20, height: 20 }}
        />
      ),
    },
    titleComponent: Text,
    contentsComponent: Text,
    visibleProgress: true,
  };

  static _ref: StackFlashMessage | null = null;

  static setRef(ref: StackFlashMessage | null) {
    StackFlashMessage._ref = ref;
  }

  static show(options: Options) {
    if (StackFlashMessage._ref) {
      const ref = StackFlashMessage._ref;

      ref.setState(({ stacks }) => ({
        stacks: [
          {
            id: Math.random().toString(36).substr(2),
            ...options,
          },
          ...stacks,
        ],
      }));
    }
  }

  state: S = {
    stacks: [],
  };

  removeStack(stack: Stack) {
    this.setState(({ stacks }) => ({
      stacks: stacks.filter((value) => value.id !== stack.id),
    }));
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        {this.state.stacks.map((stack) => (
          <Message
            key={stack.id}
            stack={stack}
            theme={this.props.theme}
            icons={this.props.icons}
            removeStack={this.removeStack.bind(this)}
            messageContainerStyle={this.props.messageContainerStyle}
            messageWrapperStyle={this.props.messageWrapperStyle}
            messageStyle={this.props.messageStyle}
            contentsWrapperStyle={this.props.contentsWrapperStyle}
            titleProps={this.props.titleProps}
            contentsProps={this.props.contentsProps}
            titleComponent={this.props.titleComponent}
            contentsComponent={this.props.contentsComponent}
            visibleProgress={this.props.visibleProgress}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: '5%',
    right: '5%',
    marginVertical: -5,
    zIndex: 1050,
  },
});

export default StackFlashMessage;
