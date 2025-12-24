<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div id="gc-designer-container">
    <div class="button-container">
      <button @click="importExcel">导入Excel</button>
      <button @click="exportExcel">导出Excel</button>
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileImport"
        accept=".xlsx,.xls"
      />
    </div>
    <Designer
      :styleInfo="styleInfo"
      :config="config"
      :spreadOptions="spreadOptions"
      @designerInitialized="designerInitialized"
    >
    </Designer>
  </div>
</template>

<script setup lang="ts">
import '@grapecity-software/spread-sheets/styles/gc.spread.sheets.excel2013white.css'
import '@grapecity-software/spread-sheets-designer/styles/gc.spread.sheets.designer.min.css'
import * as GC from '@grapecity-software/spread-sheets'
import '@grapecity-software/spread-sheets-print'
import '@grapecity-software/spread-sheets-shapes'
import '@grapecity-software/spread-sheets-charts'
import '@grapecity-software/spread-sheets-slicers'
import '@grapecity-software/spread-sheets-pivot-addon'
import '@grapecity-software/spread-sheets-tablesheet'
import '@grapecity-software/spread-sheets-ganttsheet'
import '@grapecity-software/spread-sheets-reportsheet-addon'
import '@grapecity-software/spread-sheets-formula-panel'
import '@grapecity-software/spread-sheets-io'
import '@grapecity-software/spread-sheets-designer-resources-cn'
import Designer from '@grapecity-software/spread-sheets-designer-vue'
import { ref } from 'vue'

// 添加这一行导入Excel IO模块
import * as ExcelIO from '@grapecity-software/spread-excelio'
// 文件输入引用
const fileInput = ref<HTMLInputElement | null>(null)

// 当前workbook引用
let currentWorkbook: GC.Spread.Sheets.Workbook | null = null

const config = (GC.Spread.Sheets as any).Designer.DefaultConfig

if (config.ribbon[0].buttonGroups[0].commandGroup.children[0] !== 'Welcome') {
  config.commandMap = {
    Welcome: {
      title: '欢迎',
      text: '欢迎',
      iconClass: 'ribbon-button-welcome',
      bigButton: true,
      commandName: 'Welcome',
      execute: async () => {
        alert('欢迎使用新的设计器。')
      },
    },
  }
  ;(config as any).ribbon[0].buttonGroups.unshift({
    label: '新设计器',
    thumbnailClass: 'welcome',
    commandGroup: {
      children: [
        {
          direction: 'vertical',
          commands: ['Welcome'],
        },
      ],
    },
  })
}

const styleInfo = { height: '98vh', width: '100%' }
const spreadOptions = {
  sheetCount: 3,
}

// 导入Excel
const importExcel = () => {
  fileInput.value?.click()
}

// 处理文件导入
const handleFileImport = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    try {
      const excelIO = new ExcelIO.IO()
      excelIO.open(
        file, // 直接传入 File 对象，它是 Blob 的子类
        (json: any) => {
          console.log('导入的Excel数据：', json)
          if (currentWorkbook) {
            currentWorkbook.fromJSON(json)
          }
        },
        (error: any) => {
          console.error('导入Excel出错：', error)
        },
      )
    } catch (error) {
      console.error('处理Excel文件时出错：', error)
    }
  }
  // 清除文件输入值，允许重复选择同一文件
  input.value = ''
}

// 导出Excel
const exportExcel = () => {
  if (currentWorkbook) {
    const json = currentWorkbook.toJSON()
    console.log('导出的Excel数据：', json)
    const excelIO = new ExcelIO.IO()
    const fileName = 'exported_data.xlsx'

    excelIO.save(
      json,
      (blob: Blob) => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        URL.revokeObjectURL(link.href)
      },
      (error: any) => {
        console.error('导出Excel出错：', error)
      },
    )
  }
}

function designerInitialized(value: any) {
  const spread: GC.Spread.Sheets.Workbook = value.getWorkbook()
  currentWorkbook = spread
  const activeSheet = spread.getActiveSheet()
  activeSheet.setValue(0, 0, '示例')
}
</script>

<style scoped>
.button-container {
  padding: 10px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
