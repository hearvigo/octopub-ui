import httpclient from '@/utils/httpclient'

export function listDeploy(namespace) {
  return httpclient.get(`/api/v1/deploy/${namespace}`)
}

export function listPod(namespace) {
  return httpclient.get(`/api/v1/pod/${namespace}`)
}

export function listApp(namespace) {
  return httpclient.get(`/api/v1/app/list/${namespace}`)
}

export function publishApp(appId, appVersion, publishDesc, publishType) {
  return httpclient.post('/api/v1/app/publish', {
    appId: appId,
    imageTag: appVersion,
    publishDesc: publishDesc,
    publishType: publishType
  })
}

export function stopApp(appCode) {
  return httpclient.post('/api/v1/app/stop', {
    appCode: appCode
  })
}

export function clearApp(appCode) {
  return httpclient.post('/api/v1/app/clear', {
    appCode: appCode
  })
}

export function executeShell(cmd) {
  return httpclient.post('/api/v1/shell/execute', {
    cmd: cmd
  })
}

export function listImageTag(namespace, appName) {
  return httpclient.get('/api/v1/image/list', {
    params: {
      namespace: namespace,
      appName: appName
    }
  })
}

export function saveAppBasics(data) {
  return httpclient.post('/api/v1/app/basics/save', data)
}

export function saveAppGateway(data) {
  return httpclient.post('/api/v1/app/gateway/save', data)
}

export function getAppBasics(appId) {
  return httpclient.get('/api/v1/app/basics/detail', {
    params: {
      appId: appId
    }
  })
}

export function getAppGateway(appId) {
  return httpclient.get('/api/v1/app/gateway/detail', {
    params: {
      appId: appId
    }
  })
}

export function listPublish(query) {
  return httpclient.get('/api/v1/publish/list', {
    params: {
      appCode: query.appCode,
      page: query.page,
      size: query.limit
    }
  })
}

export function getPublishDetail(publishId) {
  return httpclient.get('/api/v1/publish/detail', {
    params: {
      publishId: publishId
    }
  })
}
