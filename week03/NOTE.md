# 每周总结可以写在这里

### Object 对象
```
万物皆对象o(╯□╰)o，任一对象都是唯一存在的，与本身的状态无关，即使状态完全一致的两个对象，也并不相等。状态描述对象，状态的改变就叫做行为。
```
- 面向对象三要素
    - 状态 state
    - 行为 behavior
    - 唯一性 indentifier

#### 基于class的面向对象
- “分类” 单继承结构，会有一个基类Object
    - 多继承
    - interface
    - mixin
- “归类”

#### Property 属性 Object可以有多个属性
- 通常使用key:value形式表示
- Data Property 数据型
    + [[value]]
    + writable
    + enumerable 
    + cofigurable
- Accessor Property 访问型
    + get
    + set
    + enumerable
    + configurable
#### [[Prototype]] 原型 只有一个原型

#### API/Grammar 语法
- {} . [] Object.defineProperty 最基本的面向对象能力
- Object.create / Object.setPrototypeOf / Object.getPrototypeOf 
- new / class / extends 基于类的面向对象编程
- new / function / prototype ???弃子

#### Function Object
- 具备[[call]]行为

#### Special Object 
-- TODO