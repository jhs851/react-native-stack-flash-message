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

export type Theme = {
  success: string;
  info: string;
  error: string;
};

export type Icon = {
  success: ReactNode;
  info: ReactNode;
  error: ReactNode;
};

export type Props = {
  containerStyles?: ViewStyle;
  contentsWrapperStyles?: ViewStyle;
  titleProps?: TextProps & { [key: string]: any };
  contentsProps?: TextProps & { [key: string]: any };
  titleComponent: ElementType;
  contentsComponent: ElementType;
  theme: Theme;
  icons: Icon;
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
      success: 'blue',
      info: 'green',
      error: 'red',
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
      <View style={[styles.container, this.props.containerStyles]}>
        {this.state.stacks.map((stack) => (
          <Message
            key={stack.id}
            stack={stack}
            theme={this.props.theme}
            icons={this.props.icons}
            removeStack={this.removeStack.bind(this)}
            contentsWrapperStyles={this.props.contentsWrapperStyles}
            titleProps={this.props.titleProps}
            contentsProps={this.props.contentsProps}
            titleComponent={this.props.titleComponent}
            contentsComponent={this.props.contentsComponent}
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
