import React, { useContext, useEffect, useReducer } from 'react';
import { Image, XStack, Text, View, YStack, Button } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { Product } from '~/utils/interface';
import { CartContext } from '~/utils/CartContext';

const reducer = (state: any, action: any) => {
  if (action.type === 'INCREASE') {
    return {
      ...state,
      Quantite: state.Quantite + 1,
    };
  } else if (action.type === 'DECREASE') {
    if (state.Quantite == 1) {
      return state;
    }
    return {
      ...state,
      Quantite: state.Quantite - 1,
    };
  }
};

export default function CartCard({ product }: { product: Product }) {
  const { cart, setCart } = useContext(CartContext);

  const [state, dispatch] = useReducer(reducer, product);

  useEffect(() => {
    const newArr = cart.map((itemArr) => {
      itemArr.id == product.id && (product.Quantite = state.Quantite);
      return itemArr;
    });
    setCart(newArr);
  }, [state]);

  const windowWidth = Dimensions.get('window').width;

  return (
    <XStack bg="white" borderRadius="$4" p="$4">
      <View my="auto" pr="$4">
        <Image
          source={{
            uri: product.image,
            width: 50,
            height: 70,
          }}
          resizeMode="contain"
        />
      </View>
      <View width={windowWidth - 136}>
        <YStack space="$2">
          <Text fontSize={16} fontWeight={'500'} numberOfLines={2}>
            {product.title}
          </Text>
          <XStack gap={'$1'} alignItems={'center'}>
            <Ionicons name="layers-outline" size={14} />
            <Text>{product.category}</Text>
          </XStack>
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize={20} textAlign="center" fontWeight={'700'}>
              $ {(product.price * (product.Quantite as number)).toFixed(2)}
            </Text>
            <XStack alignItems="center" space="$2" pr="$4">
              <Button
                size="$2"
                circular
                icon={() => <Ionicons name="add" size={18} />}
                disabled={product.Quantite === 100}
                onPress={() => dispatch({ type: 'INCREASE' })}
              />
              <Text fontSize={16}>{product.Quantite}</Text>
              <Button
                size="$2"
                circular
                disabled={product.Quantite === 1}
                icon={() => <Ionicons name="remove" size={18} />}
                onPress={() => dispatch({ type: 'DECREASE' })}
              />
            </XStack>
          </XStack>
        </YStack>
      </View>
    </XStack>
  );
}
