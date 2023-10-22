# react-native-stack-flash-message

React Native 를 위한 Stack Flash Message 컴포넌트

## Features

- 하나의 플래시 메세지 컴포넌트를 모든 컴포넌트들에서 호출할 수 있습니다
- 쌓이는 플래쉬 메세지를 보여줍니다
- 사용자에게 시스템 메세지를 여러 개 보여줄 수 있습니다
- 메세지 내의 아이콘을 설정할 수 있고, 메세지의 테마를 지정할 수 있습니다

## Demo

| iOS | Android |
| --- | --- |
| ![iOS Demo](https://user-images.githubusercontent.com/23352881/118910930-4628a580-b960-11eb-9394-cf59bf810678.gif) | ![Android Demo](https://user-images.githubusercontent.com/23352881/118910922-43c64b80-b960-11eb-92af-93d638383fad.gif) |

## Installation

```sh
yarn add react-native-stack-flash-message
```

또는

```sh
npm install react-native-stack-flash-message
```

## Usage

```js
// ...
import StackFlashMessage from 'react-native-stack-flash-message';

const App: React.FC = () => {
  const flash = (options: Options) => {
    StackFlashMessage.show(options);
  };
  const successFlash = () => {
    flash({
      type: 'success',
      title: '안녕!',
      contents: '이 곳에 내용을 입력해봐!',
      duration: Math.random() * 1000,
    });
  };
  const infoFlash = () => {
    flash({
      type: 'info',
      title: '안녕!',
      contents: '이 곳에 내용을 입력해봐!',
    });
  };
  const errorFlash = () => {
    flash({
      type: 'error',
      title: '안녕!',
      contents: '이 곳에 내용을 입력해봐!',
    });
  };

  return (
    <SafeAreaView>
      <StackFlashMessage
        ref={(ref) => StackFlashMessage.setRef(ref)}
      />

      <TouchableOpacity onPress={successFlash}>
        <Text>Success 플래시 메세지</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={infoFlash}>
        <Text>Info 플래시 메세지</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={errorFlash}>
        <Text>Error 플래시 메세지</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
```

### Props

| 이름                                                                 | 기본값                                                            | 설명                        |
|--------------------------------------------------------------------|----------------------------------------------------------------|---------------------------|
| `containerStyle?: ViewStyle`                                       | `undefined`                                                    | 메세지들을 감싸고 있는 Node의 스타일    |
| `messageContainerStyle?: ViewStyle`                                | `undefined`                                                    | 메세지 전체를 감싸고 있는 Node의 스타일  |
| `messageWrapperStyle?: ViewStyle`                                  | `undefined`                                                    | 메세지를 감싸고 있는 Node의 스타일     |
| `messageStyle?: ViewStyle`                                         | `undefined`                                                    | 메세지 Node의 스타일             |
| `contentsWrapperStyle?: ViewStyle`                                 | `undefined`                                                    | 제목 및 설명을 감싸고 있는 Node의 스타일 |
| `titleProps?: TextProps & { [key: string]: any }`                  | `undefined`                                                    | 제목의 props                 |
| `contentsProps?: TextProps & { [key: string]: any }`               | `undefined`                                                    | 설명의 props                 |
| `titleComponent?: ElementType`                                     | `Text`                                                         | 제목 컴포넌트                   |
| `contentsComponent?: ElementType`                                  | `Text`                                                         | 설명 컴포넌트                   |
| `theme?: { success: string, info: string, error: string }`         | `{ success: 'blue', info: 'green', error: 'red' }`             | 메세지들의 테마                  |
| `icon?: { success: ReactNode, info: ReactNode, error: ReactNode }` | `{ success: Image 컴포넌트, info: Image 컴포넌트, error: Image 컴포넌트 }` | 테마별 메세지의 아이콘              |
| `visibleProgress?: boolean`                                        | `true`                                                         | Progress 노출 여부            |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
