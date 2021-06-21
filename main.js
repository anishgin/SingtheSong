const electron = require('electron')
const {Menu, app, BrowserWindow} = electron
const {remote} = electron
const ipcMain = electron.ipcMain;

const ipc = electron.ipcMain
const dialog = electron.dialog

const path = require('path')
const url = require('url')

var print_data
var data_viewer

const template = [
  {
    label: 'Edit',
    submenu: [
       {
          role: 'undo'
       },
       {
          role: 'redo'
       },
       {
          type: 'separator'
       },
       {
          role: 'cut'
       },
       {
          role: 'copy'
       },
       {
          role: 'paste'
       }
    ]
 },
 {
  role: 'window',
  submenu: [
     {
        role: 'minimize'
     },
     {
        role: 'close'
     }
  ]
},

  {
      label: 'About',
      click() {
        openAboutWindow()
      }
  },
]

var about_menu = Menu.buildFromTemplate(template)


function openAboutWindow() {
  win_about = new BrowserWindow({ width: 300, height:350, frame: false, webPreferences: {nodeIntegration: true}})
  win_about.loadURL(url.format({
        pathname: path.join(__dirname, '/html/about.html'),
        protocol: 'file',
        slashes: true
      })) 
  //win_about.webContents.openDevTools()
}

function createWindow() {
    console.log('Going to create Windows')

    //Menu.setApplicationMenu(about_menu); 

    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    win = new BrowserWindow({width: width, height:height, 
        //backgroundColor: '#2e2c29',
        webPreferences: {nodeIntegration: true, contextIsolation: false},
        icon:  path.join(__dirname, '/images/prayer_icon.png')  })
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }))
        win.maximize()


// receive message from angu.html 

ipc.on('data-view', function(event, arg){
   const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    console.log(arg)
    data_viewer = arg
   winPrint = new BrowserWindow({ width: width, height:height, webPreferences: {nodeIntegration: true}  })
   winPrint.loadURL(url.format({
   pathname: path.join(__dirname, '/html/data-full-view.html'),
   protocol: 'file',
   slashes: true
}))
winPrint.maximize()

})


ipc.on('open-search-window', function(event, arg){
   //const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    console.log(arg)
    console.log("Open Searching Window")
    data_viewer = arg
   winPrint = new BrowserWindow({ width: 600, height:400, 
            webPreferences: {nodeIntegration: true, contextIsolation: false}
   })
   winPrint.loadURL(url.format({
   pathname: path.join(__dirname, 'html/search_song.html'),
   protocol: 'file',
   slashes: true
}))
//winPrint.maximize()

})


ipc.handle('get_data_view', async (event, someArgument) => {
    //const result = await doSomeWork(someArgument)
    console.log(someArgument)
    return [data_viewer]
  })

// Register an event listener. When ipcRenderer sends mouse click co-ordinates, show menu at that position.
ipcMain.on(`display-app-menu`, function(e, args) {
    if (isWindows && mainWindow) {
      menu.popup({
        window: mainWindow,
        x: args.x,
        y: args.y
      });
    }
  });
  

}

app.on('ready', function(){
    createWindow()
})

