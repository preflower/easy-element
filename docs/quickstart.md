# Easy Element
`easy-element` 是基于 `Element-UI` 再封装的 JSON 化组件库，用来解决 `Element-UI` 部分组件经常性的重复劳动问题；
主旨是用最少的学习成本，写最轻量的代码

## 开始使用

### 通过npm安装
推荐使用npm的方式安装

```bash
npm i @preflower/element element-ui -S
```

### 通过CDN安装
```bash
<!-- 引入组件库 -->
<script src="https://unpkg.com/@preflower/element/dist/easy-element.umd.min.js"></script>
```

### 完整引入
```javascript
import Vue from 'vue'
import EasyElement from '@preflower/element'

Vue.use(EasyElement)
```

### 按需引入
```javascript
import Vue from 'vue'
import { Table } from '@preflower/element'

Vue.component('i-table', Table)
```
