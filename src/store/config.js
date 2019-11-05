
const testConfig = {

  baseUrl: 'http://10.139.198.184:8080',// 项目服務器

  fileUrl: 'http://10.124.131.88:8080',//文件上传服務器

  chenUrl: 'http://10.177.118.24:8080',//陳強,

  xuUrl: 'http://10.139.199.167:8080',//徐鑫,

  zhouUrl: 'http://10.139.198.153:8080',//从明,

  haiUrl: 'http://10.139.198.184:8080',//海波
  
  //http://10.124.131.79:8080测试接口   10.124.131.79:80测试地址
  //http://10.124.131.80:80   
};

const config = function () {
    // if (apiType === 0) { // 本地调试环境
      return testConfig 
    // }
  };
  
const configUrl = config();

configUrl.baseUrl = configUrl.baseUrl ? configUrl.baseUrl : `${location.origin}/`;
configUrl.loginUrl = configUrl.loginUrl ? configUrl.loginUrl : `${location.origin}/`;
module.exports = {
  configUrl,
  
};
