// import proxy from '../../../config/proxy'
import config from './config'
export default {
  data () {
    return {
      accessMap: {}
    }
  },
  created () {
    let data
    data = config 
    
    data.forEach(ele => {
      this.$set(this.accessMap, ele, true)
    })
  },
  methods: {
    getAccessListByHash () {
    
      return this.$store.state.access.accessList || []
    }
  }
}
