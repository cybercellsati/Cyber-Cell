const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const sampleAttendees = [
  {
    "Scholar Number": "0108CS221001",
    "Name": "Aarav Sharma",
    "Event": "National Cyber Defense Wargame 2026",
    "Role": "1st Place Winner",
    "Issue Date": "2026-10-19",
    "Certificate ID": "CYB-2026-ARV001",
  },
  {
    "Scholar Number": "0108CS221045",
    "Name": "Yash Harfode",
    "Event": "National Cyber Defense Wargame 2026",
    "Role": "Lead Convenor",
    "Issue Date": "2026-10-19",
    "Certificate ID": "CYB-2026-YSH045",
  },
  {
    "Scholar Number": "0108IT221012",
    "Name": "Priya Sen",
    "Event": "National Cyber Defense Wargame 2026",
    "Role": "2nd Place Winner",
    "Issue Date": "2026-10-19",
    "Certificate ID": "CYB-2026-PRY012",
  },
  {
    "Scholar Number": "0108EC221089",
    "Name": "Rohan Vishwakarma",
    "Event": "National Cyber Defense Wargame 2026",
    "Role": "Participant",
    "Issue Date": "2026-10-19",
    "Certificate ID": "CYB-2026-RHN089",
  },
  {
    "Scholar Number": "0108CS221099",
    "Name": "Ananya Joshi",
    "Event": "National Cyber Defense Wargame 2026",
    "Role": "Participant",
    "Issue Date": "2026-10-19",
    "Certificate ID": "CYB-2026-ANA099",
  },
];

const worksheet = XLSX.utils.json_to_sheet(sampleAttendees);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Attendees");

const outExcel = path.join(__dirname, "..", "data", "attendees.xlsx");
XLSX.writeFile(workbook, outExcel);
console.log(`Created sample Excel file: ${outExcel}`);

// Also create default data/certificateConfig.json
const configPath = path.join(__dirname, "..", "data", "certificateConfig.json");
const defaultConfig = {
  templateUrl: "/templates/certificate-template.png",
  fontFamily: "Cinzel",
  fontSize: 76,
  fontWeight: "bold",
  color: "#d4af37",
  yPositionPercent: 48.0,
  xPositionPercent: 50.0,
  letterSpacing: 2,
  textTransform: "uppercase",
  showQrCode: false,
  showCertificateId: false,
  eventName: "National Cyber Defense Wargame 2026",
  issueDate: new Date().toISOString().split("T")[0]
};

fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
console.log(`Created default config: ${configPath}`);
