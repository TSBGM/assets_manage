const api = {

  selectFactory:'/assets/selectFactory',//廠區  
  selectArea:'/assets/selectArea',//工作區域列表
  selectBuildingByArea: '/assets/selectBuildingByArea',//廠内區域樓棟
  selectAssetsStatus:'/assets/selectAssetsStatus',//資產狀態列表 
  selectAssetsType:'/assets/selectAssetsType',//资产类型  
  selectStaffType:'/assets/selectStaffType',//幹部類型
  selectWorkStatus:'/assets/selectWorkStatus',//在职状态  
  selectBgList:'/assets/selectBgList',//查询事业群 
  selectUnitList: '/assets/selectUnitList',//根据BGId查询事业处unit接口  
  selectDepartList: '/assets/selectDepartList',//根据BGId、 unitId查询部门depart接口  
  selectClassList: '/assets/selectClassList',//根据BGId、 unitId 、departId查询課Class接口  
  saveComelninsert: '/assets/insert',//保存
  
  // query: '/assets/search',//查詢
  query: '/tsbg/ac/query',//查詢
  capitalexcel:'/tsbg/ac/capitalexcel',//導出

  selectAssetsInfoById: '/assets/selectAssetsInfoById',//根据固定资产id查询资产信息接口
  selectUserNameByUserCode: '/assets/selectUserNameByStaffCode',//根据工号查询员工姓名接口
  update: '/assets/update',//固定资产修改保存

  findManager:'/tsbg/assets/findManager',//系統用戶管理頁面---查詢用戶
  modifyManager:'/tsbg/assets/modifyManager',//系統用戶管理頁面---權限停/啓用
  addManager:'/tsbg/assets/addManager',//系統用戶管理頁面---添加管理員

  importAssets:'/tsbg/batchInsert/import',//批量导入
  viewAssets:'/tsbg/batchInsert/view',//预览模板数据

};

module.exports = {
  api
};
