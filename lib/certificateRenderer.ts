import QRCode from "qrcode";

export interface FontOption {
  id: string;
  name: string;
  family: string;
  category: "Academic" | "Calligraphy" | "Serif" | "Modern";
  sample: string;
  defaultWeight: string;
  description: string;
}

export const CERTIFICATE_FONTS: FontOption[] = [
  {
    id: "cinzel",
    name: "Cinzel",
    family: "'Cinzel', serif",
    category: "Academic",
    sample: "AARAV SHARMA",
    defaultWeight: "bold",
    description: "Classic Roman monumental serif. Clean, prestigious, and official.",
  },
  {
    id: "cinzel-decorative",
    name: "Cinzel Decorative",
    family: "'Cinzel Decorative', serif",
    category: "Academic",
    sample: "AARAV SHARMA",
    defaultWeight: "bold",
    description: "Regal ceremonial serif with ornate decorative swashes.",
  },
  {
    id: "pinyon-script",
    name: "Pinyon Script",
    family: "'Pinyon Script', cursive",
    category: "Calligraphy",
    sample: "Aarav Sharma",
    defaultWeight: "normal",
    description: "Luxury royal cursive calligraphy. Aristocratic, high-prestige look.",
  },
  {
    id: "great-vibes",
    name: "Great Vibes",
    family: "'Great Vibes', cursive",
    category: "Calligraphy",
    sample: "Aarav Sharma",
    defaultWeight: "normal",
    description: "Graceful, fluid cursive handwriting. Elegant and celebratory.",
  },
  {
    id: "playfair-display",
    name: "Playfair Display",
    family: "'Playfair Display', serif",
    category: "Serif",
    sample: "Aarav Sharma",
    defaultWeight: "bold",
    description: "High-contrast editorial serif with sharp luxury strokes.",
  },
  {
    id: "cormorant-garamond",
    name: "Cormorant Garamond",
    family: "'Cormorant Garamond', serif",
    category: "Serif",
    sample: "AARAV SHARMA",
    defaultWeight: "600",
    description: "Traditional diploma serif. Dignified, scholarly, and refined.",
  },
  {
    id: "alex-brush",
    name: "Alex Brush",
    family: "'Alex Brush', cursive",
    category: "Calligraphy",
    sample: "Aarav Sharma",
    defaultWeight: "normal",
    description: "Flowing brush calligraphy with distinct clarity and legibility.",
  },
  {
    id: "montserrat",
    name: "Montserrat",
    family: "'Montserrat', sans-serif",
    category: "Modern",
    sample: "AARAV SHARMA",
    defaultWeight: "bold",
    description: "Clean geometric sans-serif. Modern, bold tech and executive look.",
  },
];

export interface CertificateConfig {
  mode?: "name_only" | "full";
  templateType: "cyber_midnight" | "monochrome_slate" | "gold_merit" | "custom";
  customTemplateImage?: HTMLImageElement | null;
  templateUrl?: string;
  eventName?: string;
  recipientName: string;
  scholarNumber?: string;
  certificateId: string;
  issueDate?: string;
  roleOrRank?: string;
  issuerName?: string;
  nameYPosition?: number; // relative percentage (0.0 to 1.0, e.g. 0.485 = 48.5%)
  nameXPosition?: number; // relative percentage (0.0 to 1.0, e.g. 0.50 = center)
  nameFontSize?: number; // px at standard 1920x1080 canvas (e.g. 76)
  nameFontFamily?: string; // Font family name (e.g. "Cinzel", "Pinyon Script")
  nameFontWeight?: string; // "bold", "normal", "600", "700"
  nameColor?: string; // Hex color code
  nameLetterSpacing?: number; // px (e.g. 2)
  nameTextTransform?: "uppercase" | "capitalize" | "none";
  showQrCode?: boolean;
  showCertificateId?: boolean;
  idYPosition?: number;
  idXPosition?: number;
}

/**
 * Ensures web font is loaded before rendering to canvas
 */
