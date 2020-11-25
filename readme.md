# Huffman Tree
## 软件信息
### 作者

[点击直接访问app网站](http://chibiken.cn:8055/)

田璞尧 scu se 2018141482233
### 开发语言
html javascript
### 开发环境
IntelliJ IDEA 2020.2
## 使用说明
### 如何运行
打开此文件夹，点开index.html，即可运行
### 如何使用
#### 编码
1. 选择输入文本或者上传文件
2. 生成哈夫曼树的编码表示
#### 解码：
1. 选择输入文本或者上传二进制文件
2. 输出该二进制文件的解码
## 代码说明
### 代码结构
1. index.html和css布局整个页面
2. huffmanTree.cs负责读取字符串，分析字符频率，生成huffman树，以及解码工作
3. bootstrap.min.css和jquery-3.5.1.min.js为工具文件
### 代码函数详情
#### index.html
1. header的js部分在页面加载完后启动(借助jQuery)，有3个函数：
    1. uploadText
    负责上传用户输入的文字，传输给huffmanTree.js
    2. uploadFile
    负责上传用户上传的文件，传输给huffmanTree.js
    3. uploadCode
    负责上传用户上传的01编码， 传输给huffmanTree.js
    
2. body部分是html代码，负责整个页面组件的布局，利用了css来美化

#### index.css
负责美化index.html的组件，使页面清晰

#### huffmanTree.js
1. getFreq
    接收一个字符串，返回各个字符的出现次数的对象，这个函数为buildHT服务
2. findMinIndex
    找到字符中最少出现的那一个字符，这个函数为buildHT服务
3. buildHTl
    这个函数，负责从getFreq接收到的对象，建立huffman树，是主要函数
4. getDecode
    从接收到的01编码，生成字符串