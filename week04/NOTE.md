# 每周总结可以写在这里

重学 JavaScript | 结构化（一）


###事件循环
事件循环不属于JavaScript引擎实现的东西，而是由浏览器或node js宿主环境实现的

### 宏任务与微任务
setTimeout会产生宏任务
每个宏任务里有一个微任务列表，列表里的所有微任务执行完才会执行下一个宏任务
Promise的then方法以及async函数里的await会将一个微任务入队，微任务列表里的微任务按入队顺序执行


### 示例

```
  // 打印顺序 0 4 5 -2 1 -1 2 3
  async function afoo() {
    // 同步代码
    console.log(-2);
    await new Promise(resolve => resolve())
    // 微任务
    console.log(-1);
  }
  
  new Promise(resolve => (console.log(0, resolve()))).then(() => (console.log(1), 
  new Promise(resolve => resolve()).then(()=> console.log(1.5))));

  // setTimeout是宏任务
  setTimeout(() => {
    // setTimeout宏任务里的微任务
    new Promise(resolve => resolve()).then(() => console.log(3));
    console.log(2)
  }, 0)

  console.log(4);
  console.log(5);
  afoo();

```

- 宏任务
   - 0， 4， 5， -2
      - 入对 1， -1
   - 1 
       - 入对 1.5
   - -1 
   - 1.5
- 宏任务
    - 2
    - 3


### 参考

[详解JavaScript中的Event Loop（事件循环）机制](https://zhuanlan.zhihu.com/p/33058983)
[理解 Event Loop、Micro Task & Macro Task](https://zhuanlan.zhihu.com/p/28051505)


### 结构化程序设计

#### js执行粒度

- js context => realm
- 宏任务
- 微任务(Promise)
- 函数调用（Execution Context）
- 语句/声明
- 表达式
- 直接量、变量、this



