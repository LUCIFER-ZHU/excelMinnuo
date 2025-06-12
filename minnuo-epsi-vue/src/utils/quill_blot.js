// videoBlot.js 文件内容
import { Quill } from 'quill';

// 创建自定义 Video Blot
const BlockEmbed = Quill.import('blots/block/embed');

class VideoBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute('controls', true);
    node.setAttribute('src', value);
    node.setAttribute('width', '320px');
    node.setAttribute('height', '240px');
    return node;
  }

  static value(node) {
    return node.getAttribute('src');
  }
}

// 设置 blotName 和 tagName
VideoBlot.blotName = 'video';
VideoBlot.tagName = 'video';

// 注册 VideoBlot，使其成为 Quill 的可用 Blot
Quill.register(VideoBlot);

export default VideoBlot;