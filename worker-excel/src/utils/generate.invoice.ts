import * as XLSX from 'xlsx';
import { ObjectForExcel } from '../types/invoice';

export async function generateExcel(objectForExele: ObjectForExcel) {
  await new Promise((resolve) => setTimeout(resolve, 20000));
  const workbook = XLSX.utils.book_new();
  const worksheetData = [
    ['Invoice Details'],
    [''],
    ['First Name:', objectForExele.firstName],
    ['Last Name:', objectForExele.lastName],
    ['Date:', objectForExele.dateFormatDDMMYYYY],
    [''],
    ['Total Cost:', `$${objectForExele.summCost}`],
    [''],
    ['Completed Tasks'],
    ['Task Name', 'Cost'],
    ...objectForExele.completedTasks.map((task) => [
      task.taskName,
      `$${task.cost}`,
    ]),
    [''],
    ['Thank you for your business!'],
  ];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  worksheet['!cols'] = [{ wch: 30 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoice');

  const buffer: Buffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'buffer',
  });
  return buffer;
}
