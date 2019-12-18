import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import fetchData from '../../utilities/fetch-data'
import Placeholder from '../../components/placeholder'
import ErrorPage from '../../components/error-page'
import ProductPageCard from '../../components/product-page-card'
import ProductPageTab from '../../components/product-page-tab'
import ProductPageTabBar from '../../components/product-page-tab-bar'
import MaterialIcon from '../../components/material-icon'

class ProductShow extends Component {
    config = {
        navigationBarTitleText: 'ProductShow',
        enablePullDownRefresh: true,
        setBackgroundTextStyle: 'dark'
    }

    state = {
        product: {},
        placeholder: true,
        serviceError: false,
        errorPageMessage: '',
        indicatorDots: false,
        activeTab: 0
    }

    constructor() {

        this.fetchData = fetchData

        const { id = 1, name } = this.$router.params
        this.id = id
        this.name = name
    }

    onPullDownRefresh() {
        this.setState({
            serviceError: false
        }, () => {
            this.fetchData({
                resource: 'products',
                id: this.id,
                success: this.fetchDataSuccess.bind(this),
                fail: this.fetchDataFail.bind(this),
                complete: this.fetchDataComplete.bind(this)
            })
        })
    }

    fetchDataSuccess(response) {
        const { data } = response

        this.setState({
            product: data
        })

        if (data.images.length > 1) {
            this.setState({
                indicatorDots: true
            })
        }

        Taro.setNavigationBarTitle({
            title: data.name
        })
    }

    fetchDataComplete() {
        if (process.env.NODE_ENV === 'development') {
            setTimeout(() => {
                this.setState({
                    placeholder: false
                })
            }, 1000)
        } else {
            this.setState({
                placeholder: false
            })
        }

        Taro.stopPullDownRefresh()
    }

    fetchDataFail(error) {
        this.setState({
            serviceError: true,
            errorPageMessage: error.message
        })
    }

    componentWillMount() {


        if (this.name) {
            Taro.setNavigationBarTitle({
                title: this.name
            })
        }

        this.fetchData({
            resource: 'products',
            id: this.id,
            success: this.fetchDataSuccess.bind(this),
            fail: this.fetchDataFail.bind(this),
            complete: this.fetchDataComplete.bind(this)
        })
    }

    //这里和教程不同， 用了箭头函数解决错误
    onClickTab = (activeTab) => {
        this.setState({
            activeTab
        })
    }

    render() {
        const { product, placeholder, serviceError, errorPageMessage, indicatorDots, activeTab } = this.state
        const tabList = [
            { title: '描述' },
            { title: '参数' }
        ]

        const page = (
            <View>
                <Placeholder className='m-3' show={placeholder} type='product' />
                {!placeholder &&
                    <View>
                        <ProductPageCard data={product} indicatorDots={indicatorDots} />
                        <MaterialIcon className='m-3' icon='ac_unit' size='24' color='#000' />
                        <ProductPageTab
                          data={product}
                          tabList={tabList}
                          activeTab={activeTab}
                          onClick={this.onClickTab}
                        />
                        <ProductPageTabBar
                          primary='立即购买'
                          secondary='加入购物车'
                          icon='shopping_basket'
                          disabled={false}
                          disabledText='暂时无货'
                          onClick={this.onClickTabBar}
                        />
                    </View>
                }
            </View>
        )

        const errorPage = <ErrorPage content={errorPageMessage} />

        return (

            <View>
                {serviceError ? errorPage : page}
            </View>

        )
    }
}

export default ProductShow