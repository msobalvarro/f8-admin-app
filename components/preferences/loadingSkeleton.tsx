import { Skeleton, VStack } from 'native-base';

export const LoadingSekeleton = () => (
  <VStack w='90%' p='4' maxW='400' borderWidth='1' space={8} overflow='hidden' rounded='md' _dark={{
    borderColor: 'coolGray.900'
  }} _light={{
    borderColor: 'coolGray.900'
  }}>
    <Skeleton.Text px='4' />
  </VStack>
)