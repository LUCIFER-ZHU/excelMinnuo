<template>
  <div>
    <!-- 编辑器容器 -->
    <div ref="editor" style="text-align: left"></div>
  </div>
</template>

<script>
import E from "wangeditor"; // 引入 wangEditor

export default {
  // name: "WangEditorDemo",
  data() {
    return {
      editor: null, // 编辑器实例
      editorContent: "", // 编辑器内容
    };
  },
  mounted() {
    this.initEditor(); // 初始化编辑器
  },
  methods: {
    initEditor() {
      // 创建编辑器实例
      this.editor = new E(this.$refs.editor);

      // 配置编辑器
      this.editor.config.menus = [
        "head",
        "bold",
        "fontSize",
        "fontName",
        "italic",
        "underline",
        "strikeThrough",
        "indent",
        "lineHeight",
        "foreColor",
        "backColor",
        "link",
        "list",
        "todo",
        "justify",
        "quote",
        "emoticon",
        "image", // 启用图片菜单
        "video",
        "table",
        "code",
        "splitLine",
        "undo",
        "redo",
      ];

      // 配置图片上传
      this.editor.config.uploadImgServer = this.$API_BASE_URL+'/file/upload'// 上传图片的接口地址
      this.editor.config.uploadFileName = "file"; // 上传文件的字段名
      this.editor.config.uploadImgMaxSize = 2 * 1024 * 1024; // 图片大小限制（2MB）
      this.editor.config.uploadImgMaxLength = 1000; // 最多上传图片数量
      this.editor.config.uploadImgTimeout = 5000; // 上传超时时间（5秒）

      // 监听图片上传成功
      this.editor.config.uploadImgHooks = {
        before: function (xhr, editor, files) {
          xhr.setRequestHeader('Content-Type', 'multipart/form-data');
          xhr.open('POST', editor.config.uploadImgServer, true);
          // 上传前的操作
          return true;
        },
        success: function (xhr, editor,result) {
          console.log("图片上传成功", result);
        },
        fail: function (xhr, editor, result) {
          console.log("图片上传失败", result);
        },
        error: function (xhr, editor) {
          console.log("图片上传出错");
        },
        timeout: function (xhr, editor) {
          console.log("图片上传超时");
        },
      };

      // 监听内容变化
      this.editor.config.onchange = (newHtml) => {
        this.editorContent = newHtml; // 更新编辑器内容
      };

      // 创建编辑器
      this.editor.create();

      // 设置初始内容（可选）
      this.editor.txt.html("");
    },
    loadData(text){
      this.editor.txt.html(text);
    },
    getContent(){
      return this.editorContent;
    },
    clear(){
      this.editor.txt.html("");
    }
  },
  beforeDestroy() {
    // 销毁编辑器实例
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }
  },
};
</script>
