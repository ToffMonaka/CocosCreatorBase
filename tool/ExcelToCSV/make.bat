@echo �J�n:�R���p�C��

set CLASSPATH=%CLASSPATH%;lib\poi-3.7-20101029.jar

rd /s /q classes
@md classes

javac -d classes src\com\toff_monaka\excel_to_csv\main\*.java

jar -cvmf MANIFEST.MF bin\ExcelToCSV.jar -C classes .

rd /s /q classes

@echo �I��:�R���p�C��
pause
