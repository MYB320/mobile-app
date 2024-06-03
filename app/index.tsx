import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Input, ScrollView, Spinner, View, XStack, YStack } from 'tamagui';
import { Container } from '~/components/Container';
import ProductCard from '~/components/ProductCard';
import { getProducts, getProductsByCategory } from '~/utils/fectch';
import { Product } from '~/utils/interface';
import { TouchableOpacity } from 'react-native';
import BottomSheet from '~/components/BottomSheet';

export default function Home() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [cat, setCat] = useState('all');
  const [limit, setLimit] = useState('30');
  const [sort, setSort] = useState('asc');

  const ProductsFilter = products.filter((product) =>
    product.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const fetchProducts = async (cat: string, limit?: number, sort?: string) => {
    const allProducts = await (cat === 'all'
      ? getProducts(limit, sort)
      : getProductsByCategory(cat));
    setProducts(allProducts);
  };
  useEffect(() => {
    fetchProducts(cat, Number(limit), sort);
  }, [setProducts, cat, limit, sort]);
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Weasy Shop',
          headerRight: () => (
            <XStack gap={'$4'}>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Ionicons name="filter-outline" size={22} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/cart')}>
                <Ionicons name="cart-outline" size={22} />
              </TouchableOpacity>
            </XStack>
          ),
        }}
      />
      <Container>
        <View pb={'$4'}>
          <XStack alignItems="center" space="$1">
            <Input
              flex={1}
              value={searchValue}
              onChangeText={setSearchValue}
              placeholder={`Search...`}
            />
            <Button
              theme={'blue'}
              icon={() => <Ionicons name="search" size={18} />}
              onPress={() =>
                searchValue.length === 0
                  ? fetchProducts(cat, Number(limit), sort)
                  : setProducts(ProductsFilter)
              }
            />
          </XStack>
        </View>
        {products.length === 0 ? (
          <Spinner size="large" color={'$blue10'} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} px={'$2'} space={'$2'}>
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </ScrollView>
        )}
      </Container>
      <BottomSheet
        open={open}
        setOpen={setOpen}
        cat={cat}
        setCat={setCat}
        limit={limit}
        setLimit={setLimit}
        sort={sort}
        setSort={setSort}
      />
    </>
  );
}
