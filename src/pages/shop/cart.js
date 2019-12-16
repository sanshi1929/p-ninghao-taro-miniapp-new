import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class ShopCart extends Component {
    config = {
        navigationBarTitelText: '购物袋'
    }
    render() {
        return (
            <View>
                <View className='page-demo'>
                    ShopCart
                </View>
            </View>
        )
    }
}

export default ShopCart