## 1. nest-api-analyse-imports
分析服务

## 2. 接口列表
### 2.1 /v1/api/analyse/parseImports
* 接口：GET /v1/api/analyse/parseImports
* 说明：解析tarball代码中import语句
* 参数：
  - url: string, 必选, 源代码tarball地址

### 2.2 /v1/api/analyse/getHttpUrls
* 接口：GET /v1/api/analyse/getHttpUrls
* 说明：解析tarball中http链接
* 参数：
  - url: string, 必选, 源代码tarball地址
  - filter: string, 过滤条件
  - render: string, 渲染格式

### 2.3 /v1/api/analyse/getHttpUrlsBatch
* 接口：POST /v1/api/analyse/getHttpUrlsBatch
* 说明：批量解析tarball中http链接
* 参数：
  - urls: array, 必选, 源代码tarball地址列表
  - filter: string, 过滤条件

### 2.4 /v1/api/analyse/json/schema/tstype
* 接口：POST /v1/api/analyse/json/schema/tstype
* 说明：待补充
* 参数：
  - json: string, 必选, json