<template>
  <div class="electronic-signature-container">
    <div class="signature-header">
      <h3 class="signature-title">电子签名</h3>
      <p class="signature-tip">请在下方区域进行签名</p>
    </div>

    <div class="signature-wrapper" ref="signatureWrapper">
      <VueSignaturePad
        ref="signaturePad"
        class="signature-pad"
        :width="canvasWidth"
        :height="canvasHeight"
        :options="signatureOptions"
        @begin="onSignatureBegin"
        @end="onSignatureEnd"
      />
    </div>

    <div class="signature-actions">
      <button class="action-btn clear-btn" @click="clearSignature">
        <span class="btn-icon">🗑️</span>
        <span class="btn-text">清除</span>
      </button>
      <button class="action-btn undo-btn" @click="undoSignature" :disabled="!hasSignature">
        <span class="btn-icon">↩️</span>
        <span class="btn-text">撤销</span>
      </button>
      <button class="action-btn save-btn" @click="saveSignature" :disabled="!hasSignature">
        <span class="btn-icon">💾</span>
        <span class="btn-text">保存</span>
      </button>
      <button class="action-btn download-btn" @click="downloadSignature" :disabled="!hasSignature">
        <span class="btn-icon">⬇️</span>
        <span class="btn-text">下载</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { VueSignaturePad } from 'vue-signature-pad';

const signaturePad = ref(null);
const signatureWrapper = ref(null);
const savedSignature = ref('');
const hasSignature = ref(false);
const canvasWidth = ref('100%');
const canvasHeight = ref('400px');

/**
 * 签名板配置选项
 * @type {Object}
 */
const signatureOptions = {
  penColor: '#000000',
  backgroundColor: 'rgba(255,255,255,0)',
  minWidth: 0.5,
  maxWidth: 2.5,
  throttle: 16,
  minDistance: 5,
  velocityFilterWeight: 0.7,
  onBegin: () => {
    hasSignature.value = true;
  }
};

/**
 * 签名开始事件处理
 * 当用户开始签名时触发
 */
const onSignatureBegin = () => {
  hasSignature.value = true;
};

/**
 * 签名结束事件处理
 * 当用户结束签名时触发
 */
const onSignatureEnd = () => {
  hasSignature.value = !signaturePad.value.isEmpty();
};

/**
 * 清除签名
 * 清空签名板上的所有内容
 */
const clearSignature = () => {
  if (signaturePad.value) {
    signaturePad.value.clearSignature();
    hasSignature.value = false;
    savedSignature.value = '';
  }
};

/**
 * 撤销上一步签名操作
 * 移除最后绘制的一笔
 */
const undoSignature = () => {
  if (signaturePad.value) {
    signaturePad.value.undoSignature();
    hasSignature.value = !signaturePad.value.isEmpty();
  }
};

/**
 * 保存签名
 * 将签名转换为base64格式的图片数据并打印到控制台
 * @returns {Object} 包含isEmpty和data的对象
 */
const saveSignature = () => {
  if (signaturePad.value) {
    const { isEmpty, data } = signaturePad.value.saveSignature('image/png');
    if (!isEmpty) {
      savedSignature.value = data;
      hasSignature.value = true;
      console.log('签名Base64数据:', data);
      return { isEmpty, data };
    }
  }
  return { isEmpty: true, data: '' };
};

/**
 * 下载签名图片
 * 直接从签名板获取数据并下载为PNG格式图片
 */
const downloadSignature = () => {
  if (signaturePad.value && !signaturePad.value.isEmpty()) {
    const { isEmpty, data } = signaturePad.value.saveSignature('image/png');
    if (!isEmpty) {
      const byteCharacters = atob(data.split(',')[1]);
      const byteArrays = [];
      const sliceSize = 512;
      
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      
      const blob = new Blob(byteArrays, { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `signature_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }
};

/**
 * 获取签名数据
 * @returns {Object} 包含isEmpty和data的对象
 */
const getSignatureData = () => {
  if (signaturePad.value) {
    const { isEmpty, data } = signaturePad.value.saveSignature('image/png');
    return { isEmpty, data };
  }
  return { isEmpty: true, data: '' };
};

/**
 * 从数据URL加载签名
 * @param {string} dataUrl - 签名的base64数据
 * @param {Object} options - 加载选项
 */
const loadSignature = (dataUrl, options = {}) => {
  if (signaturePad.value) {
    signaturePad.value.fromDataURL(dataUrl, options);
    hasSignature.value = true;
  }
};

/**
 * 检查签名是否为空
 * @returns {boolean} 签名是否为空
 */
const isSignatureEmpty = () => {
  return signaturePad.value ? signaturePad.value.isEmpty() : true;
};

/**
 * 调整签名板尺寸以适应屏幕
 * 根据设备类型和屏幕尺寸自动调整签名板大小
 */
const adjustSignaturePadSize = () => {
  const wrapper = signatureWrapper.value;
  if (wrapper) {
    const width = wrapper.clientWidth;
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      canvasHeight.value = '300px';
    } else {
      canvasHeight.value = '400px';
    }
  }
};

/**
 * 窗口大小改变事件处理
 * 当窗口大小改变时调整签名板尺寸
 */
const handleResize = () => {
  adjustSignaturePadSize();
};

/**
 * 组件挂载时初始化
 * 设置窗口大小监听器并调整签名板尺寸
 */
onMounted(() => {
  window.addEventListener('resize', handleResize);
  nextTick(() => {
    adjustSignaturePadSize();
  });
});

/**
 * 组件卸载前清理
 * 移除窗口大小监听器
 */
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

defineExpose({
  clearSignature,
  undoSignature,
  saveSignature,
  getSignatureData,
  loadSignature,
  isSignatureEmpty
});
</script>

<style scoped>
.electronic-signature-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.signature-header {
  text-align: center;
  margin-bottom: 20px;
}

.signature-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.signature-tip {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.signature-wrapper {
  width: 100%;
  border: 2px dashed #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fafafa;
}

.signature-pad {
  width: 100%;
  height: 100%;
  touch-action: none;
}

.signature-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.clear-btn {
  background: #f5f5f5;
  color: #666;
}

.clear-btn:hover:not(:disabled) {
  background: #e0e0e0;
}

.undo-btn {
  background: #e3f2fd;
  color: #1976d2;
}

.undo-btn:hover:not(:disabled) {
  background: #bbdefb;
}

.save-btn {
  background: #4caf50;
  color: white;
}

.save-btn:hover:not(:disabled) {
  background: #45a049;
}

.btn-icon {
  font-size: 16px;
}

.btn-text {
  font-size: 14px;
}

.download-btn {
  background: #2196f3;
  color: white;
}

.download-btn:hover:not(:disabled) {
  background: #1976d2;
}

@media (max-width: 768px) {
  .electronic-signature-container {
    padding: 16px;
    border-radius: 8px;
  }

  .signature-title {
    font-size: 20px;
  }

  .signature-tip {
    font-size: 12px;
  }

  .signature-actions {
    gap: 8px;
  }

  .action-btn {
    padding: 8px 16px;
    min-width: 80px;
    font-size: 13px;
  }

  .btn-icon {
    font-size: 14px;
  }

  .btn-text {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .electronic-signature-container {
    padding: 12px;
  }

  .signature-title {
    font-size: 18px;
  }

  .signature-actions {
    gap: 6px;
  }

  .action-btn {
    padding: 8px 12px;
    min-width: 70px;
  }
}
</style>
