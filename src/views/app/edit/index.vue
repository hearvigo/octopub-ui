<template>
  <div class="app-container">
    <div>
      <el-card class="box-card">
        <div slot="header">
          <span>卡片名称</span>
        </div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
          <el-tab-pane label="Basics" name="basics">
            <el-form ref="formBasics" :model="formBasicsData" :rules="formBasicsRule" label-width="120px" style="width:550px">
              <el-form-item label="IDC" prop="idcId">
                <el-select v-model="formBasicsData.idcId" placeholder="IDC" style="width: 430px">
                  <el-option
                    v-for="item in idcOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="Template" prop="templateId">
                <el-select v-model="formBasicsData.templateId" placeholder="Template" style="width: 430px">
                  <el-option
                    v-for="item in templateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="Namespace" prop="namespace">
                <el-select v-model="formBasicsData.namespace" placeholder="Namespace" style="width: 430px">
                  <el-option
                    v-for="item in namespaceOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="App Code" prop="appCode">
                <el-input v-model="formBasicsData.appCode" autocomplete="off" />
              </el-form-item>
              <el-form-item label="App Name" prop="appName">
                <el-input v-model="formBasicsData.appName" autocomplete="off" />
              </el-form-item>
              <el-form-item label="App Env" prop="appEnv">
                <el-select v-model="formBasicsData.appEnv" placeholder="App Env" style="width: 430px">
                  <el-option
                    v-for="item in appEnvOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="App Tier" prop="appTier">
                <el-select v-model="formBasicsData.appTier" placeholder="App Tier" style="width: 430px">
                  <el-option
                    v-for="item in appTierOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="Replicas" prop="replicas">
                <el-input-number v-model="formBasicsData.replicas" :min="1" :max="5" label="Replicas" />
              </el-form-item>
              <el-form-item
                v-for="(port, index) in formBasicsData.ports"
                :key="port.key"
                :label="getPortLabel(index)"
              >
                <el-col :span="6">
                  <el-form-item>
                    <el-input v-model="port.containerPort" autocomplete="off" placeholder="ContainerPort" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item>
                    <el-input v-model="port.servicePort" autocomplete="off" placeholder="ServicePort" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item>
                    <el-input v-model="port.servicePortName" autocomplete="off" placeholder="ServicePortName" />
                  </el-form-item>
                </el-col>
                <el-col :span="3" style="margin-left: 15px">
                  <el-button v-if="index===0" type="primary" icon="el-icon-plus" size="mini" @click.prevent="handleAddPort" />
                  <el-button v-if="index>0" type="danger" icon="el-icon-minus" size="mini" @click.prevent="handleRemovePort(port)" />
                </el-col>
              </el-form-item>
              <el-form-item label="ResourceMemory">
                <el-col :span="11">
                  <el-form-item>
                    <el-input v-model="formBasicsData.resources.limitMemory" autocomplete="off" placeholder="LimitMemory">
                      <template slot="append">Mi</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11" style="margin-left: 15px">
                  <el-form-item>
                    <el-input v-model="formBasicsData.resources.requestMemory" autocomplete="off" placeholder="RequestMemory">
                      <template slot="append">Mi</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="ResourceCpu">
                <el-col :span="11">
                  <el-form-item>
                    <el-input v-model="formBasicsData.resources.limitCpu" autocomplete="off" placeholder="LimitCpu">
                      <template slot="append">m</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11" style="margin-left: 15px">
                  <el-form-item>
                    <el-input v-model="formBasicsData.resources.requestCpu" autocomplete="off" placeholder="RequestCpu">
                      <template slot="append">m</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="Envs">
                <el-button type="primary" icon="el-icon-plus" @click="handleAddEnv">Add ENV</el-button>
              </el-form-item>
              <el-form-item
                v-for="(env, index) in formBasicsData.envs"
                :key="env.key"
              >
                <el-col :span="6">
                  <el-form-item>
                    <el-input v-model="env.name" autocomplete="off" placeholder="ENV Name" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <el-input v-model="env.value" autocomplete="off" placeholder="ENV Value" />
                  </el-form-item>
                </el-col>
                <el-col v-if="true" :span="3" style="margin-left: 15px">
                  <el-button type="danger" icon="el-icon-minus" size="mini" @click.prevent="handleRemoveEnv(env)" />
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :loading="formBasicsSubmitLoading" @click="submitBasicsForm()">Submit</el-button>
                <el-button @click="resetBasicsForm()">Reset</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="Gateway" name="gateway">
            <el-form ref="formGateway" :model="formGatewayData" :rules="rules" label-width="120px" style="width: 750px">
              <el-form-item label="Edge" prop="edge">
                <el-select v-model="formGatewayData.edge" placeholder="edge" style="width: 430px">
                  <el-option
                    v-for="item in edgeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="Tls">
                <el-button type="primary" icon="el-icon-plus" @click="handleAddTls">Add Tls</el-button>
              </el-form-item>
              <el-form-item
                v-for="(tlsItem, tlsIndex) in formGatewayData.tls"
                :key="tlsItem.key"
              >
                <el-col :span="6">
                  <el-form-item>
                    <el-select v-model="tlsItem.secretName" placeholder="secret">
                      <el-option
                        v-for="option in secretOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3" style="margin-left: 15px">
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click.prevent="handleRemoveTls(tlsItem)" />
                </el-col>
                <el-col :span="14">
                  <el-form-item
                    v-for="(hostItem, hostIndex) in tlsItem.hosts"
                    :key="hostItem.key"
                  >
                    <el-col :span="20">
                      <el-form-item>
                        <el-input v-model="hostItem.value" autocomplete="off" placeholder="Host" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="3" style="margin-left: 15px">
                      <el-button v-if="hostIndex===0" type="primary" icon="el-icon-plus" size="mini" @click.prevent="handleAddHost(tlsItem)" />
                      <el-button v-if="hostIndex>0" type="danger" icon="el-icon-minus" size="mini" @click.prevent="handleRemoveHost(tlsItem,hostItem)" />
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="Rules">
                <el-button type="primary" icon="el-icon-plus" @click="handleAddRule">Add Rule</el-button>
              </el-form-item>

              <el-form-item
                v-for="(ruleItem, ruleIndex) in formGatewayData.rules"
                :key="ruleItem.key"
              >
                <el-col :span="6">
                  <el-form-item>
                    <el-input v-model="ruleItem.host" autocomplete="off" placeholder="Host" />
                  </el-form-item>
                </el-col>
                <el-col :span="3" style="margin-left: 15px">
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click.prevent="handleRemoveRule(ruleItem)" />
                </el-col>
                <el-col :span="14">
                  <el-form-item
                    v-for="(pathItem, pathIndex) in ruleItem.paths"
                    :key="pathItem.key"
                  >
                    <el-col :span="20">
                      <el-form-item>
                        <el-input v-model="pathItem.value" autocomplete="off" placeholder="Path" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="3" style="margin-left: 15px">
                      <el-button v-if="pathIndex===0" type="primary" icon="el-icon-plus" size="mini" @click.prevent="handleAddPath(ruleItem)" />
                      <el-button v-if="pathIndex>0" type="danger" icon="el-icon-minus" size="mini" @click.prevent="handleRemovePath(ruleItem,pathItem)" />
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :loading="formGatewaySubmitLoading" @click="submitGatewayForm()">Submit</el-button>
                <el-button @click="resetGatewayForm()">Reset</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

      </el-card>

    </div>
  </div>
