const api = {
  uploadQuestion: '/tsbg/questionFeedBack/createFeedBack',//問題反饋新增
  savechange: '/tsbg/power/updatepower',//权限修改
  excelAll:'/tsbg/ec/excelAll ',//数据导出
  getQuestionFeedBackById:'/tsbg/questionFeedBack/getQuestionFeedBackById',
  questionHandle:'/tsbg/questionFeedBack/questionHandle',
  // getquestionall:'/tsbg/qe/getquestionall', //问题反馈列表
  getquestionall:'/tsbg/qe/getquestionsybase', //问题反馈列表
  getfeedbackinfo:'/tsbg/questionFeedBack/selectFeedbackUserByUserCode',//自动带出用户个人信息
  gethandleinfo:'/tsbg/questionFeedBack/selectHandleUserByUserCode',//自动带出用户信息
  deleteFile:'/tsbg/upload/deleteFileByFileNameAndQuestionHandleId'//删除附件

};

module.exports = {
  api
};
