import { Center, Skeleton, VStack } from 'native-base'

export const ProductSkeleton = () => {
  return <Center w='100%'>
    <VStack w='90%' p='4' maxW='400' borderWidth='1' space={8} overflow='hidden' rounded='md' _dark={{
      borderColor: 'coolGray.900'
    }} _light={{
      borderColor: 'coolGray.900'
    }}>
      <Skeleton h='40' />
      <Skeleton.Text px='4' />
      {/* <Skeleton px='4' my='4' rounded='full' startColor='green.900' /> */}
    </VStack>
  </Center>
}