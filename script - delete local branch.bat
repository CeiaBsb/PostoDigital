@echo off
set /p branch=Digite o nome do branch a deletar: 
@echo on
git branch -d %branch%
pause