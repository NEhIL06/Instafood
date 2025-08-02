import { View, Text , FlatList} from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '@/lib/useAppwrite'
import { getCategories, getMenu } from '@/lib/appwrite'
import { useLocalSearchParams } from 'expo-router'
import CartButton from '@/components/CartButton'
import { SearchBar } from 'react-native-screens'
import { MenuItem } from '@/type'
import cn from "clsx";
import MenuCard from '@/components/MenuCart'
import Filter from '@/components/Filters'


const Search = () => {

  const {category,query} = useLocalSearchParams<{query:string,category:string}>(); //just

  //menus la re
  const {data,refetch,loading} = useAppwrite({
    fn:getMenu,
    params:{  
      category,
      query,
      limit:6
    },
    skip:false
  })

  //the useApwrite Hook reduced the number of API calls to the database and it updates the data as the query changes


  //catergories la re
  const {data:categories} = useAppwrite({
    fn:getCategories,
  })

  useEffect(() => {
    refetch({category,query,limit:6});
  },[category,query]);

  return (
    <SafeAreaView className="bg-white h-full">
    <FlatList
        data={data}
        renderItem={({ item, index }) => {
            const isFirstRightColItem = index % 2 === 0;

            return (
                <View className={cn("flex-1 max-w-[48%]", !isFirstRightColItem ? 'mt-10': 'mt-0')}>
                    <MenuCard item={item as MenuItem} />
                </View>
            )
        }}
        keyExtractor={(item: { $id: any }) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
            <View className="my-5 gap-5">
                <View className="flex-between flex-row w-full">
                    <View className="flex-start">
                        <Text className="small-bold uppercase text-primary">Search</Text>
                        <View className="flex-start flex-row gap-x-1 mt-0.5">
                            <Text className="paragraph-semibold text-dark-100">Find your favorite food</Text>
                        </View>
                    </View>

                    <CartButton />
                </View>

                <SearchBar />

                <Filter categories={categories!}/>
            </View>
        )}
        ListEmptyComponent={() => !loading && <Text>No results</Text>}
    />
</SafeAreaView>
  )
}

export default Search