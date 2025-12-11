// 带有明确规则级别的简化 ESLint 配置
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      // 使用 "off" 或 0 来完全禁用规则
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-unused-vars': 0,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-empty-interface': 0,
      'no-console': 0,
      'no-debugger': 0,
      'no-unused-vars': 0,
      'no-undef': 0,
      'vue/multi-word-component-names': 0,
      'no-empty': 0,
      'no-constant-condition': 0
    },
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  // 添加 Vue 基本配置
  ...pluginVue.configs['flat/essential'],
  {
    // 覆盖 Vue 配置中的规则
    ...vueTsEslintConfig()[0],
    rules: {
      ...(vueTsEslintConfig()[0]?.rules || {}),
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-unused-vars': 0,
    }
  },
  ...(vueTsEslintConfig().slice(1) || [])
]