async function ensureFontReady(fontFamily: string, fontSize: number = 72, fontWeight: string = "bold"): Promise<void> {
  if (typeof document !== "undefined" && document.fonts && document.fonts.load) {
    try {
      const cleanFont = fontFamily.replace(/['",]/g, "").trim();
      await document.fonts.load(`${fontWeight} ${fontSize}px "${cleanFont}"`);
      await document.fonts.ready;
    } catch {
      // Continue even if font loading times out
    }
  }
}

/**
 * Loads an image from a URL into an HTMLImageElement
 */
export function loadImageAsync(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load template image at ${url}: ${e}`));
    img.src = url;
  });
}

/**
 * Formats recipient name according to chosen text transform
 */
function formatName(name: string, transform?: "uppercase" | "capitalize" | "none"): string {
  if (!name) return "";
  const trimmed = name.trim();
  if (transform === "uppercase") {
    return trimmed.toUpperCase();
  }
  if (transform === "capitalize") {
    return trimmed
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return trimmed;
}

/**
 * Draws a high-resolution, print-ready 1920x1080 certificate onto an HTML5 Canvas
 */
export async function renderCertificateToCanvas(
  canvas: HTMLCanvasElement,
  config: CertificateConfig
): Promise<string> {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");

  // 1. Resolve Background Image (either pre-loaded image or load from URL)
  let backgroundImg: HTMLImageElement | null = null;
  if (config.customTemplateImage) {
    backgroundImg = config.customTemplateImage;
  } else if (config.templateUrl) {
    try {
      backgroundImg = await loadImageAsync(config.templateUrl);
    } catch {
      backgroundImg = null;
    }
  }

  // 2. Adapt Canvas Dimensions directly to image resolution (Default: A4 Landscape 2000x1414)
  let width = 2000;
  let height = 1414; // Standard A4 Landscape aspect ratio (297 / 210 = 1.4142)

  if (backgroundImg) {
    const natW = backgroundImg.naturalWidth || backgroundImg.width;
    const natH = backgroundImg.naturalHeight || backgroundImg.height;
    if (natW && natH && natW > 0 && natH > 0) {
      width = natW;
      height = natH;
    }
  }

  canvas.width = width;
  canvas.height = height;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Determine mode: "name_only" is used for Canva templates
  const isNameOnly = config.mode === "name_only" || config.templateType === "custom";

  // 3. Draw Background / Template
  if (backgroundImg) {
    ctx.drawImage(backgroundImg, 0, 0, width, height);
  } else if (config.templateType === "gold_merit") {
    drawGoldMeritTemplate(ctx, width, height);
  } else if (config.templateType === "monochrome_slate") {
    drawMonochromeSlateTemplate(ctx, width, height);
  } else if (config.templateType === "cyber_midnight") {
    drawCyberMidnightTemplate(ctx, width, height);
  } else {
    try {
      const img = await loadImageAsync("/templates/certificate-template.png");
      ctx.drawImage(img, 0, 0, width, height);
    } catch {
      drawCyberMidnightTemplate(ctx, width, height);
    }
  }

  // 4. Draw Recipient Name (Proportionally scaled to canvas resolution)
  const baseReferenceWidth = 2000; // Base reference for A4 landscape
  const fontScale = width / baseReferenceWidth;
  const nominalSize = config.nameFontSize || 76;
  const fontSize = Math.max(20, Math.round(nominalSize * fontScale));

  const fontFamily = config.nameFontFamily || "'Cinzel', serif";
  const fontWeight = config.nameFontWeight || "bold";
  const fontColor = config.nameColor || (isNameOnly ? "#d4af37" : "#ffffff");
  const nameY = height * (config.nameYPosition ?? 0.495);
  const nameX = width * (config.nameXPosition ?? 0.50);

  // Wait for font to be rendered smoothly
  await ensureFontReady(fontFamily, fontSize, fontWeight);

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}, "Segoe UI", -apple-system, sans-serif`;
  ctx.fillStyle = fontColor;

  if (config.nameLetterSpacing && ctx.letterSpacing !== undefined) {
    ctx.letterSpacing = `${config.nameLetterSpacing}px`;
  }

  const displayName = formatName(config.recipientName || "RECIPIENT NAME", config.nameTextTransform);
  ctx.fillText(displayName, nameX, nameY);
  ctx.restore();

  // 3. Name-Only Mode vs Full Mode
  if (isNameOnly) {
    // In Name-Only Mode (Canva design), the Canva template already has all borders,
    // event title, signatures, dates, and stamps. We only draw optional ID or QR if explicitly requested.
    
    // Optional Certificate ID placement
    if (config.showCertificateId && config.certificateId) {
      ctx.save();
      const idX = width * (config.idXPosition ?? 0.50);
      const idY = height * (config.idYPosition ?? 0.88);
      ctx.font = `500 16px "Geist Mono", monospace`;
      ctx.fillStyle = config.nameColor || "#94a3b8";
      ctx.textAlign = "center";
      ctx.fillText(`CREDENTIAL ID: ${config.certificateId}`, idX, idY);
      ctx.restore();
    }

    // Optional QR code placement
    if (config.showQrCode) {
      await drawVerificationQr(ctx, width - 220, height - 220, 110, config.certificateId);
    }

    return canvas.toDataURL("image/png", 0.95);
  }

  // =========================================================================
  // Full Mode: Draw built-in template texts, event details, footer, signatures
  // =========================================================================
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = `500 24px "Geist", "Segoe UI", sans-serif`;
  ctx.fillStyle = "#94a3b8";
  ctx.fillText(`for outstanding participation & demonstrated technical excellence in`, width / 2, height * 0.58);

  ctx.font = `bold 34px "Geist", "Segoe UI", sans-serif`;
  ctx.fillStyle = config.templateType === "gold_merit" ? "#fef08a" : "#38bdf8";
  ctx.fillText(config.eventName || "NATIONAL CYBER DEFENSE WARGAME 2026", width / 2, height * 0.63);

  if (config.scholarNumber) {
    ctx.font = `500 20px "Geist Mono", monospace`;
    ctx.fillStyle = "#64748b";
    ctx.fillText(`SCHOLAR NO: ${config.scholarNumber}  •  ROLE: ${config.roleOrRank || "PARTICIPANT"}`, width / 2, height * 0.68);
  }
  ctx.restore();

  // Draw Footer Details (Date, Authority)
  ctx.save();
  ctx.textAlign = "left";
  ctx.font = `500 18px "Geist Mono", monospace`;
  ctx.fillStyle = "#94a3b8";
  ctx.fillText(`DATE OF ISSUANCE: ${config.issueDate || new Date().toISOString().split("T")[0]}`, 140, height - 120);
  ctx.fillText(`ORGANIZATION: SAMRAT ASHOK TECHNOLOGICAL INSTITUTE`, 140, height - 95);

  ctx.textAlign = "center";
  ctx.font = `bold 18px "Geist Mono", monospace`;
  ctx.fillStyle = config.templateType === "gold_merit" ? "#eab308" : "#38bdf8";
  ctx.fillText(`CREDENTIAL ID: ${config.certificateId}`, width / 2, height - 110);
  ctx.font = `500 14px "Geist Mono", monospace`;
  ctx.fillStyle = "#64748b";
  ctx.fillText(`VERIFY ONLINE AT: /verify?id=${config.certificateId}`, width / 2, height - 85);

  // Right Signatures
  ctx.textAlign = "right";
  ctx.font = `600 20px "Geist", sans-serif`;
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Prof. Shivangi Jain", width - 140, height - 125);
  ctx.font = `500 15px "Geist", sans-serif`;
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("Faculty Advisor, Cyber Cell", width - 140, height - 105);
  ctx.fillText("CSE Department, SATI Vidisha", width - 140, height - 85);
  ctx.restore();

  if (config.showQrCode !== false) {
    await drawVerificationQr(ctx, width - 260, 100, 130, config.certificateId);
  }

  return canvas.toDataURL("image/png", 0.95);
}

/**
 * Helper to render dynamic QR code onto canvas
 */
async function drawVerificationQr(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  certId: string
) {
  try {
    const verifyUrl = typeof window !== "undefined"
      ? `${window.location.origin}/verify?id=${certId}`
      : `https://cybercell.satiengg.in/verify?id=${certId}`;

    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      width: size,
      margin: 1,
      color: {
        dark: "#080d1a",
        light: "#ffffff",
      },
    });

    const qrImg = new Image();
    await new Promise<void>((resolve) => {
      qrImg.onload = () => resolve();
      qrImg.src = qrDataUrl;
    });

    ctx.drawImage(qrImg, x, y, size, size);

    ctx.save();
    ctx.font = `bold 10px "Geist Mono", monospace`;
    ctx.fillStyle = "#38bdf8";
    ctx.textAlign = "center";
    ctx.fillText("SCAN TO VERIFY", x + size / 2, y + size + 16);
    ctx.restore();
  } catch (err) {
    console.warn("Could not render QR code onto certificate:", err);
  }
}

