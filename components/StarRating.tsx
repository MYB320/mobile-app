import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, XStack } from 'tamagui';

interface RatingStarsProps {
  rating: number;
}

const StarRating: React.FC<RatingStarsProps> = ({ rating }) => {
  const starElements = [];

  for (let i = 0; i < 5; i++) {
    if (rating >= i + 1) {
      starElements.push(<Ionicons name="star-sharp" color={'yellow'} key={i} size={20} />);
    } else {
      starElements.push(<Ionicons name="star-outline" color={'yellow'} key={i} size={20} />);
    }
  }

  return (
    <XStack alignItems="center" justifyContent="center">
      {starElements.map((star, index) => (
        <View key={index}>{star}</View>
      ))}
    </XStack>
  );
};

export default StarRating;
