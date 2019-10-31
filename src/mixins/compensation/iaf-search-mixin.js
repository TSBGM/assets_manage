/**
 *
 * 基本搜索日期mixin
 */
import moment from 'moment'
export default {
  data () {
    return {
      multipleColumns: {}
    }
  },
  methods: {
    /**
     * 将日期选择器的时间转化为东八区时间
     * @param {*} value 要改变的值
     * @param {String} searchParam 对象名
     * @param {String} searchDateName 属性名
     * @param {String} type 设置返回值的类型 可选参数String/Date  默认为Date格式
     * @return {Date} 东八区时间
     */
    handleDateChange (value, searchParam, searchDateName, type = 'date', format = 'YYYY-MM-DD') {
      if (type.toLowerCase() === 'string') return (this[searchParam][searchDateName] = value ? moment(value).format(format) : '')
      if (type.toLowerCase() === 'date') return (this[searchParam][searchDateName] = value ? new Date(moment(value).format(format)) : '')
    },
    getDisableDate (searchParam, searchDateName, status) {
      return {
        disabledDate: (time) => {
          if (!this[searchParam][searchDateName]) return false
          let timeObj = {
            start: time.getTime() > Date.parse(this[searchParam][searchDateName]),
            end: time.getTime() < Date.parse(this[searchParam][searchDateName]) - 3600 * 1000 * 24
          }
          return timeObj[status.toLowerCase()]
        }
      }
    },
    handleDateOptions (searchParam, searchDateName, status) {
      return this.getDisableDate(searchParam, searchDateName, status)
    },
    getMultipleData (data) {
      data.map(item => {
        Object.keys(this.multipleColumns).forEach(key => {
          item[key] = {}
        })
        Object.keys(item).forEach(key => {
          for (let col of Object.keys(this.multipleColumns)) {
            if (this.multipleColumns[col].includes(key)) {
              item[col][key] = item[key]
              break
            }
          }
        })
        return item
      })
    },
    getMultipleColumns () {
      this.table.columns.forEach(item => {
        item.children && (this.multipleColumns[item.prop] = item.children.map(val => {
          return val.prop
        }))
      })
    },
    /**
     * 业务需求: 当当前日期的日数小于分割日则为返回上一个月,否则为当前月份
     * @param {Number} splitDay 分割日
     * @param {String} format 返回日期的格式 默认 YYYY-MM-DD
     */
    getCurrentPayMonth (splitDay = 5, format = 'YYYY-MM-DD') {
      const [year, month, day] = moment().format('YYYY-MM-DD').split('-')
      if (Number(day) >= splitDay) {
        return moment().format(format)
      } else {
        if (month === '01') {
          return moment(`${year - 1}-12-01`).format(format)
        }
        return moment(`${year}-${('0' + (month - 1)).substr(-2, 2)}-01`).format(format)
      }
    },
    handlePersonnelChange (item) {
      if (item === '') {
        this.searchData.personnelGroupCode = ''
      }
    }
  }
}