/**
 * Built-in Template: Cyber Midnight (Executive Deep Slate & Cyan)
 */
function drawCyberMidnightTemplate(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#060910");
  grad.addColorStop(0.5, "#0d1627");
  grad.addColorStop(1, "#060910");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
  ctx.lineWidth = 3;
  ctx.strokeRect(60, 60, width - 120, height - 120);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  ctx.strokeRect(75, 75, width - 150, height - 150);

  drawCornerAccents(ctx, 60, 60, width - 120, height - 120, "#38bdf8");

  ctx.save();
  ctx.textAlign = "center";
  ctx.font = `bold 22px "Geist Mono", monospace`;
  ctx.fillStyle = "#38bdf8";
  ctx.fillText("CENTRAL CODING CLUB  •  SATI VIDISHA", width / 2, 130);

  ctx.font = `bold 44px "Geist", "Segoe UI", sans-serif`;
  ctx.fillStyle = "#ffffff";
  ctx.fillText("CERTIFICATE OF EXCELLENCE", width / 2, 190);

  ctx.font = `500 18px "Geist Mono", monospace`;
  ctx.fillStyle = "#64748b";
  ctx.fillText("THIS IS PROUDLY CONFERRED UPON", width / 2, 245);
  ctx.restore();
}

/**
 * Built-in Template: Gold Merit Award
 */
