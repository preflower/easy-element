# Easy Element
`easy-element` 是基于 `Element-UI` 再封装的 JSON 化组件库，用来解决 `Element-UI` 部分组件经常性的重复劳动问题

## 开始使用

### 安装

```bash
npm i @preflower/element element-ui -S
```

### 完整引入
```
import Vue from 'vue'
import EasyElement from '@preflower/element'

Vue.use(EasyElement)
```

### 按需引入
```
import Vue from 'vue'
import { Table } from '@preflower/element'

Vue.component('i-table', Table)
```
