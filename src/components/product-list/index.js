import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import ProductListItem from '../product-list-item'

class ProductList extends Component {
    //
    static options = {
        addGlobalClass: true
    }
    render() {
        const { data: products } = this.props
        return (
            <View className='p-3'>
                {
                    products.map(product =>
                        <ProductListItem key={product.id} data={product} />
                    )
                }
            </View>
        )
    }
}

export default ProductList