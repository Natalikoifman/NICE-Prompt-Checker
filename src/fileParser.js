const axios = require('axios');
const xlsx = require('xlsx');
const mammoth = require('mammoth');
const pdfParse = require('pdf-parse');

class FileParser {
    constructor() {
        this.supportedTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
            'application/vnd.ms-excel', // .xls
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
            'application/msword', // .doc
            'application/pdf' // .pdf
        ];
    }

    isSupportedFileType(contentType) {
        return this.supportedTypes.includes(contentType);
    }

    async downloadFile(url, token = null) {
        try {
            const config = {
                responseType: 'arraybuffer'
            };
            
            // Add authorization header if token is provided
            if (token) {
                config.headers = {
                    'Authorization': `Bearer ${token}`
                };
            }
            
            const response = await axios.get(url, config);
            return Buffer.from(response.data);
        } catch (error) {
            console.error('Error downloading file:', error);
            throw new Error('Failed to download file');
        }
    }

    async parseExcel(buffer) {
        try {
            const workbook = xlsx.read(buffer, { type: 'buffer' });
            let textContent = [];

            // Iterate through all sheets
            workbook.SheetNames.forEach(sheetName => {
                const worksheet = workbook.Sheets[sheetName];
                const sheetData = xlsx.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
                
                // Extract all cell values
                sheetData.forEach(row => {
                    row.forEach(cell => {
                        if (cell && cell.toString().trim()) {
                            textContent.push(cell.toString().trim());
                        }
                    });
                });
            });

            return textContent.join('\n');
        } catch (error) {
            console.error('Error parsing Excel file:', error);
            throw new Error('Failed to parse Excel file');
        }
    }

    async parseWord(buffer) {
        try {
            const result = await mammoth.extractRawText({ buffer });
            return result.value.trim();
        } catch (error) {
            console.error('Error parsing Word file:', error);
            throw new Error('Failed to parse Word file');
        }
    }

    async parsePDF(buffer) {
        try {
            const data = await pdfParse(buffer);
            return data.text.trim();
        } catch (error) {
            console.error('Error parsing PDF file:', error);
            throw new Error('Failed to parse PDF file');
        }
    }

    async parseFile(buffer, contentType) {
        if (contentType.includes('spreadsheet') || contentType.includes('excel')) {
            return await this.parseExcel(buffer);
        } else if (contentType.includes('word') || contentType.includes('document')) {
            return await this.parseWord(buffer);
        } else if (contentType.includes('pdf')) {
            return await this.parsePDF(buffer);
        } else {
            throw new Error('Unsupported file type');
        }
    }

    getFileTypeDescription(contentType) {
        if (contentType.includes('spreadsheet') || contentType.includes('excel')) {
            return 'Excel file';
        } else if (contentType.includes('word') || contentType.includes('document')) {
            return 'Word document';
        } else if (contentType.includes('pdf')) {
            return 'PDF document';
        } else {
            return 'Unknown file type';
        }
    }
}

module.exports.FileParser = FileParser;
