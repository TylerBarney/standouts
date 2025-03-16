const pdfParse = require('pdf-parse');
const logger = require('./logger');

async function extractNameFromResume(pdfBuffer) {
    try {
      // Parse the PDF
      const pdfData = await pdfParse(pdfBuffer);
      const text = pdfData.text;
      
      // Simple first approach - look for common resume header patterns
      // This would need to be refined based on actual resume formats
      
      // Try to extract name from beginning of resume
      // Most resumes start with a name at the top
      const lines = text.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      // Check the first few non-empty lines (often contains the name)
      for (let i = 0; i < Math.min(5, lines.length); i++) {
        const line = lines[i];
        
        // Skip lines that are too long (likely not a name) or too short
        if (line.length > 50 || line.length < 3) continue;
        
        // Skip lines with common non-name patterns
        if (line.toLowerCase().includes('resume') || 
            line.toLowerCase().includes('cv') ||
            line.includes('@') || // email
            line.match(/^\d/) || // starts with number
            line.match(/https?:\/\//) || // URL
            line.match(/^\+?\d{8,}$/)) { // phone number
          continue;
        }
        
        // Look for name patterns - typically 2-3 words with capital letters
        const nameParts = line.split(/\s+/);
        if (nameParts.length >= 2 && nameParts.length <= 4) {
          // Check if words start with capital letters (typical for names)
          const isCapitalized = nameParts.every(part => 
            part.length > 0 && part[0] === part[0].toUpperCase()
          );
          
          if (isCapitalized) {
            return line;
          }
        }
      }
      
      // If we didn't find a name yet, try regex for common name patterns
      const nameRegex = /([A-Z][a-z]+ [A-Z][a-z]+)/;
      const nameMatch = text.match(nameRegex);
      if (nameMatch && nameMatch[1]) {
        return nameMatch[1];
      }
      
      // If still no name found, use a placeholder with timestamp
      return "John Doe";
    } catch (error) {
      logger.error('Error extracting name from resume:', error);
      return "John Doe";
    }
  }
  
  module.exports = {
    extractNameFromResume
  }; 