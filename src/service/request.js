import axios from 'axios'
const instance = axios.create({
  // baseURL: 'http://192.168.1.151:9200/apigateway/cms/api/v1/external/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// post请求
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    }
    )
  })
}

// get请求
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, params).then((response) => {
      resolve(response.data.data)
    }, err => {
      reject(err)
    }
    )
  })
}

// 登录接口
export const login = params => post('/ke/user/login', params)

// 获取内容列表（包含所有子栏目内容）
export const getDetails = (categoryId, pageNo, pageSize) => get('/apigateway/cms/api/v1/external/getContentList', {
  params: {
    categoryId,
    pageNo,
    pageSize,
    containChildrenFlag: 1
  }
})

// 搜索
export const getSearch = params => post('/apigateway/cms/api/v1/external/datasource/preview', {
  code: 'getContentList',
  dataSourceParamList: [
    { key: 'superCategoryId', value: '5225120585127936' },
    { key: 'title', value: params.keyword || '' }
  ],
  pageNo: params.pageNo,
  pageSize: params.pageSize

})

// 获取内容列表
export const getContentList = categoryId => get('/apigateway/cms/api/v1/external/getContentList', {
  params: { categoryId }
})

// 获取栏目列表
export const getCategoryList = () => get('/apigateway/cms/api/v1/external/getCategoryList', {
  params: { categoryId: '5225120585127936' }
})

// 获取内容详情
export const getInfoContent = async contentId => get('/apigateway/cms/api/v1/external/getInfoContent', {
  params: { contentId }
})
