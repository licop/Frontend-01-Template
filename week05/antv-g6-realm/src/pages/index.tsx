import React from 'react';
import G6 from '@antv/g6';
import styles from './index.less';
import { ChildrenItem } from './data.d';

export default class Index extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
    this.getAllRealmObjects = this.getAllRealmObjects.bind(this);
  }

  componentDidMount() {
    const data = {
      id: 'root',
      children: [
        {
          id: 'subTree1',
          children: []
        },
        {
          id: 'subTree2',
          children: [{
            id: 'ssubTree2',
            children: []
          }, {
            id: 'ssubTree3',
            children: []
          }]
        }
      ]
    };
    // 获取所有的 Global Objects 数据
    const realmData = this.getAllRealmObjects();
    this.initChart(realmData);
  }

  // 获取所有的 Global Objects 数据
  getAllRealmObjects() {
    const objects: string[] = [
      'eval',
      'isFinite',
      'isNaN',
      'parseFloat',
      'parseInt',
      'decodeURI',
      'decodeURIComponent',
      'encodeURI',
      'encodeURIComponent',
      'Array',
      // 'Date',
      // 'RegExp',
      // 'Promise',
      // 'Proxy',
      // 'Map',
      // 'WeakMap',
      // 'Set',
      // 'WeakSet',
      // 'Function',
      // 'Boolean',
      // 'String',
      // 'Number',
      // 'Symbol',
      // 'Object',
      // 'Error',
      // 'EvalError',
      // 'RangeError',
      // 'ReferenceError',
      // 'SyntaxError',
      // 'TypeError',
      // 'URIError',
      // 'ArrayBuffer',
      // 'SharedArrayBuffer',
      // 'DataView',
      // 'Float32Array',
      // 'Float64Array',
      // 'Int8Array',
      // 'Int16Array',
      // 'Int32Array',
      // 'Uint8Array',
      // 'Uint16Array',
      // 'Uint32Array',
      // 'Uint8ClampedArray',
      // 'Atomics',
      // 'JSON',
      // 'Math',
      // 'Reflect',
    ];

    const set = new Set();

    const globalObject: ChildrenItem = {
      id: 'Global Object',
      children: [],
    };

    for (let i of objects) {
      globalObject.children.push({
        children: [],
        id: i,
      });
    }

    for (let i = 0; i < objects.length; i++) {
      const current: any = objects[i];
      if (set.has(objects[i])) continue;
      set.add(objects[i]);
      for (let p of Object.getOwnPropertyNames(window[current])) {
        let d: any = Object.getOwnPropertyDescriptor(window[current], p);
        if (
          d.hasOwnProperty('value') &&
          ((d.value !== null && typeof d.value === 'object') ||
            typeof d.value === 'function') &&
          d.value instanceof Object
        ) {
          let childrenThird = [];
          for (let k of Object.getOwnPropertyNames(d.value)) {
            if (k !== 'name' && k !== 'length') {
              childrenThird.push({ id: k, children: [] });
            }
          }
          globalObject['children'][i].children.push({
            children: childrenThird,
            id: p,
          });
        }
        if (d.hasOwnProperty('get') && typeof d.get === 'function') {
          let childrenThird = [];
          for (let k of Object.getOwnPropertyNames(d.get)) {
            if (k !== 'name' && k !== 'length') {
              childrenThird.push({ id: k, children: [] });
            }
          }
          globalObject['children'][i].children.push({
            children: childrenThird,
            id: p,
          });
        }
        if (d.hasOwnProperty('set') && typeof d.set === 'function') {
          let childrenThird = [];
          for (let k of Object.getOwnPropertyNames(d.set)) {
            if (k !== 'name' && k !== 'length') {
              childrenThird.push({ id: k });
            }
          }
          globalObject['children'][i].children.push({
            children: childrenThird,
            id: p,
          });
        }
      }
    }
    console.log(globalObject);
    return globalObject;
  }

  initChart(data: any) {
    const width = window.devicePixelRatio * window.screen.width * 0.5;
    const height = window.devicePixelRatio * window.screen.height;
    const graph = new G6.TreeGraph({
      container: 'container',
      width,
      height,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const data = item.get('model').data;
              data.collapsed = collapsed;
              return true;
            },
          },
          'drag-canvas',
          'zoom-canvas',
        ],
      },
      defaultNode: {
        size: 26,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
        style: {
          fill: '#C6E5FF',
          stroke: '#5B8FF9',
        },
      },
      defaultEdge: {
        type: 'cubic-horizontal',
        style: {
          stroke: '#A3B1BF',
        },
      },
      layout: {
        type: 'dendrogram',
        direction: 'LR', // H / V / LR / RL / TB / BT
        nodeSep: 30,
        rankSep: 100,
      },
    });

    graph.node(function (node) {
      return {
        label: node.id,
        labelCfg: {
          position: node.children && node.children.length > 0 ? 'left' : 'right',
          offset: 5,
        },
      };
    });

    graph.data(data);
    graph.render();
    graph.fitView();
  }

  render() {
    return <div id="container" />;
  }
}
