import { YStack } from 'tamagui';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <YStack flex={1} padding={'$4'}>
      {children}
    </YStack>
  );
};
