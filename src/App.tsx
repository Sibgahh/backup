import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform, StatusBar as RNStatusBar, View } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { checkAuthStatus } from "./redux/actions/authActions";
import { store } from "./redux/store";
import AppNavigator from "./router/AppNavigator";
SplashScreen.preventAutoHideAsync();

function App(): React.JSX.Element {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await Font.loadAsync({
          "Lato-Regular": require("./assets/fonts/Lato/Lato-Regular.ttf"),
          "Lato-Bold": require("./assets/fonts/Lato/Lato-Bold.ttf"),
          "Lato-Light": require("./assets/fonts/Lato/Lato-Light.ttf"),
          "Lato-Thin": require("./assets/fonts/Lato/Lato-Thin.ttf"),
          "Lato-Black": require("./assets/fonts/Lato/Lato-Black.ttf"),
          "Lato-Italic": require("./assets/fonts/Lato/Lato-Italic.ttf"),
          "Lato-BoldItalic": require("./assets/fonts/Lato/Lato-BoldItalic.ttf"),
          "Lato-LightItalic": require("./assets/fonts/Lato/Lato-LightItalic.ttf"),
          "Lato-ThinItalic": require("./assets/fonts/Lato/Lato-ThinItalic.ttf"),
          "Lato-BlackItalic": require("./assets/fonts/Lato/Lato-BlackItalic.ttf"),
        });

        // Set native status bar to translucent globally
        if (Platform.OS === "android") {
          RNStatusBar.setTranslucent(true);
        }

        // Check auth status
        store.dispatch(checkAuthStatus());
      } catch (e) {
        console.warn("Error loading fonts:", e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" translucent={true} />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

registerRootComponent(App);
export default App;
