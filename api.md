## 1. nest-api-analyse-imports
分析服务

## 2. 接口列表
### 2.2 /analyse/parseImports
* 接口：GET /analyse/parseImports
* 说明：解析tarball代码中import语句
* 参数：
  - url: string, 必选, 源代码tarball地址

### 2.3 /analyse/getHttpUrls
* 接口：POST /analyse/getHttpUrls
* 说明：解析tarball中http链接
* 参数：
  - url: string, 必选, 源代码tarball地址(可逗号分隔设置多个, get请求有数量限制)
  - filter: string, 过滤条件
  - render: string, 渲染格式

### 2.3 /analyse/getHttpUrls
* 接口：GET /analyse/getHttpUrls
* 说明：解析tarball中http链接
* 参数：
  - url: string, 必选, 源代码tarball地址(可逗号分隔设置多个, get请求有数量限制)
  - filter: string, 过滤条件
  - render: string, 渲染格式