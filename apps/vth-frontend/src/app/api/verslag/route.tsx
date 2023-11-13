import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = 'http://localhost:3000/nl/leefbaarheid';
  await page.emulateMediaType('print');

  await page.goto(url, { waitUntil: 'networkidle0' });

  const pdf = await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    displayHeaderFooter: false,
    format: 'A4',
  });

  await browser.close();

  const response = new NextResponse(pdf);
  response.headers.set('Content-Type', 'application/pdf');
  response.headers.set('Content-Disposition', 'attachment; filename=verslag.pdf');

  return response;
}
