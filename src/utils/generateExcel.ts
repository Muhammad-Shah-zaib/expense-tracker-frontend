import ITransactions from "../interfaces/ITransactions";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const generateExcel = async (
  transactions: ITransactions[],
  startDate: string,
  endDate: string
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Transactions");

  // Function to format date properly and remove unwanted characters
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "InvalidDate"; // Handle edge cases
    return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  // Ensure no invalid characters in sheet name
  const sanitizeSheetName = (name: string) =>
    name.replace(/[*?:\/\\[\]]/g, "").slice(0, 31);

  worksheet.name = sanitizeSheetName(
    `Transactions ${formattedStartDate} - ${formattedEndDate}`
  );

  worksheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Type", key: "type", width: 12 },
    { header: "Purpose", key: "purpose", width: 20 },
    { header: "Amount", key: "amount", width: 12 },
    { header: "Date", key: "date", width: 15 },
    { header: "Description", key: "description", width: 30 },
    { header: "Marked", key: "marked", width: 10 },
  ];

  // **Apply Header Styling**
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "0077CC" }, // **Bluish Header Background**
    };
    cell.font = { bold: true, color: { argb: "FFFFFF" } }; // **White Text**
    cell.alignment = { horizontal: "center", vertical: "middle" };
  });

  // **Fill Data with Alternate Row Coloring**
  transactions.forEach((transaction, index) => {
    const row = worksheet.addRow({
      id: transaction.id,
      type: transaction.type,
      purpose: transaction.purpose,
      amount: transaction.amount,
      date: transaction.date,
      description: transaction.description,
      marked: transaction.marked ? "Yes" : "No",
    });

    // Apply light blue color to alternate rows for better readability
    if (index % 2 !== 0) {
      row.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "E3F2FD" }, // Light blue for alternate rows
        };
      });
    }
  });

  // Generate & download Excel file
  const fileName = `Transactions_${formattedStartDate}_to_${formattedEndDate}.xlsx`;
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, fileName);
};
