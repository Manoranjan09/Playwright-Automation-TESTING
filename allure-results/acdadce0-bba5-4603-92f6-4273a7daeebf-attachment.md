# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: upload-download.spec.js >> @Web upload download excel validation
- Location: tests/upload-download.spec.js:33:1

# Error details

```
Error: File not found: /Users/manoranjankumar/Desktop/download.xlsx
```

```
Error: ENOENT: no such file or directory, stat '/Users/manoranjankumar/Desktop/download.xlsx'
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - 'heading "RAHUL SHETTY ACADEMY PRACTISE Note: Data will be reset after page refresh." [level=1] [ref=e6]':
      - text: RAHUL SHETTY ACADEMY PRACTISE
      - generic [ref=e7]: "Note: Data will be reset after page refresh."
  - generic [ref=e8]:
    - table [ref=e11]:
      - rowgroup [ref=e12]:
        - row [ref=e13]:
          - columnheader "S No ▲" [ref=e15] [cursor=pointer]:
            - generic [ref=e16]: S No
            - generic [ref=e17]: ▲
          - columnheader "Fruit Name ▲" [ref=e19] [cursor=pointer]:
            - generic [ref=e20]: Fruit Name
            - generic [ref=e21]: ▲
          - columnheader "Color ▲" [ref=e23] [cursor=pointer]:
            - generic [ref=e24]: Color
            - generic [ref=e25]: ▲
          - columnheader "Price ▲" [ref=e27] [cursor=pointer]:
            - generic [ref=e28]: Price
            - generic [ref=e29]: ▲
          - columnheader "Season ▲" [ref=e31] [cursor=pointer]:
            - generic [ref=e32]: Season
            - generic [ref=e33]: ▲
      - rowgroup [ref=e34]:
        - row [ref=e35]:
          - cell "1" [ref=e36]
          - cell "Mango" [ref=e38]
          - cell "Yellow" [ref=e40]
          - cell "299" [ref=e42]
          - cell "Summer" [ref=e44]
        - row [ref=e46]:
          - cell "2" [ref=e47]
          - cell "Apple" [ref=e49]
          - cell "Red" [ref=e51]
          - cell "345" [ref=e53]
          - cell "Winter" [ref=e55]
        - row [ref=e57]:
          - cell "3" [ref=e58]
          - cell "Papaya" [ref=e60]
          - cell "Orange" [ref=e62]
          - cell "187" [ref=e64]
          - cell "Spring" [ref=e66]
        - row [ref=e68]:
          - cell "4" [ref=e69]
          - cell "Banana" [ref=e71]
          - cell "Yellow" [ref=e73]
          - cell "69" [ref=e75]
          - cell "All" [ref=e77]
        - row [ref=e79]:
          - cell "5" [ref=e80]
          - cell "Kivi" [ref=e82]
          - cell "Green" [ref=e84]
          - cell "399" [ref=e86]
          - cell "Winter" [ref=e88]
        - row [ref=e90]:
          - cell "6" [ref=e91]
          - cell "Orange" [ref=e93]
          - cell "Orange" [ref=e95]
          - cell "199" [ref=e97]
          - cell "Summer" [ref=e99]
    - navigation [ref=e102]:
      - generic [ref=e103]: "Rows per page:"
      - combobox "Rows per page:" [ref=e105] [cursor=pointer]:
        - option "10" [selected]
        - option "15"
        - option "20"
        - option "25"
        - option "30"
      - generic [ref=e106]: 1-6 of 6
      - generic [ref=e107]:
        - button "First Page" [disabled] [ref=e108]
        - button "Previous Page" [disabled] [ref=e112]
        - button "Next Page" [disabled] [ref=e116]
        - button "Last Page" [disabled] [ref=e120]
  - generic [ref=e125]:
    - button "Download" [ref=e126] [cursor=pointer]
    - button "Choose File" [active] [ref=e127]
```

# Test source

```ts
  1  | const ExcelJs = require('exceljs');
  2  | const {test ,expect} = require('@playwright/test');
  3  | 
  4  | async function writeExcelTest(searchText, replaceText, change, filePath) {
  5  |     const workbook = new ExcelJs.Workbook();
  6  |     await workbook.xlsx.readFile(filePath);
  7  |     const worksheet = workbook.getWorksheet("Sheet1");
  8  |     const output = await readExcel(worksheet, searchText);
  9  |     console.log(output);
  10 |     const cell = worksheet.getCell(
  11 |         output.row + change.rowChange,
  12 |         output.column + change.colChange
  13 |     );
  14 |     cell.value = replaceText;
  15 |     await workbook.xlsx.writeFile(filePath);
  16 | }
  17 | async function readExcel(worksheet, searchText) {
  18 |     let output = { row: -1, column: -1 };
  19 |     worksheet.eachRow((row, rowNumber) => {
  20 |         row.eachCell((cell, colNumber) => {
  21 |             console.log(rowNumber, colNumber, cell.value);
  22 |             if (cell.value === searchText) {
  23 |                 output.row = rowNumber;
  24 |                 output.column = colNumber;
  25 |             }
  26 |         });
  27 |     });
  28 |     return output;
  29 | }
  30 | // Update Banana's price to 350
  31 | //writeExcelTest("Banana", 350,{ rowChange: 0, colChange: 2 },"/Users/manoranjankumar/Desktop/ExceldownloadTest.xlsx");
  32 | 
  33 | test('@Web upload download excel validation' ,async ({page}) =>{
  34 |     const textSearch = 'Mango';
  35 |     const updatevalue = '350';
  36 | 
  37 |     await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
  38 |     const downloadPromise = page.waitForEvent('download');
  39 |     await page.getByRole('button' ,{name:'Download'}).click();
  40 |     await downloadPromise;
  41 |     writeExcelTest(textSearch,updatevalue,{ rowChange: 0, colChange: 2 },"/Users/manoranjankumar/Desktop/download.xlsx");
  42 |     await page.locator("#fileinput").click();
> 43 |     await page.locator("#fileinput").setInputFiles("/Users/manoranjankumar/Desktop/download.xlsx");  
     |     ^ Error: ENOENT: no such file or directory, stat '/Users/manoranjankumar/Desktop/download.xlsx'
  44 |     const textlocator = await page.getByText(textSearch);
  45 | 
  46 |     const desiredRow = await page.getByRole('row').filter({has:textlocator});
  47 | 
  48 |    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatevalue); 
  49 | 
  50 | })
```