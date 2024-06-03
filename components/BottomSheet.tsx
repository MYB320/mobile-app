import { Adapt, Label, Select, Sheet, Text, YStack } from 'tamagui';
import React, { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function BottomSheet({
  open,
  setOpen,
  cat,
  setCat,
  limit,
  setLimit,
  sort,
  setSort,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cat: string;
  setCat: React.Dispatch<React.SetStateAction<string>>;
  limit: string;
  setLimit: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Sheet modal snapPoints={[42]} animation="quick" open={open} onOpenChange={setOpen}>
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame padding="$4" alignItems="flex-start" space="$5">
        <Text fontSize={20} fontWeight={600}>
          Filter
        </Text>
        <YStack width="100%" gap="$2">
          <Label htmlFor="Categories">Categories</Label>
          <Select id="Categories" value={cat} onValueChange={setCat}>
            <Select.Trigger>
              <Select.Value placeholder="Categories" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal snapPoints={[30]}>
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
              <Select.ScrollUpButton />

              <Select.Viewport minWidth={200}>
                <Select.Group>
                  <Select.Label>Categories</Select.Label>
                  {useMemo(
                    () =>
                      CategoriesItems.map((item, i) => {
                        return (
                          <Select.Item index={i} key={item.name} value={item.name.toLowerCase()}>
                            <Select.ItemText>{item.name}</Select.ItemText>
                            <Select.ItemIndicator marginLeft="auto">
                              <Ionicons name="checkmark" size={16} />
                            </Select.ItemIndicator>
                          </Select.Item>
                        );
                      }),
                    [CategoriesItems]
                  )}
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton />
            </Select.Content>
          </Select>
        </YStack>
        <YStack width="100%" gap="$2">
          <Label htmlFor="Limit">Limit</Label>
          <Select id="Limit" value={limit} onValueChange={setLimit}>
            <Select.Trigger disabled={cat != 'all'}>
              <Select.Value placeholder="Limit" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal snapPoints={[30]}>
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
              <Select.ScrollUpButton />

              <Select.Viewport minWidth={200}>
                <Select.Group>
                  <Select.Label>Limit</Select.Label>
                  {useMemo(
                    () =>
                      limitItems.map((item, i) => {
                        return (
                          <Select.Item index={i} key={item.name} value={item.name.toLowerCase()}>
                            <Select.ItemText>{item.name}</Select.ItemText>
                            <Select.ItemIndicator marginLeft="auto">
                              <Ionicons name="checkmark" size={16} />
                            </Select.ItemIndicator>
                          </Select.Item>
                        );
                      }),
                    [limitItems]
                  )}
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton />
            </Select.Content>
          </Select>
        </YStack>
        <YStack width="100%" gap="$2">
          <Label htmlFor="Sort">Sort</Label>
          <Select id="Sort" value={sort} onValueChange={setSort}>
            <Select.Trigger disabled={cat != 'all'}>
              <Select.Value placeholder="Sort" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal snapPoints={[25]}>
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
              <Select.ScrollUpButton />

              <Select.Viewport minWidth={200}>
                <Select.Group>
                  <Select.Label>Sort</Select.Label>
                  {useMemo(
                    () =>
                      SortItems.map((item, i) => {
                        return (
                          <Select.Item index={i} key={item.name} value={item.value.toLowerCase()}>
                            <Select.ItemText>{item.name}</Select.ItemText>
                            <Select.ItemIndicator marginLeft="auto">
                              <Ionicons name="checkmark" size={16} />
                            </Select.ItemIndicator>
                          </Select.Item>
                        );
                      }),
                    [SortItems]
                  )}
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton />
            </Select.Content>
          </Select>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
const CategoriesItems = [
  { name: 'all' },
  { name: 'electronics' },
  { name: 'jewelery' },
  { name: "men's clothing" },
  { name: "women's clothing" },
];
const limitItems = [{ name: '30' }, { name: '20' }, { name: '15' }, { name: '10' }, { name: '5' }];

const SortItems = [
  { name: 'Ascending', value: 'asc' },
  { name: 'Descending', value: 'desc' },
];
