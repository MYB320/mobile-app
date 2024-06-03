import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Image, Paragraph, Text, View, YStack, SizableText, XStack, Button } from 'tamagui';
import StarRating from '~/components/StarRating';
import { Container } from '~/tamagui.config';
import { getProduct } from '~/utils/fectch';
import { Product } from '~/utils/interface';
import { CartContext } from '~/utils/CartContext';

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const { cart, addProduct, removeProduct } = useContext(CartContext);

  useEffect(() => {
    (async () => {
      const oneProduct = await getProduct(Number(id));
      setProduct(oneProduct);
    })();
  });

  return (
    <>
      <Container>
        <YStack space={'$3'}>
          <Text fontSize={20} fontWeight={700}>
            {product?.title}
          </Text>
          <XStack justifyContent="space-between" alignItems="center">
            <XStack alignItems="center" gap="$2">
              <StarRating rating={product?.rating.rate as number} />
              <Text>
                {product?.rating.rate} ({product?.rating.count})
              </Text>
            </XStack>
            <XStack gap="$1" alignItems="flex-end">
              <Ionicons name="layers-outline" size={16} />
              <Text textDecorationLine="underline">{product?.category}</Text>
            </XStack>
          </XStack>
          <View alignItems="center" bg={'white'} p={'$2'} borderRadius={'$4'}>
            <Image source={{ uri: product?.image, width: 200, height: 200 }} resizeMode="contain" />
          </View>
          <XStack py="$2">
            <View>
              <SizableText color={'$blue10'} size={'$9'}>
                $ {product?.price}
              </SizableText>
            </View>
          </XStack>
          <YStack>
            <Text fontSize={18} fontWeight={500}>
              Description:
            </Text>
            <Paragraph size={'$3'} fontWeight={400}>
              {product?.description}
            </Paragraph>
          </YStack>
          <YStack pt={'$2'}>
            {cart.some((item) => item.id === product?.id) ? (
              <Button
                bg={'$red10'}
                color={'white'}
                pressStyle={{ backgroundColor: '$red9Dark' }}
                icon={() => <Ionicons name="close" color={'white'} size={20} />}
                onPress={() => removeProduct(product as Product)}>
                Remove From Cart
              </Button>
            ) : (
              <Button
                bg={'$blue10'}
                color={'white'}
                pressStyle={{ backgroundColor: '$blue9Dark' }}
                icon={() => <Ionicons name="cart-outline" color={'white'} size={20} />}
                onPress={() => addProduct(product as Product)}>
                Add To Cart
              </Button>
            )}
          </YStack>
        </YStack>
      </Container>
    </>
  );
}
