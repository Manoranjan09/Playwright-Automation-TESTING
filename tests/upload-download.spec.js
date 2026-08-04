const ExcelJs = require('exceljs');
const {test ,expect} = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Sheet1");
    const output = await readExcel(worksheet, searchText);
    console.log(output);
    const cell = worksheet.getCell(
        output.row + change.rowChange,
        output.column + change.colChange
    );
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}
async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            console.log(rowNumber, colNumber, cell.value);
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
}
// Update Banana's price to 350
//writeExcelTest("Banana", 350,{ rowChange: 0, colChange: 2 },"/Users/manoranjankumar/Desktop/ExceldownloadTest.xlsx");

test('upload download excel validation' ,async ({page}) =>{
    const textSearch = 'Mango';
    const updatevalue = '350';

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button' ,{name:'Download'}).click();
    await downloadPromise;
    writeExcelTest(textSearch,updatevalue,{ rowChange: 0, colChange: 2 },"/Users/manoranjankumar/Desktop/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("/Users/manoranjankumar/Desktop/download.xlsx");  
    const textlocator = await page.getByText(textSearch);

    const desiredRow = await page.getByRole('row').filter({has:textlocator});

   await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatevalue); 

})