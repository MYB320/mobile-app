import { Button, Card, Text, XStack, YStack, Image } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { Product } from '~/utils/interface';
import { Link } from 'expo-router';
import { CartContext } from '~/utils/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { cart, addProduct, removeProduct } = useContext(CartContext);

  return (
    <Link href={`/products/${product.id}`} asChild>
      <Card backgroundColor={'white'} scale={0.9} pressStyle={{ scale: 0.975 }}>
        <Card.Header alignItems="center">
          <Image
            resizeMode="contain"
            width="100%"
            source={{
              uri: product.image,
              width: 150,
              height: 170,
            }}
          />
        </Card.Header>
        <Card.Footer>
          <YStack space={'$2'} p={'$3'}>
            <XStack gap={'$1'} alignItems={'center'}>
              <Ionicons name="layers-outline" size={14} />
              <Text fontWeight={'600'}>{product.category}</Text>
            </XStack>
            <Text fontSize={18} fontWeight={'700'} numberOfLines={1}>
              {product.title}
            </Text>
            <Text color={'$gray10Dark'} numberOfLines={2}>
              {product.description}
            </Text>
            <XStack justifyContent="space-between" alignItems="flex-end">
              <YStack>
                <Text fontSize={12} textAlign="left" fontWeight={'600'}>
                  Price
                </Text>
                <Text fontSize={22} textAlign="center" fontWeight={'700'}>
                  $ {product.price}
                </Text>
              </YStack>
              {cart.some((item) => item.id === product.id) ? (
                <Button
                  size={'$2'}
                  backgroundColor={'$red10'}
                  icon={() => <Ionicons name="close" size={20} />}
                  onPress={() => removeProduct(product)}
                />
              ) : (
                <Button
                  size={'$2'}
                  icon={() => <Ionicons name="cart-outline" size={20} />}
                  onPress={() => addProduct(product)}
                />
              )}
            </XStack>
          </YStack>
        </Card.Footer>
      </Card>
    </Link>
  );
}
