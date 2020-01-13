import Widgets from './widgets'
import Observer from '../core/observer/index'

/**
 * @class instrument实例， 解析html组件
 * @params 组件对象
 * @return vnode
 */
class Instrument {
    widgets: Widgets
    constructor(component: any) {
        this.widgets = new Widgets();
        // 执行init方法， 初始化组件的数据， 初始话组件的声明周期
        this.init(component)
    }

    /**
     * @func 将数据转化为响应式的数据
     */

    /**
     * @fucn 初始化解析引擎
     */
    init(component: any) {    
        this.initData(component.data)
    }

    /**
     * @func 初始化数据仓库
     */
    initData(data: any) {
        const observerData = data;
        const keys = Object.keys(observerData);
        
        let i = keys.length;

        while(i--) {
            const key = keys[i]
            console.log('key', key)
            this.proxy((window as any).instance, '_data', key)
        }

        this.observer(data)
        console.log((window as any).instance)
    }

    /**
     * 数据代理
     */
    proxy(target: any, sourceKey: string, key: string) {
        const _this: any = this
        const sharedPropertyDefinition = {
            enumerable: true,
            configurable: true,
            get: () => {},
            set: () => {}
        }
        sharedPropertyDefinition.get = function() {
            return (this as any)[sourceKey][key]
        }

        sharedPropertyDefinition.set = () => {
            _this[sourceKey][key] = (window as any).val
        }

        Object.defineProperty(target, key, sharedPropertyDefinition)
    }

    /**
     * 初始化observer对象
     */
    observer(data: any) {
        // 判断是否为对象
        if(!this.widgets.TypeContent.isArray(data) || !this.widgets.TypeContent.isObject(data) ) {
            return
        }

        let ob;

        // 如果对象存在ob属性
        if(this.hasOwn(data, '__ob__')) {
            ob = data.__ob__
        }else {
            ob = new Observer(data)
        }


        
    }

    /**
     * @func 判断一个对象是否具有某个属性
     */
    hasOwn(obj: any, key: string) {
        return Object.prototype.hasOwnProperty.call(obj, key)
    }
}

export default Instrument