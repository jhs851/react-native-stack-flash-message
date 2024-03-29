import React, { createElement, ElementType } from 'react';
import {
  Animated,
  StyleSheet,
  TextProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import type {
  ColorScheme,
  Icon,
  Stack,
  Theme,
} from 'react-native-stack-flash-message';

type P = {
  stack: Stack;
  theme: Theme;
  icons: Icon;
  removeStack: (stack: Stack) => void;
  titleComponent: ElementType;
  contentsComponent: ElementType;
  visibleProgress: boolean;
  messageContainerStyle?: ViewStyle;
  messageWrapperStyle?: ViewStyle;
  messageStyle?: ViewStyle;
  contentsWrapperStyle?: ViewStyle;
  titleProps?: TextProps & { [key: string]: any };
  contentsProps?: TextProps & { [key: string]: any };
};

type S = {
  containerAnimated: Animated.Value;
  progressAnimated: Animated.Value;
  progressing: boolean;
};

class Message extends React.Component<P, S> {
  state: S = {
    containerAnimated: new Animated.Value(0),
    progressAnimated: new Animated.Value(0),
    progressing: true,
  };

  componentDidMount() {
    Animated.timing(this.state.containerAnimated, {
      toValue: 1,
      useNativeDriver: false,
    }).start(() => {
      this.setState({ progressing: false });
    });

    Animated.timing(this.state.progressAnimated, {
      toValue: 1,
      duration: this.getDuration(),
      useNativeDriver: false,
    }).start(this.hide.bind(this));
  }

  hide() {
    this.setState({ progressing: true }, () => {
      Animated.timing(this.state.containerAnimated, {
        toValue: 0,
        useNativeDriver: false,
      }).start(() => this.props.removeStack(this.props.stack));
    });
  }

  getDuration(): number {
    const { duration } = this.props.stack;

    if (duration && duration >= 1000) {
      return duration;
    }

    return 3000;
  }

  render() {
    const {
      stack,
      titleProps,
      contentsProps,
      titleComponent,
      contentsComponent,
    } = this.props;
    const theme = this.props.theme[stack.type];
    const icon = this.props.icons[stack.type];

    return (
      <View style={[styles.container, this.props.messageContainerStyle]}>
        <Animated.View
          style={[
            wrapperStyles(theme),
            this.props.messageWrapperStyle,
            {
              opacity: this.state.containerAnimated,
              marginTop: this.state.containerAnimated.interpolate({
                inputRange: [0, 1],
                outputRange: [-150, 0],
              }),
            },
          ]}
        >
          <TouchableOpacity
            onPress={this.hide.bind(this)}
            style={[messageStyles(theme), this.props.messageStyle]}
            disabled={this.state.progressing}
          >
            {!!icon && <View style={styles.iconWrapper}>{icon}</View>}

            <View
              style={[styles.contentsWrapper, this.props.contentsWrapperStyle]}
            >
              {createElement(
                titleComponent,
                {
                  ...titleProps,
                  style: [styles.title, titleProps?.style],
                },
                stack.title
              )}

              {createElement(
                contentsComponent,
                {
                  ...contentsProps,
                  style: [styles.contents, contentsProps?.style],
                },
                stack.contents
              )}
            </View>
          </TouchableOpacity>

          {this.props.visibleProgress && (
            <Animated.View
              style={[
                progressStyles(theme),
                {
                  right: this.state.progressAnimated.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          )}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    overflow: 'hidden',
    borderRadius: 6,
    backgroundColor: '#fff',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconWrapper: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  contentsWrapper: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 3,
  },
  contents: {
    fontSize: 10,
  },
});

const wrapperStyles = (theme: ColorScheme): ViewStyle => ({
  overflow: 'hidden',
  borderRadius: 6,
  backgroundColor: theme.backgroundColor,
  marginVertical: 5,
});

const messageStyles = (theme: ColorScheme): ViewStyle => ({
  flexDirection: 'row',
  borderLeftWidth: 5,
  borderColor: theme.color,
  minHeight: 60,
  alignItems: 'center',
  paddingVertical: 10,
  paddingRight: 10,
});

const progressStyles = (theme: ColorScheme): ViewStyle => ({
  position: 'absolute',
  bottom: 0,
  left: 5,
  backgroundColor: theme.color,
  height: 1,
});

export default Message;
