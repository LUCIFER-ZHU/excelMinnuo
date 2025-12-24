<template>
  <div class="container">
    <HotTable :settings="hotSettings" ref="hotTable"></HotTable>
    <el-button @click="handleExport">导出数据</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, type Ref, toRaw } from 'vue'
import { ElMessageBox } from 'element-plus'
import { HotTable } from '@handsontable/vue3'
import 'handsontable/dist/handsontable.full.min.css'
import { registerAllModules } from 'handsontable/registry'; // 注册所有模块
import 'handsontable/languages/zh-CN'; // 汉语包
// 导入和注册插件和单元格类型
import { registerCellType, NumericCellType } from 'handsontable/cellTypes';
import { registerPlugin, UndoRedo } from 'handsontable/plugins';
registerCellType(NumericCellType);
registerPlugin(UndoRedo);

registerAllModules();

const hotTable = ref(null);

const tableData = reactive([
  ['张三', 20, '男', ''],
  ['李四', 22, '女', '']
])
const hotInstance: Ref<any | null> = ref(null);

const columns = [
  { title: '姓名', data: 0, width: 100 },
  { title: '年龄', data: 1, type: 'numeric', width: 100 },
  { title: '性别', data: 2, width: 100 },
  { title: '入职日期', data: 3, type: 'date', dateFormat: 'YYYY-MM-DD', width: 150 }
];

/**
 * 插入列的函数，使用 columns 更新
 * @param direction 插入方向 'left' 或 'right'
 * @param colIndex 列索引
 * @param hot Handsontable 实例
 */
const insertColWithColumnsUpdate = (direction: string, colIndex: number, hot: any) => {
  // 获取当前 columns 和 colHeaders
  const columns = hot.getSettings().columns ? [...hot.getSettings().columns] : [];
  const colHeaders = Array.isArray(hot.getColHeader())
    ? [...hot.getColHeader()]
    : Array.from(hot.getColHeader());

  // 计算插入位置
  const insertIndex = direction === 'left' ? colIndex : colIndex + 1;

  // 新列配置
  columns.splice(insertIndex, 0, {
    title: `新列${columns.length + 1}`,
    type: 'text',
    width: 100
  });
  colHeaders.splice(insertIndex, 0, `新列${colHeaders.length + 1}`);

  // 更新配置
  hot.updateSettings({
    columns,
    colHeaders
  });

  // 插入数据列
  hot.alter('insert_col_start', insertIndex);
}


