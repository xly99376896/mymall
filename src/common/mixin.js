import {debounce} from '@/common/utils'
import BackTop from '@/components/content/backTop/BackTop'

export const itemListenerMixin = {
    data() {
        return {
            itemListener: null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh,500)
        this.itemListener = () => {
            refresh()
        }
        this.$bus.$on('itemImageLoad', this.itemListener)
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0)
        },
        listenShowBackTop(position) {
            this.isShowBackTop = (-position.y) > 1200
        }
    },
}