</template>

<script>
import { saveAppBasics, saveAppGateway, getAppBasics, getAppGateway } from '@/api/deploy'

export default {
  name: 'Index',
  data() {
    return {
      activeName: 'basics',
      formBasicsSubmitLoading: false,
      formGatewaySubmitLoading: false,
      appId: 0,
      gatewayId: 0,
      formBasicsData: {
        idcId: 1,
        templateId: 1,
        appCode: '',
        appName: '',
        appEnv: '',
        appTier: '',
        namespace: '',
        replicas: 1,
        ports: [{
          containerPort: '',
          servicePort: '',
          servicePortName: '',
          key: Date.now()
        }],
        resources: {
          limitMemory: '',
          requestMemory: '',
          limitCpu: '',
          requestCpu: ''
        },
        envs: []
      },
      formGatewayData: {
        edge: 'nginx',
        tls: [],
        rules: []
      },
      idcOptions: [
        {
          label: 'AWS',
          value: 1
        }
      ],
      templateOptions: [
        {
          label: 'java-default',
          value: 1
        },
        {
          label: 'php-default',
          value: 2
        },
        {
          label: 'java-http-monitor',
          value: 3
        },
        {
          label: 'java-grpc-monitor',
          value: 4
        }
      ],
      namespaceOptions: [
        {
          value: 'nonda-java-qa',
          label: 'nonda-java-qa'
        },
        {
          value: 'nonda-php-qa',
          label: 'nonda-php-qa'
        },
        {
          value: 'nonda-static-qa',
          label: 'nonda-static-qa'
        },
        {
          value: 'nonda-java-prod',
          label: 'nonda-java-prod'
        },
        {
          value: 'nonda-php-prod',
          label: 'nonda-php-prod'
        },
        {
          value: 'nonda-static-prod',
          label: 'nonda-static-prod'
        }
      ],
      appEnvOptions: [
        {
          value: 'nonda-share-qa',
          label: 'nonda-share-qa'
        },
        {
          value: 'nonda-share-prod',
          label: 'nonda-share-prod'
        },
        {
          value: 'nonda-java-prod',
          label: 'nonda-java-prod'
        }
      ],
      appTierOptions: [
        {
          value: 'frontend',
          label: 'frontend'
        },
        {
          value: 'backend',
          label: 'backend'
        },
        {
          value: 'task',
          label: 'task'
        },
        {
          value: 'taskservice',
          label: 'taskservice'
        }
      ],
      edgeOptions: [
        {
          value: 'nginx',
          label: 'nginx'
        }
      ],
      secretOptions: [
        {
          value: 'https-nonda-io',
          label: 'https-nonda-io'
        },
        {
          value: 'https-nonda-co',
          label: 'https-nonda-co'
        },
        {
          value: 'https-zus-ai',
          label: 'https-zus-ai'
        },
        {
          value: 'https-silverrocket-co',
          label: 'https-silverrocket-co'
        }
      ],
      rules: {

      },
      formBasicsRule: {
        idcId: [
          { required: true, message: 'Please select idc', trigger: 'change' }
        ],
        templateId: [
          { required: true, message: 'Please select template', trigger: 'change' }
        ],
        namespace: [
          { required: true, message: 'Please select namespace', trigger: 'change' }
        ],
        appCode: [
          { required: true, message: 'Please input appCode', trigger: 'blur' }
        ],
        appName: [
          { required: true, message: 'Please input appName', trigger: 'blur' }
        ],
        appEnv: [
          { required: true, message: 'Please select app env', trigger: 'change' }
        ],
        appTier: [
          { required: true, message: 'Please select app tier', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    const appId = this.$route.params.appId
    console.log('appId', appId)
    if (appId && appId > 0) {
      const loading = this.$loading({
        lock: true
        // text: 'Loading',
        // spinner: 'el-icon-loading'
        // background: 'rgba(0, 0, 0, 0.7)'
      })
      getAppBasics(appId)
        .then(response => {
          console.log('getAppBasics', response)
          this.setFormBasicData(response.data.data)
          loading.close()
        })
        .catch(err => {
          console.log(err)
          loading.close()
        })
    }
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event, this.appId, tab.name)
      if (tab.name === 'gateway' && this.appId > 0 && this.gatewayId === 0) {
        const loading = this.$loading({
          lock: true
          // text: 'Loading',
          // spinner: 'el-icon-loading'
          // background: 'rgba(0, 0, 0, 0.7)'
        })
        getAppGateway(this.appId)
          .then(response => {
            console.log('getAppGateway', response)
            this.setFromGatewayData(response.data.data)
            loading.close()
          })
          .catch(err => {
            console.log(err)
            loading.close()
          })
      }
    },
    handleAddPort() {
      this.formBasicsData.ports.push({
        containerPort: '',
        servicePort: '',
        servicePortName: '',
        key: Date.now()
      })
    },
    handleRemovePort(port) {
      const index = this.formBasicsData.ports.indexOf(port)
      if (index !== -1) {
        this.formBasicsData.ports.splice(index, 1)
      }
    },
    getPortLabel(index) {
      return index === 0 ? 'Ports' : ''
    },
    handleAddEnv() {
      this.formBasicsData.envs.push({
        name: '',
        value: '',
        key: Date.now()
      })
    },
    handleRemoveEnv(env) {
      const index = this.formBasicsData.envs.indexOf(env)
      if (index !== -1) {
        this.formBasicsData.envs.splice(index, 1)
      }
    },
    handleAddTls() {
      this.formGatewayData.tls.push({
        secretName: '',
        hosts: [{
          value: '',
          key: Date.now()
        }],
        key: Date.now()
      })
    },
    handleRemoveTls(item) {
      const index = this.formGatewayData.tls.indexOf(item)
      if (index !== -1) {
        this.formGatewayData.tls.splice(index, 1)
      }
    },
    handleAddHost(tlsItem) {
      const tlsIndex = this.formGatewayData.tls.indexOf(tlsItem)
      if (tlsIndex !== -1) {
        this.formGatewayData.tls[tlsIndex].hosts.push({
          value: '',
          key: Date.now()
        })
      }
    },
    handleRemoveHost(tlsItem, hostItem) {
      const tlsIndex = this.formGatewayData.tls.indexOf(tlsItem)
      if (tlsIndex !== -1) {
        const hostIndex = this.formGatewayData.tls[tlsIndex].hosts.indexOf(hostItem)
        if (hostIndex !== -1) {
          this.formGatewayData.tls[tlsIndex].hosts.splice(hostIndex, 1)
        }
      }
    },
    handleAddRule() {
      this.formGatewayData.rules.push({
        host: '',
        paths: [{
          value: '',
          key: Date.now()
        }],
        key: Date.now()
      })
    },
    handleRemoveRule(item) {
      const index = this.formGatewayData.rules.indexOf(item)
      if (index !== -1) {
        this.formGatewayData.rules.splice(index, 1)
      }
    },
    handleAddPath(ruleItem) {
      const ruleIndex = this.formGatewayData.rules.indexOf(ruleItem)
      if (ruleIndex !== -1) {
        this.formGatewayData.rules[ruleIndex].paths.push({
          value: '',
          key: Date.now()
        })
      }
    },
    handleRemovePath(ruleItem, pathItem) {
      const ruleIndex = this.formGatewayData.rules.indexOf(ruleItem)
      if (ruleIndex !== -1) {
        const pathIndex = this.formGatewayData.rules[ruleIndex].paths.indexOf(pathItem)
        if (pathIndex !== -1) {
          this.formGatewayData.rules[ruleIndex].paths.splice(pathIndex, 1)
        }
      }
    },
    submitBasicsForm() {
      this.$refs['formBasics'].validate((valid) => {
        if (!valid) {
          return false
        }
        console.log('basics', this.formBasicsData)
        this.formBasicsSubmitLoading = true
        const apiBasicsData = this.convertToApiBasicsData()
        saveAppBasics(apiBasicsData)
          .then(response => {
            console.log('saveAppBasics response', response)
            this.formBasicsSubmitLoading = false
            if (response.data.code === 200 && response.data.data.result) {
              this.appId = response.data.data.id
              this.$router.push({ path: '/app/edit/' + this.appId })
              this.$message({
                message: 'save app basics success',
                type: 'success'
              })
            }
          })
          .catch(err => {
            console.log(err)
            this.formBasicsSubmitLoading = false
          })
      })
    },
    resetBasicsForm() {

    },
    submitGatewayForm() {
      if (this.appId === 0) {
        this.$message({
          message: 'save app basics first',
          type: 'error'
        })
        return
      }
      console.log('gateway', this.formGatewayData)
      this.formGatewaySubmitLoading = true
      const apiGatewayData = this.convertToApiGatewayData()
      saveAppGateway(apiGatewayData)
        .then(response => {
          console.log('saveAppGateway response', response)
          this.formGatewaySubmitLoading = false
          if (response.data.code === 200 && response.data.data.result) {
            this.gatewayId = response.data.data.id
            this.$message({
              message: 'save app gateway success',
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.formGatewaySubmitLoading = false
        })
    },
    resetGatewayForm() {

    },
    convertToApiBasicsData() {
      const apiBasicData = {
        appId: this.appId,
        idcId: this.formBasicsData.idcId,
        templateId: this.formBasicsData.templateId,
        appCode: this.formBasicsData.appCode,
        appName: this.formBasicsData.appName,
        appEnv: this.formBasicsData.appEnv,
        appTier: this.formBasicsData.appTier,
        namespace: this.formBasicsData.namespace,
        replicas: this.formBasicsData.replicas,
        ports: this.formBasicsData.ports.map(item => {
          return {
            containerPort: parseInt(item.containerPort),
            servicePort: parseInt(item.servicePort),
            servicePortName: item.servicePortName
          }
        }),
        resources: {
          limitMemory: this.formBasicsData.resources.limitMemory === '' ? '' : this.formBasicsData.resources.limitMemory + 'Mi',
          requestMemory: this.formBasicsData.resources.requestMemory === '' ? '' : this.formBasicsData.resources.requestMemory + 'Mi',
          limitCpu: this.formBasicsData.resources.limitCpu === '' ? '' : this.formBasicsData.resources.limitCpu + 'm',
          requestCpu: this.formBasicsData.resources.requestCpu === '' ? '' : this.formBasicsData.resources.requestCpu + 'm'
        },
        envs: this.formBasicsData.envs.map(item => {
          return {
            name: item.name,
            value: item.value
          }
        })
      }
      console.log('apiBasicData', apiBasicData)
      return apiBasicData
    },
    setFormBasicData(apiBasicData) {
      this.appId = apiBasicData.appId
      this.formBasicsData = {
        idcId: apiBasicData.idcId,
        templateId: apiBasicData.templateId,
        appCode: apiBasicData.appCode,
        appName: apiBasicData.appName,
        appEnv: apiBasicData.appEnv,
        appTier: apiBasicData.appTier,
        namespace: apiBasicData.namespace,
        replicas: apiBasicData.replicas,
        ports: apiBasicData.ports.map(item => {
          return {
            containerPort: item.containerPort === 0 ? '' : item.containerPort,
            servicePort: item.servicePort === 0 ? '' : item.servicePort,
            servicePortName: item.servicePortName,
            key: Date.now() + item.containerPort
          }
        }),
        resources: {
          limitMemory: apiBasicData.resources.limitMemory.replace('Mi', ''),
          requestMemory: apiBasicData.resources.requestMemory.replace('Mi', ''),
          limitCpu: apiBasicData.resources.limitCpu.replace('m', ''),
          requestCpu: apiBasicData.resources.requestCpu.replace('m', '')
        },
        envs: apiBasicData.envs == null ? [] : apiBasicData.envs.map(item => {
          return {
            name: item.name,
            value: item.value,
            key: Date.now() + item.name
          }
        })
      }
    },
    convertToApiGatewayData() {
      const apiGatewayData = {
        id: this.gatewayId,
        appId: this.appId,
        edge: this.formGatewayData.edge,
        tls: this.formGatewayData.tls.map(tlsItem => {
          return {
            secretName: tlsItem.secretName,
            hosts: tlsItem.hosts.map(hostItem => {
              return hostItem.value
            })
          }
        }),
        rules: this.formGatewayData.rules.map(rulesItem => {
          return {
            host: rulesItem.host,
            paths: rulesItem.paths.map(pathItem => {
              return pathItem.value
            })
          }
        })
      }
      console.log('apiGatewayData', apiGatewayData)
      return apiGatewayData
    },
    setFromGatewayData(apiGatewayData) {
      this.gatewayId = apiGatewayData.id
      this.formGatewayData = {
        edge: apiGatewayData.edge,
        tls: apiGatewayData.tls.map(tlsItem => {
          return {
            secretName: tlsItem.secretName,
            hosts: tlsItem.hosts.map(hostItem => {
              return {
                value: hostItem,
                key: Date.now() + hostItem
              }
            })
          }
        }),
        rules: apiGatewayData.rules.map(rulesItem => {
          return {
            host: rulesItem.host,
            paths: rulesItem.paths.map(pathItem => {
              return {
                value: pathItem,
                key: Date.now() + pathItem
              }
            })
          }
        })
      }
    }
  }

}
</script>

<style scoped>

</style>
