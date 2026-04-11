// เปลี่ยนเป็น ID ของ Google Sheet ของคุณ
const SPREADSHEET_ID = '14SFF15StQb9_xJyEHtvZuDTrH8fQ_cDSniWVDlM5N04';
const SHEET_NAME = 'prompts';

// จัดการการส่งข้อมูลแบบ GET (ดึงข้อมูล)
function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getPrompts') {
    return ContentService.createTextOutput(JSON.stringify(getPromptsData(e.parameter.type)))
      .setMimeType(ContentService.MimeType.JSON);
  } else if (action === 'getTypes') {
    return ContentService.createTextOutput(JSON.stringify(getTypesData()))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// จัดการการส่งข้อมูลแบบ POST (บันทึกข้อมูล)
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === 'addPrompt') {
      const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
      if (!sheet) {
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Sheet not found' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      // หาแถวแรกที่ว่างและเพิ่มข้อมูล (Type, Usefor, Prompt, Note)
      sheet.appendRow([data.type, data.usefor, data.prompt, data.note]);
      
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Saved successfully' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ฟังก์ชันดึงหมวดหมู่ (Type) ทั้งหมดเพื่อใช้ทำ Dropdown โดยเฉพาะ
function getTypesData() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) return { status: 'error', message: 'Sheet not found' };
  
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return { status: 'success', data: [] };
  
  const typesData = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const uniqueTypes = [...new Set(typesData.map(r => r[0].toString().trim()).filter(t => t))];
  
  return { status: 'success', data: uniqueTypes };
}

// ฟังก์ชันดึงข้อมูลจาก Sheet และแปลงเป็น JSON Array ตาม filterType (ถ้ามี)
function getPromptsData(filterType) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) {
    return { status: 'error', message: 'Sheet not found' };
  }
  
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return { status: 'success', data: [] }; // ไม่มีข้อมูล
  }
  
  // สมมติว่าเรียงคอลัมน์ [Type, Usefor, Prompt, Note]
  let rows = data.slice(1);
  if (filterType && filterType !== 'all') {
    rows = rows.filter(row => row[0].toString().trim() === filterType.trim());
  }
  
  const formattedData = rows.map(row => {
    let obj = {};
    obj['type'] = row[0] || '';
    obj['usefor'] = row[1] || '';
    obj['prompt'] = row[2] || '';
    obj['note'] = row[3] || '';
    return obj;
  });
  
  return { status: 'success', data: formattedData.reverse() }; //เรียงข้อมูลใหม่ล่าสุดขึ้นก่อน
}
