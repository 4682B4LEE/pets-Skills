// 引入 Electron 模块
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// 主窗口引用
let mainWindow;

function createWindow() {
    // 获取主屏幕尺寸
    const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;

    // 创建浏览器窗口
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        // 透明背景
        transparent: true,
        // 无边框窗口
        frame: false,
        // 无阴影
        hasShadow: false,
        // 始终置顶
        alwaysOnTop: true,
        // 允许在全屏应用之上显示（macOS）
        visibleOnAllWorkspaces: true,
        // 不显示在程序坞中（可选，设为 false 则显示在程序坞）
        skipTaskbar: true,
        webPreferences: {
            // 启用预加载脚本
            preload: path.join(__dirname, 'preload.js'),
            // 允许在渲染进程中使用 Node API（为了 IPC 通信）
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    // 加载本地 HTML 文件
    mainWindow.loadFile('index.html');

    // 开发模式下打开开发者工具
    // mainWindow.webContents.openDevTools();

    // 窗口关闭时清理引用
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// 当 Electron 完成初始化并准备好创建窗口时调用
app.whenReady().then(() => {
    createWindow();

    // macOS 下点击程序坞图标时重新创建窗口
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// 所有窗口关闭时退出应用（Windows/Linux）
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC 监听：设置鼠标事件穿透
// 参数 ignore 为 true 时穿透，false 时恢复响应
ipcMain.on('set-ignore-mouse-events', (event, ignore) => {
    if (mainWindow) {
        // 设置 forward 为 true，让鼠标移动事件继续传递给页面（用于检测宠物区域）
        mainWindow.setIgnoreMouseEvents(ignore, { forward: true });
    }
});
