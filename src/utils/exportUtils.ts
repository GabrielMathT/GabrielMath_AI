import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Exports a given SVG element or container to a high-resolution PNG image.
 */
export async function downloadSvgAsPng(
  svgElement: SVGSVGElement | null,
  fileName: string = '순서도_이미지.png'
): Promise<void> {
  if (!svgElement) {
    throw new Error('순서도 SVG 요소를 찾을 수 없습니다.');
  }

  // Clone SVG to avoid modifying the DOM
  const svgClone = svgElement.cloneNode(true) as SVGSVGElement;
  const bbox = svgElement.getBBox();
  const width = Math.max(svgElement.clientWidth || bbox.width || 800, 600);
  const height = Math.max(svgElement.clientHeight || bbox.height || 600, 400);

  // Set explicit dimensions and white background
  svgClone.setAttribute('width', `${width}px`);
  svgClone.setAttribute('height', `${height}px`);
  svgClone.style.backgroundColor = '#ffffff';

  const svgString = new XMLSerializer().serializeToString(svgClone);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const blobURL = URL.createObjectURL(svgBlob);

  const image = new Image();
  image.crossOrigin = 'anonymous';

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const scale = 2; // 2x DPI for ultra crisp quality
      const canvas = document.createElement('canvas');
      canvas.width = width * scale;
      canvas.height = height * scale;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      // Draw white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.scale(scale, scale);
      ctx.drawImage(image, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          const downloadLink = document.createElement('a');
          downloadLink.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
          downloadLink.href = URL.createObjectURL(blob);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(blobURL);
          resolve();
        } else {
          reject(new Error('PNG 변환에 실패했습니다.'));
        }
      }, 'image/png');
    };

    image.onerror = (err) => {
      URL.revokeObjectURL(blobURL);
      reject(err);
    };

    image.src = blobURL;
  });
}

/**
 * Exports the worksheet container (with reflection note, flowchart, trace table) to a polished PDF document.
 */
export async function exportWorksheetToPdf(
  elementId: string,
  fileName: string = '인공지능수학_순서도_학습활동지.pdf'
): Promise<void> {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) {
    throw new Error('PDF로 변환할 요소를 찾을 수 없습니다.');
  }

  // Temporary styling adjustments for print
  const canvas = await html2canvas(targetElement, {
    scale: 2, // High resolution
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    windowWidth: targetElement.scrollWidth,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

  const imgWidth = pdfWidth - 20; // 10mm margins on sides
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 10; // 10mm top margin

  // First page
  pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight, undefined, 'FAST');
  heightLeft -= (pdfHeight - 20);

  // If content spans multiple pages
  while (heightLeft > 0) {
    position = heightLeft - imgHeight + 10;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= (pdfHeight - 20);
  }

  pdf.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
}
