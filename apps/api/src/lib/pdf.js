import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Clinic } from '../constants/clinic.js';

const PAGE_WIDTH = 595.28; // A4
const PAGE_HEIGHT = 841.89;
const MARGIN = 50;

const generatePrescriptionPdf = async ({ patient, prescription }) => {
	const doc = await PDFDocument.create();
	const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
	const font = await doc.embedFont(StandardFonts.Helvetica);
	const bold = await doc.embedFont(StandardFonts.HelveticaBold);

	let y = PAGE_HEIGHT - MARGIN;

	const primary = rgb(0.11, 0.35, 0.32);
	const muted = rgb(0.4, 0.4, 0.4);
	const black = rgb(0, 0, 0);

	// Letterhead
	page.drawText(Clinic.name, { x: MARGIN, y, size: 18, font: bold, color: primary });
	y -= 20;
	page.drawText(`${Clinic.doctorName} — ${Clinic.qualification}`, { x: MARGIN, y, size: 11, font, color: muted });
	y -= 14;
	page.drawText(Clinic.address, { x: MARGIN, y, size: 10, font, color: muted });
	y -= 14;
	page.drawText(`${Clinic.phone}  |  ${Clinic.email}`, { x: MARGIN, y, size: 10, font, color: muted });
	y -= 10;

	page.drawLine({
		start: { x: MARGIN, y },
		end: { x: PAGE_WIDTH - MARGIN, y },
		thickness: 1.5,
		color: primary,
	});
	y -= 30;

	// Patient info
	page.drawText(`Patient: ${patient.name}`, { x: MARGIN, y, size: 12, font: bold, color: black });
	page.drawText(`Date: ${prescription.date}`, { x: PAGE_WIDTH - MARGIN - 120, y, size: 11, font, color: black });
	y -= 16;

	const details = [
		patient.age ? `Age: ${patient.age}` : null,
		patient.gender ? `Gender: ${patient.gender}` : null,
		patient.phone ? `Phone: ${patient.phone}` : null,
	].filter(Boolean).join('    ');

	if (details) {
		page.drawText(details, { x: MARGIN, y, size: 10, font, color: muted });
		y -= 20;
	} else {
		y -= 6;
	}

	if (prescription.diagnosis) {
		page.drawText('Diagnosis:', { x: MARGIN, y, size: 11, font: bold, color: black });
		y -= 14;
		page.drawText(prescription.diagnosis, { x: MARGIN, y, size: 10, font, color: black, maxWidth: PAGE_WIDTH - MARGIN * 2 });
		y -= 24;
	}

	// Rx symbol + medicines table
	page.drawText('Rx', { x: MARGIN, y, size: 16, font: bold, color: primary });
	y -= 24;

	const medicines = prescription.medicines || [];
	const colX = { name: MARGIN + 10, dosage: MARGIN + 220, duration: MARGIN + 320, instructions: MARGIN + 400 };

	page.drawText('Medicine', { x: colX.name, y, size: 10, font: bold, color: muted });
	page.drawText('Dosage', { x: colX.dosage, y, size: 10, font: bold, color: muted });
	page.drawText('Duration', { x: colX.duration, y, size: 10, font: bold, color: muted });
	page.drawText('Instructions', { x: colX.instructions, y, size: 10, font: bold, color: muted });
	y -= 8;

	page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_WIDTH - MARGIN, y }, thickness: 0.5, color: muted });
	y -= 16;

	medicines.forEach((med) => {
		page.drawText(med.name || '-', { x: colX.name, y, size: 10, font, color: black, maxWidth: 200 });
		page.drawText(med.dosage || '-', { x: colX.dosage, y, size: 10, font, color: black, maxWidth: 90 });
		page.drawText(med.duration || '-', { x: colX.duration, y, size: 10, font, color: black, maxWidth: 70 });
		page.drawText(med.instructions || '-', { x: colX.instructions, y, size: 9, font, color: black, maxWidth: 145 });
		y -= 20;
	});

	if (prescription.notes) {
		y -= 14;
		page.drawText('Notes:', { x: MARGIN, y, size: 11, font: bold, color: black });
		y -= 14;
		page.drawText(prescription.notes, { x: MARGIN, y, size: 10, font, color: black, maxWidth: PAGE_WIDTH - MARGIN * 2 });
	}

	// Signature
	const sigY = MARGIN + 60;
	page.drawLine({ start: { x: PAGE_WIDTH - MARGIN - 160, y: sigY }, end: { x: PAGE_WIDTH - MARGIN, y: sigY }, thickness: 0.75, color: muted });
	page.drawText(Clinic.doctorName, { x: PAGE_WIDTH - MARGIN - 155, y: sigY - 14, size: 10, font: bold, color: black });
	page.drawText(Clinic.qualification, { x: PAGE_WIDTH - MARGIN - 155, y: sigY - 26, size: 9, font, color: muted });

	return doc.save();
};

export { generatePrescriptionPdf };
