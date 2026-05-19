// 预加载脚本：在渲染进程加载前执行，用于安全地暴露主进程 API
const { contextBridge, ipcRenderer } = require('electron');

// 将 IPC 通信方法暴露给渲染进程（前端页面）
contextBridge.exposeInMainWorld('electronAPI', {
    // 设置鼠标穿透状态
    setIgnoreMouseEvents: (ignore) => ipcRenderer.send('set-ignore-mouse-events', ignore)
});
