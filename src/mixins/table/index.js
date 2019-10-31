export default {
  methods: {
    /**
     * 对分离的表格数据做数据处理
     * @param data {Object}
     * @param options {Object}
     */
    filterTableByMode (data, options) {
      const requestMode = options.sahara_pagedquery_mode
      Object.keys(data).map(key => {
        if (!requestMode) {
          this.table[key] = data[key]
        } else {
          if (requestMode !== 'count' && key !== 'info' && key !== 'total') {
            this.table[key] = data[key]
          }
          if (requestMode === 'count' && (key === 'info' || key === 'total')) {
            this.table[key] = data[key]
          }
        }
        this.table.requestMode = requestMode
      })
    }
  }
}
