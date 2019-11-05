const api = {

  selectFactory:'/assets/add/selectFactory',//廠區
  
  selectArea:'/assets/add/selectArea',//工作區域列表
  
  selectBuildingByArea: '/assets/add/selectBuildingByArea',//廠内區域樓棟
  
  selectAssetsStatus:'/assets/add/selectAssetsStatus',//資產狀態列表
 
  selectAssetsType:'/assets/add/selectAssetsType',//资产类型
  
  selectStaffType:'/assets/add/selectStaffType',//幹部類型

  selectWorkStatus:'/assets/add/selectWorkStatus',//在职状态
  
  selectBgList:'/assets/add/selectBgList',//查询事业群
  
  selectUnitList: '/assets/add/selectUnitList',//根据BGId查询事业处unit接口
  
  selectDepartList: '/assets/add/selectDepartList',//根据BGId、 unitId查询部门depart接口
  
  selectClassList: '/assets/add/selectClassList',//根据BGId、 unitId 、departId查询課Class接口
  
  saveComelninsert: '/assets/add/insert',//保存
  
  // delStampMem: '/tsbg/stamp/delStampMem',//刪除成員
  

};

module.exports = {
  api
};
