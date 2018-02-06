# dragScroll
使web浏览器内置横向滚动支持鼠标点击拖动

## 使用
没有发布任何的包管理平台，请自行置入项目
```
new DragScroll({
    ele: '.container',
    decayTime: 0.5
})
```
## 参数

|     参数    |  描述  |
| --------   | :----:  |
|   ele   |   容器选择器     |
|   decayTime      |   缓动衰减时间系数(0 ~ 1)   |
|   bufferDis      |   缓动距离(0 ~ 90 )(不建议设置)   |

## PS
没有处理浏览器兼容性，没有做移动端缓动适配，没有。。。
请自行开发，:laugh: