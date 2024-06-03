import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { TamaguiProvider, XStack } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import config from '../tamagui.config';
import CartProvider from '~/utils/CartContext';

export default function Layout() {
  const router = useRouter();
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider defaultTheme="light" config={config}>
      <CartProvider>
        <Stack>
          <Stack.Screen name="products/[id]" options={{ title: '' }} />
          <Stack.Screen name="cart" options={{ title: 'My Cart' }} />
        </Stack>
      </CartProvider>
    </TamaguiProvider>
  );
}
