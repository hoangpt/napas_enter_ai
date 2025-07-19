```mermaid
sequenceDiagram
    participant Client
    participant UploadController as DocumentUpload.post()
    participant RequestParser as upload_parser
    participant OCRService
    participant DocumentProcessingService
    participant Database as DB
    participant FileSystem as FS
    participant Azure as Azure OpenAI

    Note over Client, Azure: VKS Upload Document Workflow

    %% 1. Request Processing
    Client->>UploadController: POST /api/upload/document
    Note right of Client: multipart/form-data<br/>file + use_fixtures
    
    UploadController->>RequestParser: parse_args()
    RequestParser-->>UploadController: args{file, use_fixtures}
    
    alt file is missing
        UploadController-->>Client: 400 - "Chưa chọn file"
    end

    %% 2. File Validation
    UploadController->>OCRService: validate_image(file)
    OCRService->>OCRService: check_extension()
    OCRService->>OCRService: PIL.Image.open(file)
    OCRService->>OCRService: image.verify()
    OCRService-->>UploadController: (is_valid, message)
    
    alt validation failed
        UploadController-->>Client: 400 - validation error
    end

    %% 3. File Upload
    UploadController->>FS: check upload_folder exists
    alt folder not exists
        UploadController->>FS: makedirs(upload_folder)
    end
    
    UploadController->>OCRService: save_uploaded_file(file, folder)
    OCRService->>OCRService: generate_unique_filename()
    OCRService->>FS: save file with timestamp
    OCRService-->>UploadController: file_path

    %% 4. OCR Processing
    UploadController->>OCRService: extract_legal_document_info(file_path, use_fixtures)
    
    alt use_fixtures = true
        OCRService->>OCRService: return MOCK_LEGAL_DOCUMENT_DATA
        OCRService-->>UploadController: mock_result
    else use_fixtures = false
        OCRService->>OCRService: validate Azure config
        OCRService->>FS: read and encode image to base64
        OCRService->>Azure: POST vision API request
        Note right of Azure: GPT-4 Vision analysis<br/>Vietnamese legal document
        Azure-->>OCRService: JSON response
        OCRService->>OCRService: parse and clean JSON
        OCRService-->>UploadController: extracted_data
    end

    alt OCR failed
        UploadController-->>Client: 500 - OCR error
    end

    %% 5. Database Processing
    UploadController->>DocumentProcessingService: search_existing_records(extracted_data)
    DocumentProcessingService->>Database: search NguyenDon by name
    DocumentProcessingService->>Database: search BiDon by name  
    DocumentProcessingService->>Database: search HoSo by ma
    DocumentProcessingService-->>UploadController: existing_records

    UploadController->>DocumentProcessingService: process_extracted_data(extracted_data)
    
    %% 5.1 Create NguyenDon
    DocumentProcessingService->>Database: CREATE NguyenDon
    Database-->>DocumentProcessingService: nguyen_don_id
    
    %% 5.2 Create BiDon
    DocumentProcessingService->>Database: CREATE BiDon
    Database-->>DocumentProcessingService: bi_don_id
    
    %% 5.3 Create HoSo
    DocumentProcessingService->>Database: CREATE HoSoThuLy
    Note right of Database: Links nguyen_don_id + bi_don_id
    Database-->>DocumentProcessingService: ho_so_id
    
    DocumentProcessingService-->>UploadController: processing_result

    %% 6. Cleanup
    UploadController->>FS: remove(file_path)
    Note right of FS: Optional cleanup

    %% 7. Response
    UploadController-->>Client: 200 - Success Response
    Note left of Client: {<br/>  success: true,<br/>  extracted_data: {...},<br/>  existing_records: {...},<br/>  processing_result: {...}<br/>}

    %% Error Handling
    rect rgb(255, 200, 200)
        Note over UploadController: Exception Handler
        alt Any Exception
            UploadController-->>Client: 500 - Server Error
        end
    end
```

## Sequence Diagram Analysis

### **Flow Overview:**
1. **Request Processing** - Parse multipart form data
2. **File Validation** - Check image format using PIL
3. **File Upload** - Save with unique timestamp filename
4. **OCR Processing** - Extract data (Mock or Azure OpenAI)
5. **Database Processing** - Save NguyenDon → BiDon → HoSo
6. **Cleanup** - Remove temporary file
7. **Response** - Return comprehensive result

### **Key Decision Points:**
- **File Validation**: PIL image verification
- **OCR Mode**: Mock data vs Azure OpenAI Vision
- **Database Transaction**: Sequential creation with foreign keys
- **Error Handling**: Try-catch at each major step

### **Data Flow:**
```
multipart/form-data → FileStorage → PIL validation → 
Disk storage → OCR analysis → Database entities → 
JSON response
```

### **Error Scenarios:**
- Missing file → 400
- Invalid image → 400  
- OCR failure → 500
- Database error → 500
- General exception → 500

This sequence diagram shows the complete flow of the document upload and processing workflow in the VKS system.
