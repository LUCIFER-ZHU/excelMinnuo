<template>
  <div>
    <input type="file" @change="handleFileChange" accept="image/*,video/*" multiple style="display:none;" ref="fileInput" />
    <div class="editor"></div>
  </div>
</template>

<script>
  import Quill from 'quill'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'
  import { uploadMedia, deleteMedia, getMediaUrl, getMediaUrl2 } from '../utils/quill'

   const titleConfig = {
     'ql-bold': '加粗',
     'ql-color': '颜色',
     'ql-font': '字体',
     'ql-code': '插入代码',
     'ql-italic': '斜体',
     'ql-link': '添加链接',
     'ql-background': '颜色',
     'ql-size': '字体大小',
     'ql-strike': '删除线',
     'ql-script': '上标/下标',
     'ql-underline': '下划线',
     'ql-blockquote': '引用',
     'ql-header': '标题',
     'ql-indent': '缩进',
     'ql-list': '列表',
     'ql-align': '文本对齐',
     'ql-direction': '文本方向',
     'ql-code-block': '代码块',
     'ql-formula': '公式',
     'ql-image': '图片',
     'ql-video': '视频',
     'ql-clean': '清除字体样式',
     'ql-upload': '文件',
     'ql-table': '插入表格',
     'ql-table-insert-row': '插入行',
     'ql-table-insert-column': '插入列',
     'ql-table-delete-row': '删除行',
     'ql-table-delete-column': '删除列'
   }
   export default {
      name: 'Editor',
      props: {
        value: {},
        where: {
          type: String,
          default: ''
        }
      },
     data() {
       return {
        quill: null,
        insertedMediaUrls: [],
        options: {
           theme: 'snow',
           modules: {
              toolbar: {
                container: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
                  ['link', 'image', 'video'], // 链接、图片、视频
                  ['blockquote', 'code-block'], // 引用  代码块
                  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
                  [{ script: 'super' }, { script: 'sub' }], // 上标/下标
                  [{ indent: '-1' }, { indent: '+1' }], // 缩进
                  //  [{'direction': 'rtl'}],                         // 文本方向
                  //  [{ size: ["small", false, "large", "huge"] }], // 字体大小
                    // 标题
                  //  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                  [{ font: [] }], // 字体种类
                  [{ align: [] }], // 对齐方式
                  ['clean'], // 清除文本格式
                  [
                    { table: 'TD' },
                    { 'table-insert-row': 'TIR' },
                    { 'table-insert-column': 'TIC' },
                    { 'table-delete-row': 'TDR' },
                    { 'table-delete-column': 'TDC' }
                  ]
               ],
               handlers: {
                 image: () => this.selectFile(),
                 table: function (val) {
                   this.quill.getModule('table').insertTable(3, 3)
                 },
                 'table-insert-row': function () {
                   this.quill.getModule('table').insertRowBelow()
                 },
                 'table-insert-column': function () {
                   this.quill.getModule('table').insertColumnRight()
                 },
                 'table-delete-row': function () {
                   this.quill.getModule('table').deleteRow()
                 },
                 'table-delete-column': function () {
                   this.quill.getModule('table').deleteColumn()
                 }
               }
             },
             table: true
           },
          // readOnly: true, //是否只读
           placeholder: '请输入内容'
         }
       }
     },
     methods: {
      getContent(){
        return this.quill.root.innerHTML;
      },
      clearText() {
        this.quill.setContents([])
        this.$emit('contentData', this.quill.root.innerHTML)
      },
      initText(text) {
        this.quill.clipboard.dangerouslyPasteHTML(this.quill.getLength() - 1, text, 'silent')
        this.$emit('contentData', this.quill.root.innerHTML)
      },
      // 触发文件选择框
       selectFile() {
          this.$refs.fileInput.click() // 点击隐藏的文件输入框，弹出选择框
       },
       addQuillTitle() {
         const oToolBar = document.querySelector('.ql-toolbar')
         const aButton = oToolBar.querySelectorAll('button')
         const aSelect = oToolBar.querySelectorAll('select')
         aButton.forEach(function (item) {
           if (item.className === 'ql-script') {
              item.value === 'sub' ? (item.title = '下标') : (item.title = '上标')
           } else if (item.className === 'ql-indent') {
              item.value === '+1' ? (item.title = '向右缩进') : (item.title = '向左缩进')
           } else {
              item.title = titleConfig[item.classList[0]]
           }
         })
         aSelect.forEach(function (item) {
           item.parentNode.title = titleConfig[item.classList[0]]
         })
       },
       // 接收富文本编辑器中的数据
        onEditorChange1(val, data) {
          this.detail[data] = val
        },
       getContentData() {
         return this.quill.getContents()
       },
       // 处理文件选择后的上传操作
       async handleFileChange(event) {
        const files = event.target.files
         // 获取文件
         for (let i = 0; i < files.length; i++) {
           const file = files[i]
           try {
             // 调用封装好的 uploadMedia 服务方法上传文件
             const url = await uploadMedia(file, this.where)
             // 上传成功后插入媒体到编辑器中
             this.insertMedia(url.data, file.type)
             this.insertedMediaUrls.push(url.data)
             this.$emit('update:mediaUrls', this.insertedMediaUrls)
           } catch (error) {
             console.error('文件上传失败:', error) // 错误处理
           }
         }
       },
       // 在编辑器中插入媒体（图片或视频）
       insertMedia(url, fileType) {
        //  const dom = this.$el.querySelector('.editor')
        const range = this.quill.getSelection()

        //  判断
         if (fileType.startsWith('image')) {
        //   //  const urls = getMediaUrl2('images',url)
           const urls = this.$getOSSPrefix(url)
           const imageTag = `<img src="${urls}"width="320px" height="240px alt="image">`
          //  this.$refs.editor.quill.clipboard.dangerouslyPasteHTML(range.index, imageTag);
          this.quill.clipboard.dangerouslyPasteHTML(range.index, imageTag)// 插入图片
         }

        //  else if (fileType.startsWith('video')) {
        //    const urls = getMediaUrl2('videos',url)
        //    const videoTag = `<video width="320" height="240"><source controls src="${urls}" type="video/mp4"></video>`;
        //    this.$refs.editor.quill.clipboard.dangerouslyPasteHTML(range.index, videoTag); // 插入视频
        //   //  this.$refs.editor.quill.clipboard.insertEmbed(range.index, 'video', urls);
        //  }
       },

      //  删除编辑器中的文件，并删除后端存储的文件
       async deleteFile(filePath) {
         try {
           // 调用封装好的 deleteMedia 服务方法删除文件
           await deleteMedia(filePath)
         } catch (error) {
           console.error('文件删除失败:', error) // 错误处理
         }
       },
       // 检查编辑器内容中是否有已删除的媒体文件
      checkForDeletedMedia() {
        // 获取当前编辑器内容的 HTML
        const editorContent = this.quill.root.innerHTML

        // 遍历 insertedMediaUrls 数组中的每个 URL
        this.insertedMediaUrls.forEach((url) => {
          // const urls = getMediaUrl2('image',url)
          const checkURL = this.$getOSSPrefix(url)
          // // 检查当前编辑器内容是否包含该 URL
          if (!editorContent.includes(checkURL)) {
            // const fileType = urls.includes('image') ? 'image' : 'video';
            // 如果URL不在则调用删除接口
            this.deleteFile(url)

            // 从 insertedMediaUrls 数组中移除该 URL
            this.insertedMediaUrls = this.insertedMediaUrls.filter(item => item !== url)
            // 触发父组件的更新事件，更新父组件中的媒体文件数组
            this.$emit('update:mediaUrls', this.insertedMediaUrls)
          }
        })
      },
      setInsertedMediaUrls(arry) {
        this.insertedMediaUrls = arry
      },
      clearEditorSilently() {
        this.quill.setContents([], 'silent')
        this.insertedMediaUrls = []
      }
     },
     mounted() {
      const dom = this.$el.querySelector('.editor')
      this.quill = new Quill(dom, this.options)

       // this.quill.setContents(this.value) //detla格式数据
       // this.quill.setText(this.value) //纯文本
      this.quill.clipboard.dangerouslyPasteHTML(0, this.value) // html格式数据
      // 当文本内容发生改变时回调的函数
      this.quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          this.checkForDeletedMedia()
        }
        // 当内容发生改变的时候
         // console.log(this.quill.getContents())//detla格式数据
         // this.$emit('contentData', this.quill.getContents())
         // console.log(this.quill.root.innerHTML)//html格式数据
        this.$emit('contentData', this.quill.root.innerHTML)
      })

      // 表格的四个编辑样式
       this.$el.querySelector(
         '.ql-table-insert-row'
       ).innerHTML = `<svg t="1591862376726" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6306" width="18" height="200"><path d="M500.8 604.779L267.307 371.392l-45.227 45.27 278.741 278.613L779.307 416.66l-45.248-45.248z" p-id="6307"></path></svg>`
       this.$el.querySelector(
         '.ql-table-insert-column'
       ).innerHTML = `<svg t="1591862238963" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6509" width="18" height="200"><path d="M593.450667 512.128L360.064 278.613333l45.290667-45.226666 278.613333 278.762666L405.333333 790.613333l-45.226666-45.269333z" p-id="6510"></path></svg>`
       this.$el.querySelector(
         '.ql-table-delete-row'
       ).innerHTML = `<svg t="1591862253524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6632" width="18" height="200"><path d="M500.8 461.909333L267.306667 695.296l-45.226667-45.269333 278.741333-278.613334L779.306667 650.026667l-45.248 45.226666z" p-id="6633"></path></svg>`
       this.$el.querySelector(
         '.ql-table-delete-column'
       ).innerHTML = `<svg t="1591862261059" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6755" width="18" height="200"><path d="M641.28 278.613333l-45.226667-45.226666-278.634666 278.762666 278.613333 278.485334 45.248-45.269334-233.365333-233.237333z" p-id="6756"></path></svg>`
       this.addQuillTitle()
     }
   }
</script>
