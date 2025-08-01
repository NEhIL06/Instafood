
import {View, Text, FlatList, Pressable, TouchableOpacity, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, offers } from '@/constant';
import { Fragment } from 'react';
import { Image } from 'expo-image';
import cn from 'clsx';
import CartButton from '@/components/CartButton';
import * as Sentry from '@sentry/react-native'; 

export default function HomeScreen() {
  
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <FlatList 
      data={offers} 
      renderItem={({item,index})=>{
        const isEven:boolean = index % 2 === 0;
        return (
          <View>

            <Pressable 
              className={cn("w-full h-48 my-3 rounded-xl overflow-hidden shadow-lg flex items-center gap-5", isEven ? "flex-row-reverse":"flex-row")} 
              style={{backgroundColor: item.color}}
              android_ripple={{color:"#fffff22"}}
            >
              {({pressed})=>(
                <Fragment>
                  <View className={'h-full w-1/2'}>
                    <Image source={item.image} className={"size-full"} responsivePolicy={'live'} />
                  </View>

                  <View className={cn('flex-1 h-full flex flex-col justify-center items-start gap-4', isEven ?"pl-10":"pr-10")}>
                    <Text className='h1-bold text-white leading-tight '>
                      {item.title}
                    </Text>
                    <Image 
                      source={images.arrowRight}
                      className='size-10'
                      contentFit='contain'
                      tintColor={"ffffff"}
                    />
                  </View>
                </Fragment>
              )}

            </Pressable>
          </View>
        )
      }}
      contentContainerClassName="pb-28 px-5"
      ListHeaderComponent={()=>(
        <View className='flex-between flex-row w-full my-5'>
        <View className='flex-start'>
          <Text className='small-bold fixed-primary'>DELIVER TO</Text>
          <TouchableOpacity className='"flex-center flex-row gap-x-1 mt-0.5'>
            <Text className='paragraph-bold text-dark-100'>INDIA</Text>
            <Image source={images.arrowDown} className='size-5' contentFit='contain' tintColor={"#000000"} style={{marginLeft:5}}/>
          </TouchableOpacity>
        </View>
        <CartButton/> 
      </View>
      )}
      ListFooterComponent={()=>(
        <Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
      )}
      
      />
    </SafeAreaView>
  );
}

