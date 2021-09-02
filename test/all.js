/* eslint-disable */

const got = require('got').default;

const uiPackages = new Array(200).fill('https://images.tuyacn.com/smart/ui/1627286122197629991-ios_5.1_0.0.3.tar.gz')
const label = `concurrent-request-num:${uiPackages.length}`
console.time(label)
got.get(`http://localhost:3000/v1/api/analyse/getHttpUrls?filter=tuya&render=html&url=${uiPackages.join(',')}`).then(()=> {
  console.timeEnd(label)
})
