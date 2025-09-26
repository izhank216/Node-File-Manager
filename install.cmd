@echo off
setlocal

set NFM_HOME=%~dp0\nfm_home
echo NFM_HOME has been set to %NFM_HOME%

REM Add NFM_HOME\bin to system PATH
setx PATH "%PATH%;%NFM_HOME%\bin"

echo Added NFM to system PATH
pause