function drawGoldMeritTemplate(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#080c14");
  grad.addColorStop(0.5, "#151b26");
  grad.addColorStop(1, "#080c14");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(234, 179, 8, 0.6)";
  ctx.lineWidth = 4;
  ctx.strokeRect(60, 60, width - 120, height - 120);

  ctx.strokeStyle = "rgba(234, 179, 8, 0.2)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(75, 75, width - 150, height - 150);

  drawCornerAccents(ctx, 60, 60, width - 120, height - 120, "#eab308");

  ctx.save();
  ctx.textAlign = "center";
  ctx.font = `bold 22px "Geist Mono", monospace`;
  ctx.fillStyle = "#eab308";
  ctx.fillText("SAMRAT ASHOK TECHNOLOGICAL INSTITUTE  •  CYBER CELL", width / 2, 130);

  ctx.font = `bold 46px "Geist", sans-serif`;
  ctx.fillStyle = "#fef08a";
  ctx.fillText("CERTIFICATE OF MERIT & DISTINCTION", width / 2, 190);

  ctx.font = `500 18px "Geist Mono", monospace`;
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("IS HEREBY PRESENTED TO", width / 2, 245);
  ctx.restore();
}

/**
 * Built-in Template: Monochrome Slate
 */
function drawMonochromeSlateTemplate(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = "#090d16";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 2;
  ctx.strokeRect(60, 60, width - 120, height - 120);

  drawCornerAccents(ctx, 60, 60, width - 120, height - 120, "#ffffff");

  ctx.save();
  ctx.textAlign = "center";
  ctx.font = `bold 20px "Geist Mono", monospace`;
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("CYBER CELL  //  OFFICIAL CREDENTIAL", width / 2, 130);

  ctx.font = `bold 42px "Geist", sans-serif`;
  ctx.fillStyle = "#ffffff";
  ctx.fillText("CERTIFICATE OF COMPLETION", width / 2, 190);

  ctx.font = `500 17px "Geist Mono", monospace`;
  ctx.fillStyle = "#64748b";
  ctx.fillText("AWARDED TO", width / 2, 245);
  ctx.restore();
}

function drawCornerAccents(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  const len = 30;

  ctx.beginPath();
  ctx.moveTo(x - 6, y + len);
  ctx.lineTo(x - 6, y - 6);
  ctx.lineTo(x + len, y - 6);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + w + 6 - len, y - 6);
  ctx.lineTo(x + w + 6, y - 6);
  ctx.lineTo(x + w + 6, y + len);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x - 6, y + h - len);
  ctx.lineTo(x - 6, y + h + 6);
  ctx.lineTo(x + len, y + h + 6);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + w + 6 - len, y + h + 6);
  ctx.lineTo(x + w + 6, y + h + 6);
  ctx.lineTo(x + w + 6, y + h + 6 - len);
  ctx.stroke();

  ctx.restore();
}
