import { getDocument } from 'pdfjs-dist';




// URL to your PDF file
const pdfUrl = 'https://resources.finalsite.net/images/v1644511552/elmhurst205org/nrpcwrsm3gnvodilif91/FH_5FactsAboutDogs.pdf'


// Asynchronous function to extract text
export default async function extractTextFromPDF(pdfLink) {
    console.log(pdfLink)



    const loadingTask = getDocument(pdfLink);

    const pdfDocument = await loadingTask.promise;

    const totalPages = pdfDocument.numPages;
    let pdfText = '';

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        pdfText += pageText + ' ';
    }

    return pdfText;
}

// Call the function to extract text