const hotSettings = reactive({
  data: toRaw(tableData), // 表格数据
  language: 'zh-CN', // 官方汉化
  licenseKey: 'non-commercial-and-evaluation', // 去除底部非商用声明
  dropdownMenu: true, currentRowClassName: 'currentRow', // 突出显示行
  currentColClassName: 'currentCol', // 突出显示列
  minSpareRows: 2, // 行留白
  autoWrapRow: false, // 自动换行
  trimWhitespace: false, // 去除空格
  rowHeaderWidth: 100, // 单元格宽度
  stretchH: 'all',
  renderAllRows: false,
  height: 'auto', // 自动高度
  rowHeaders: [], // 行标题
  formulas: false, // 公式
  copyable: true, // 允许键盘复制
  wordWrap: false, // 自动换行
  copyPaste: true, // 复制粘贴
  filters: false, // 允许通过内置组件或 API 过滤表数据
  fixedColumnsLeft: 0, // 固定左边列数
  fixedRowsTop: 0, // 固定上边列数
  columnSorting: [], // 排序
  columns: columns, // 列配置
  contextMenu: {
    items: {
      "row_above": {
        name: '上方插入一行'
      },
      "row_below": {
        name: '下方插入一行'
      },
      "col_left_1": {
        name: '左方插入列',
        callback: function (key: string, selection: any) {
          const hot = hotInstance.value;
          const currentCol = selection[0].start.col;
          insertColWithColumnsUpdate('left', currentCol, hot);
        }
      },
      "col_right_1": {
        name: '右方插入列',
        callback: function (key: string, selection: any) {
          const hot = hotInstance.value;
          const currentCol = selection[0].start.col;
          insertColWithColumnsUpdate('right', currentCol, hot);
        }
      },
      "mergeCells": {
        name: '合并单元格',
      },
      "hsep1": "---------", //提供分隔线
      "remove_row": {
        name: '删除行',
      },
      "remove_col": {
        name: '删除列',
      },
      "copy": {
        name: '复制'
      },
      "cut": {
        name: '剪切'
      },
      "freeze_column": {
        name: '固定列',
      },
      "unfreeze_column": {
        name: '取消列固定',
      },
      "hsep2": "---------",      // 自定义项：修改当前列名
      "rename_col": {
        name: '修改当前列名',
        callback: function (key: string, selection: any) {
          const col = selection[0].start.col;
          let columns = hotInstance.value?.getSettings().columns || [];
          // 深拷贝，避免直接改原对象
          columns = columns.map((colObj: any) => ({ ...colObj }));
          const oldName = columns[col]?.title || '';
          const newName = prompt('请输入新列名', oldName);
          if (newName && newName !== oldName) {
            columns[col].title = newName;
            hotInstance.value?.updateSettings({ columns });
          }
        }
      },
      'reedit_col': {
        name: '改变当前列编辑器类型',
        callback: function (key: string, selection: any) {
          const col = selection[0].start.col;
          if (hotInstance.value) {
            // 获取当前列配置并深拷贝
            const currentColumns = JSON.parse(JSON.stringify(hotInstance.value.getSettings().columns));
            const editorType = prompt('请输入编辑器类型（text/numeric/date/dropdown）', currentColumns[col]?.type || 'text');
            // 更新列配置
            currentColumns[col].type = editorType || 'text';
            // 批量更新设置
            hotInstance.value.updateSettings({
              columns: currentColumns
            });
          }
        }
      }

    }
  },
  manualColumnMove: true, // 允许手动移动列
  manualColumnResize: true, // 允许手动调整列宽
  mergeCells: [{
    row: 1,
    col: 1,
    rowspan: 2,
    colspan: 2
  }],
  // afterOnCellMouseDown(event:any, coords:any) {
  //   if (coords.row === -1) { // 点击表头
  //     const col = coords.col;
  //     const newName = prompt('请输入新列名', hotInstance.value?.getColHeader(col));
  //     if (newName) {
  //       let headers = hotInstance.value?.getColHeader();
  //       headers = Array.isArray(headers) ? [...headers] : Array.from(headers);
  //       headers[col] = newName;
  //       hotInstance.value?.updateSettings({ colHeaders: headers });
  //     }
  //   }
  // }

})

const handleExport = () => {
  if (hotTable.value) {
    const hot = (hotTable.value as any).hotInstance
    const data = hot.getData();
    const sourceData = hot.getSourceData();
    const columns = hotInstance.value.getSettings().columns;
    const mergedCellsPlugin = hot.getPlugin('mergeCells');
    const mergedCells = mergedCellsPlugin.mergedCellsCollection.mergedCells;

    const tableState = {
      data: data,
      sourceData: sourceData,
      columns: columns,
      mergedCells: mergedCells
    };
    console.log('表格状态:', JSON.stringify(tableState, null, 2));
    // 调用Element-UI Plus导出方法
    ElMessageBox.alert(JSON.stringify(tableState));
  }
}

// 在组件挂载后获取 handsontable 实例
onMounted(() => {
  if (hotTable.value) {
    const hot = (hotTable.value as any).hotInstance
    hotInstance.value = hot; // 保存实例
    console.log('Handsontable instance:', hotInstance);
    // 例如获取源数据或数据
    console.log('Source Data:', hotInstance.value?.getSourceData());
    console.log('Data:', hotInstance.value?.getData());
  }



});

</script>

<style scoped></style>
