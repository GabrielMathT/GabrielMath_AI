import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Exports a given SVG element or flowchart container to a high-resolution PNG image.
 */
export async function downloadSvgAsPng(
  svgElement: SVGSVGElement | null,
  fileName: string = '순서도_이미지.png'
): Promise<void> {
  if (!svgElement) {
    throw new Error('순서도 SVG 요소를 찾을 수 없습니다.');
  }

  const container = svgElement.closest('#flowchart-container') || svgElement.parentElement;

  try {
    // Primary approach: Render SVG directly to Canvas with 2x High-DPI
    const rect = svgElement.getBoundingClientRect();
    const width = Math.max(Math.round(rect.width) || 800, 600);
    const height = Math.max(Math.round(rect.height) || 600, 400);

    const svgClone = svgElement.cloneNode(true) as SVGSVGElement;
    svgClone.setAttribute('width', `${width}px`);
    svgClone.setAttribute('height', `${height}px`);
    svgClone.style.backgroundColor = '#ffffff';

    const svgString = new XMLSerializer().serializeToString(svgClone);
    const encodedSvg = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);

    const image = new Image();
    image.crossOrigin = 'anonymous';

    await new Promise<void>((resolve, reject) => {
      image.onload = () => {
        try {
          const scale = 2; // 2x DPI
          const canvas = document.createElement('canvas');
          canvas.width = width * scale;
          canvas.height = height * scale;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Canvas 2D context not available');
          }

          // Crisp white background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.scale(scale, scale);
          ctx.drawImage(image, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const downloadLink = document.createElement('a');
              downloadLink.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
              downloadLink.href = url;
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);
              setTimeout(() => URL.revokeObjectURL(url), 1000);
              resolve();
            } else {
              reject(new Error('PNG Blob 생성 실패'));
            }
          }, 'image/png');
        } catch (e) {
          reject(e);
        }
      };

      image.onerror = (err) => {
        reject(err);
      };

      image.src = encodedSvg;
    });
  } catch (directSvgErr) {
    console.warn('Direct SVG canvas render failed, falling back to html2canvas:', directSvgErr);

    // Secondary fallback: Use html2canvas on container
    if (container) {
      const canvas = await html2canvas(container as HTMLElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
      if (blob) {
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
        downloadLink.href = url;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } else {
        throw new Error('html2canvas PNG 변환에 실패했습니다.');
      }
    } else {
      throw directSvgErr;
    }
  }
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
    throw new Error('PDF로 변환할 활동지 요소를 찾을 수 없습니다.');
  }

  // Ensure styles and layout are computed
  const canvas = await html2canvas(targetElement, {
    scale: 2, // High resolution crisp text
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    windowWidth: 800,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

  const margin = 10; // 10mm margins
  const contentWidth = pdfWidth - (margin * 2); // 190mm
  const contentHeight = (canvas.height * contentWidth) / canvas.width;

  let heightLeft = contentHeight;
  let position = margin;

  // First page
  pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, contentHeight, undefined, 'FAST');
  heightLeft -= (pdfHeight - (margin * 2));

  // If content spans multiple pages
  while (heightLeft > 0) {
    position = heightLeft - contentHeight + margin;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, contentHeight, undefined, 'FAST');
    heightLeft -= (pdfHeight - (margin * 2));
  }

  pdf.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
}

