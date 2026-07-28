import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Clinic } from '../constants/clinic.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LETTERHEAD_PATH = path.join(__dirname, '../../assets/letterhead.pdf');

const PAGE_WIDTH = 595.28; // A4
const PAGE_HEIGHT = 841.89;
const MARGIN = 48;

const primary = rgb(0.043, 0.294, 0.255); // clinic dark green
const black = rgb(0.1, 0.1, 0.1);
const muted = rgb(0.45, 0.45, 0.45);

const formatDate = (d) => {
	if (!d) return '';
	const date = new Date(d);
	if (Number.isNaN(date.getTime())) return d;
	const dd = String(date.getDate()).padStart(2, '0');
	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const yy = String(date.getFullYear());
	return `${dd}-${mm}-${yy}`;
};

const generatePrescriptionPdf = async ({ patient, prescription }) => {
	const doc = await PDFDocument.create();
	const font = await doc.embedFont(StandardFonts.Helvetica);
	const bold = await doc.embedFont(StandardFonts.HelveticaBold);

	const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
	const maxWidth = PAGE_WIDTH - MARGIN * 2;
	const contentBottom = 75;

	const withLetterhead = prescription.with_letterhead !== false;
	let y;

	if (withLetterhead && fs.existsSync(LETTERHEAD_PATH)) {
		const letterheadBytes = fs.readFileSync(LETTERHEAD_PATH);
		const letterheadDoc = await PDFDocument.load(letterheadBytes);
		const [embeddedPage] = await doc.embedPdf(letterheadDoc, [0]);
		page.drawPage(embeddedPage, { x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT });
		y = PAGE_HEIGHT - 215;
	} else {
		// No letterhead: leave the same blank space at the top as the letterhead
		// version, so this can be printed on the clinic's pre-printed letterhead paper.
		y = PAGE_HEIGHT - 215;
	}

	const lineHeight = 15;

	const drawLine = (text, { size = 10, color = black, f = font, gap = lineHeight } = {}) => {
		if (y < contentBottom) return;
		page.drawText(text, { x: MARGIN, y, size, font: f, color, maxWidth });
		y -= gap;
	};

	const drawWrapped = (text, { size = 10, color = black, f = font, gap = 13, indent = 0 } = {}) => {
		if (!text) return;
		const words = String(text).split(/\s+/);
		let line = '';
		const usableWidth = maxWidth - indent;
		for (const word of words) {
			const test = line ? `${line} ${word}` : word;
			if (f.widthOfTextAtSize(test, size) > usableWidth && line) {
				if (y < contentBottom) return;
				page.drawText(line, { x: MARGIN + indent, y, size, font: f, color });
				y -= gap;
				line = word;
			} else {
				line = test;
			}
		}
		if (line) {
			if (y < contentBottom) return;
			page.drawText(line, { x: MARGIN + indent, y, size, font: f, color });
			y -= gap;
		}
	};

	// Reg. No. (fixed clinic/doctor registration number, same on every prescription)
	drawLine(`Reg. No.: ${Clinic.registrationNo}`, { size: 10 });

	// Name (Sex) / Age
	const sex = (patient.gender || '').charAt(0).toUpperCase();
	drawLine(`Name: ${patient.name}  (${sex || '-'})  /  Age: ${patient.age || '-'} Y`, {
		size: 10,
		f: bold,
	});

	drawLine(`Mob. No.: ${patient.phone || '-'}`, { size: 10 });
	drawLine(`Address: ${patient.address || '-'}`, { size: 10 });

	const vitalsParts = [
		`Weight (Kg): ${prescription.weight_kg || '-'}`,
		`Height (Cm): ${prescription.height_cm || '-'}`,
	];
	drawLine(vitalsParts.join('   '), { size: 10 });

	drawLine(`Date: ${formatDate(prescription.date)}`, { size: 10, gap: lineHeight + 6 });

	page.drawLine({ start: { x: MARGIN, y: y + 4 }, end: { x: PAGE_WIDTH - MARGIN, y: y + 4 }, thickness: 0.5, color: muted });
	y -= 6;

	if (prescription.chief_complaints) {
		drawLine('Chief Complaints', { size: 11, f: bold, color: primary });
		drawWrapped(prescription.chief_complaints, { size: 10 });
		y -= 6;
	}

	const clinicalFindings = (prescription.clinical_findings || []).filter(Boolean);
	if (clinicalFindings.length) {
		drawLine('Clinical Findings', { size: 11, f: bold, color: primary });
		clinicalFindings.forEach((finding) => drawWrapped(`•  ${finding}`, { size: 10 }));
		y -= 6;
	}

	const diagnosisPoints = (prescription.diagnosis_points || []).filter(Boolean);
	if (diagnosisPoints.length) {
		drawLine('Diagnosis:', { size: 11, f: bold, color: primary });
		diagnosisPoints.forEach((d) => drawWrapped(`•  ${d}`, { size: 10 }));
		y -= 6;
	}

	// Medicines table
	const medicines = (prescription.medicines || []).filter((m) => m?.name);
	if (medicines.length) {
		drawLine('Medicines', { size: 15, f: bold, color: primary, gap: 20 });

		const col = { num: MARGIN, name: MARGIN + 22, dosage: MARGIN + 260, duration: MARGIN + 360 };
		page.drawText('Medicine Name', { x: col.name, y, size: 9, font: bold, color: muted });
		page.drawText('Dosage', { x: col.dosage, y, size: 9, font: bold, color: muted });
		page.drawText('Duration', { x: col.duration, y, size: 9, font: bold, color: muted });
		page.drawLine({
			start: { x: MARGIN, y: y - 4 },
			end: { x: PAGE_WIDTH - MARGIN, y: y - 4 },
			thickness: 0.5,
			color: muted,
		});
		y -= lineHeight;

		medicines.forEach((med, i) => {
			if (y < contentBottom + 20) return;
			page.drawText(`${i + 1})`, { x: col.num, y, size: 10, font: bold, color: black });
			page.drawText(med.name || '-', { x: col.name, y, size: 10, font, color: black, maxWidth: 225 });
			page.drawText(med.dosage || '-', { x: col.dosage, y, size: 10, font, color: black, maxWidth: 90 });
			const durationText = med.duration_days ? `${med.duration_days} Days` : '-';
			page.drawText(durationText, { x: col.duration, y, size: 10, font, color: black });
			y -= 13;
			if (med.total_qty) {
				page.drawText(`(Tot: ${med.total_qty} Tab/Cap)`, { x: col.duration, y, size: 8.5, font, color: muted });
			}
			y -= 16;
		});
		y -= 6;
	}

	const advicePoints = (prescription.advice || []).filter(Boolean);
	if (advicePoints.length) {
		drawLine('Advice:', { size: 11, f: bold, color: primary });
		advicePoints.forEach((a) => drawWrapped(`•  ${a}`, { size: 10 }));
		y -= 6;
	}

	if (prescription.follow_up_date) {
		drawLine(`Follow Up: ${formatDate(prescription.follow_up_date)}`, { size: 10, f: bold });
	}

	return doc.save();
};

export { generatePrescriptionPdf };
