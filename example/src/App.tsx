import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import StackFlashMessageViewManager, {
  Options,
} from 'react-native-stack-flash-message';

const App: React.FC = () => {
  const flash = (options: Options) => {
    StackFlashMessageViewManager.show(options);
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
    <SafeAreaView style={styles.container}>
      <StackFlashMessageViewManager
        ref={(ref) => StackFlashMessageViewManager.setRef(ref)}
      />

      <TouchableOpacity onPress={successFlash} style={buttonStyles('blue')}>
        <Text style={styles.text}>Success 플래시 메세지</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={infoFlash} style={buttonStyles('green')}>
        <Text style={styles.text}>Info 플래시 메세지</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={errorFlash} style={buttonStyles('red')}>
        <Text style={styles.text}>Error 플래시 메세지</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

const buttonStyles = (backgroundColor: string): ViewStyle => ({
  width: 150,
  height: 40,
  backgroundColor,
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 8,
});

export default App;
