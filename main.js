const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

// Listen for the app to be ready
app.on('ready', function(){
    //create new window
    mainWindow = new BrowserWindow({});
    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true

    })); 
//Quit app when closed
mainWindow.on('closed', function(){
    app.quit();
});
    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert Menu
    Menu.setApplicationMenu(mainMenu);
});
// Handle create add Menu(for variable selection)
function createAddWindow(){
    //create new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: "Select a Variable for the Calculation"
    });
    //load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    //Garbage collection handle
    addWindow.on('close', function(){
        addWindow = null;
    })
};
//Create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu: [
            {
                label: 'Select Variable',
                accelerator: process.platform == 'darwin' ? 'Command+S': 'Ctrl+S',
click(){
    createAddWindow();
}
            },
            {
                label: 'Definite Integral'
            },
            {
                label: 'Clear',
                accelerator: process.platform == 'darwin' ? 'Command+W': 'Ctrl+W',
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q': 'Ctrl+Q',
                click(){
                    app.quit();
                }
            },
        ]
    }
];

//if mac add ampty obj to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// Add developer tools item
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I': 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
            role: 'reload'
            }
        ]
    });
}