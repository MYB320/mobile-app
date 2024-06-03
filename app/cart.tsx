import { useContext } from 'react';
import { ScrollView, View, Text, YStack, Button, XStack } from 'tamagui';
import CartCard from '~/components/CartCard';
import { Container } from '~/components/Container';
import { CartContext } from '~/utils/CartContext';

export default function cart() {
  const { cart, setCart } = useContext(CartContext);

  const totalSubPrice = cart
    .reduce((total, product) => {
      return total + product.price * (product.Quantite as number);
    }, 0)
    .toFixed(2);

  return (
    <>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false} space={'$2'}>
          {cart.map((product) => (
            <CartCard product={product} key={product.id} />
          ))}
        </ScrollView>
      </Container>
      <YStack bottom={0} p="$4" bg="white" space="$4" elevation="$2">
        <XStack justifyContent="space-between">
          <Text fontWeight={500}>
            Total Price{' '}
            <Text fontSize={10} fontWeight={300}>
              (+ 50 $ for delovery)
            </Text>
          </Text>
          <Text fontSize={18} fontWeight={700}>
            $ {Number(totalSubPrice) === 0 ? '0.00' : (Number(totalSubPrice) + 50).toFixed(2)}
          </Text>
        </XStack>
        <Button disabled={cart.length === 0}>Check Out</Button>
      </YStack>
    </>
  );
}
