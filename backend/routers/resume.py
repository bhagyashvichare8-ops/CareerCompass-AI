from fastapi import APIRouter, UploadFile, File
import fitz  # PyMuPDF

router = APIRouter()

@router.post("/resume/upload")
async def upload_resume(file: UploadFile = File(...)):

    pdf_bytes = await file.read()

    doc = fitz.open(stream=pdf_bytes, filetype="pdf")

    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()

    return {
        "filename": file.filename,
        "text": text[:1000]
    }