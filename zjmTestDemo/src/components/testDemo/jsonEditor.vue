<template>
  <div class="json-editor-container">
    <h2>JSON Editor 测试组件</h2>
    <p class="description">
      这是一个简单的 JSON 编辑器组件。
      您可以在此编辑 JSON 数据，切换不同的视图模式。
    </p>
    <div class="editor-wrapper">
      <JsonEditorVue v-model="jsonData" class="json-editor" />
    </div>
    <div class="preview-section">
      <h3>JSON 数据预览:</h3>
      <pre>{{ jsonData }}</pre>
    </div>
    <div class="actions">
      <el-button type="primary" @click="resetData">重置数据</el-button>
      <el-button type="success" @click="loadSampleData">加载示例数据</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import JsonEditorVue from 'json-editor-vue'
import { ElButton } from 'element-plus'

const jsonData = ref<Record<string, unknown>>({
  name: '测试数据',
  age: 30,
  city: '北京',
  hobbies: ['读书', '游泳', '编程'],
  address: {
    street: '长安街1号',
    zipcode: '100000'
  }
})

const resetData = () => {
  jsonData.value = {
    name: '',
    age: 0,
    city: '',
    hobbies: [],
    address: {
      street: '',
      zipcode: ''
    }
  }
}

const loadSampleData = () => {
  // 模拟数据加载
  jsonData.value = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "示例网站名称",
    "url": "https://www.example.com",
    "description": "这是示例网站的描述，展示主要业务和服务。",
    "publisher": {
      "@type": "Organization",
      "name": "示例公司名称",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.example.com/logo.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.example.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://www.facebook.com/example",
      "https://www.twitter.com/example",
      "https://www.linkedin.com/company/example"
    ]
  }


}
</script>

<style scoped>
.json-editor-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.description {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.editor-wrapper {
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  height: 500px;
}

.json-editor {
  height: 100%;
}

.preview-section {
  margin: 20px 0;
}

.preview-section h3 {
  margin-bottom: 10px;
}

.preview-section pre {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow: auto;
  max-height: 200px;
}

.actions {
  margin-top: 20px;
}

.actions button {
  margin-right: 10px;
}
</style>
