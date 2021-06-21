var electron = require('electron');
const {remote} = require('electron')
const ipc = electron.ipcRenderer



var myApp = angular.module('myApp',[]);

myApp.controller('MyCtrl', function ($window) {
  var vm = this;
  vm.openWindow = function(){
    //$window.open('html/search_song.html', 
    //'Search Song', 
    //'nodeIntegration=true,contextIsolation=false,enableRemoteModule=true,toolbar=yes,scrollbars=no,resizable=yes,top=100,left=500,width=600,height=400');
    ipc.send('open-search-window', "result[0]")
  }
});
