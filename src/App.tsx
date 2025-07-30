import React, { useEffect, useState } from "react";
import { StatusBar as RNStatusBar, Platform, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { registerRootComponent } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { store } from "./redux/store";
import AppNavigator from "./router/AppNavigator";
import { checkESSAuthStatus } from "./redux/actions/authESS";

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
        store.dispatch(checkESSAuthStatus());
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
