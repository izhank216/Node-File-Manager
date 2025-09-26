@echo off
REM Check if NFM_HOME is set
IF NOT DEFINED NFM_HOME (
    echo NFM_HOME is not set. Running install.cmd to set it...
    call install.cmd
) ELSE (
    echo NFM_HOME is already set to %NFM_HOME%
)

pause
