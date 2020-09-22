## Javascript结构化

### Realm

#### 对象分类

- 宿主对象 (Host Objects): JavaScript 宿主环境提供的对象
   - window
      - 一部分来自js
      - 一部分来自浏览器
- 内置对象(Build-in Objects): Javascript语言提供
     - 固有对象(Intrinsic Objects): 标准规定，随着Javascript运行时创建而自动创建的对象实例
         - js执行前就创建，类似基础库
  - 原生对象(Native Ojects): 用户通过Array RegExp等内置构造器或特殊语法创建
      ![](native-objects.png)
     - 可以new创建新的对象
     - 无法通过class/extend或纯js代码实现
     - 这些构造器创建的对象使用了 私有字段，无法被原型继承
- 普通对象 (Ordinary Objects): 由 {} Object 构造器 或 class 创建，能够被原型继承

### 对象模拟函数和构造器

通过 私有字段 模拟

  - 函数对象
       - [[call]]
  - 构造器对象
       - [[construst]]

  实现 [[call]] 和 [[construct]] 行为不一致
 ```
	 new Date() // object
	Date() // string
	
	new Image() // object
	Image() // error
 ```


### 获取全部固有对象

标准中全部对象的定义，规定了以下全局对象的属性。查找这些对象的 属性 和 Getter/Setter，就可以获得所有 固有对象

- 三个值
   - Infinity
   - NaN
   - undefined
- 九个函数
   - eval
   - isFinite
   - isNaN
   - parseFloat
   - parseInt
   - decodeURI
   - decodeURIComponent
   - encodeURI
   - encodeURIComponent
- 一些构造器
   - Array
   - Date
   - RegExp
   - Promise
   - Proxy
   - Map
   - WeakMap
   - Set
   - WeakSet
   - Function
   - Boolean
   - String
   - Number
   - Symbol
   - Object
   - Error
   - EvalError
   - RangeError
   - ReferenceError
   - SyntaxError
   - TypeError
   - URIError
   - ArrayBuffer
   - SharedArrayBuffer
   - DataView
   - Typed Array
   - Float32Array
   - Float64Array
   - Int8Array
   - nt16Array
   - Int32Array
   - UInt8Array
   - UInt16Array
   - UInt32Array
   - UInt8ClampedArray
- 四个用于当作命名空间的对象
   - Atomics
   - JSON
   - Math
   - Reflect

   
 

