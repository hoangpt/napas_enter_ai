# Upload Controller - Mermaid Diagrams

## 1. Function Flow Diagram

```mermaid
flowchart TD
    A[Client POST /api/upload/document] --> B[Parse Request Args]
    B --> C{File exists?}
    C -->|No| D[Return 400: Chưa chọn file]
    C -->|Yes| E[OCRService.validate_image]
    
    E --> F{Image valid?}
    F -->|No| G[Return 400: Validation error]
    F -->|Yes| H[Create upload folder]
    
    H --> I[OCRService.save_uploaded_file]
    I --> J[Generate unique filename with timestamp]
    J --> K[Save file to disk]
    
    K --> L[OCRService.extract_legal_document_info]
    L --> M{use_fixtures?}
    
    M -->|True| N[Return MOCK_LEGAL_DOCUMENT_DATA]
    M -->|False| O[Call Azure OpenAI Vision API]
    O --> P[Parse JSON response]
    
    N --> Q{OCR Success?}
    P --> Q
    Q -->|No| R[Return 500: OCR Error]
    Q -->|Yes| S[DocumentProcessingService.search_existing_records]
    
    S --> T[Search NguyenDon by name]
    T --> U[Search BiDon by name]
    U --> V[Search HoSo by ma]
    
    V --> W[DocumentProcessingService.process_extracted_data]
    W --> X[Create NguyenDon]
    X --> Y[Create BiDon]
    Y --> Z[Create HoSoThuLy]
    
    Z --> AA[Cleanup: Remove temp file]
    AA --> BB[Return 200: Success with full data]
    
    %% Error handling
    L --> CC{Exception?}
    W --> CC
    CC -->|Yes| DD[Return 500: Server Error]
    
    %% Styling
    classDef successPath fill:#d4edda,stroke:#155724,stroke-width:2px
    classDef errorPath fill:#f8d7da,stroke:#721c24,stroke-width:2px
    classDef processPath fill:#d1ecf1,stroke:#0c5460,stroke-width:2px
    classDef decisionPath fill:#fff3cd,stroke:#856404,stroke-width:2px
    
    class A,B,E,H,I,J,K,L,S,T,U,V,W,X,Y,Z,AA,BB successPath
    class D,G,R,DD errorPath
    class N,O,P processPath
    class C,F,M,Q,CC decisionPath
```

## 2. Sequence Diagram

```mermaid
sequenceDiagram
    participant C as Client
    participant UC as UploadController
    participant RP as RequestParser
    participant OCR as OCRService
    participant DPS as DocumentProcessingService
    participant DB as Database
    participant FS as FileSystem
    participant Azure as Azure OpenAI

    Note over C,Azure: VKS Document Upload Flow

    C->>UC: POST /api/upload/document
    Note right of C: multipart/form-data<br/>file + use_fixtures
    
    UC->>RP: parse_args()
    RP-->>UC: {file, use_fixtures}
    
    alt no file
        UC-->>C: 400 - "Chưa chọn file"
    end
    
    UC->>OCR: validate_image(file)
    OCR->>OCR: check extension + PIL verify
    OCR-->>UC: (is_valid, message)
    
    alt invalid image
        UC-->>C: 400 - validation error
    end
    
    UC->>FS: makedirs(upload_folder)
    UC->>OCR: save_uploaded_file(file, folder)
    OCR->>FS: save with timestamp
    OCR-->>UC: file_path
    
    UC->>OCR: extract_legal_document_info(file_path, use_fixtures)
    
    alt use_fixtures=true
        OCR-->>UC: mock_data
    else use_fixtures=false
        OCR->>Azure: Vision API call
        Azure-->>OCR: JSON response
        OCR-->>UC: parsed_data
    end
    
    alt OCR failed
        UC-->>C: 500 - OCR error
    end
    
    UC->>DPS: search_existing_records(extracted_data)
    DPS->>DB: search NguyenDon, BiDon, HoSo
    DB-->>DPS: existing_records
    DPS-->>UC: existing_records
    
    UC->>DPS: process_extracted_data(extracted_data)
    DPS->>DB: CREATE NguyenDon
    DB-->>DPS: nguyen_don_id
    DPS->>DB: CREATE BiDon  
    DB-->>DPS: bi_don_id
    DPS->>DB: CREATE HoSoThuLy
    DB-->>DPS: ho_so_id
    DPS-->>UC: processing_result
    
    UC->>FS: remove(file_path)
    
    UC-->>C: 200 - Success Response
    Note left of C: {success, extracted_data,<br/>existing_records, processing_result}
```

## 3. Class Diagram

```mermaid
classDiagram
    class DocumentUpload {
        +post() dict
        -upload_parser RequestParser
        -models dict
    }
    
    class OCRService {
        +validate_image(file) tuple
        +save_uploaded_file(file, folder) str
        +extract_legal_document_info(path, use_fixtures) dict
    }
    
    class DocumentProcessingService {
        +search_existing_records(data) dict
        +process_extracted_data(data) dict
    }
    
    class NguyenDonService {
        +create(data) NguyenDon
        +search_by_name(name) List
    }
    
    class BiDonService {
        +create(data) BiDon
        +search_by_name(name) List
    }
    
    class HoSoThuLyService {
        +create(data) HoSoThuLy
        +search_by_ma(ma) List
    }
    
    DocumentUpload --> OCRService : validates & extracts
    DocumentUpload --> DocumentProcessingService : processes data
    DocumentProcessingService --> NguyenDonService : creates plaintiff
    DocumentProcessingService --> BiDonService : creates defendant
    DocumentProcessingService --> HoSoThuLyService : creates case file
```

## 4. Component Diagram

```mermaid
graph TB
    subgraph "Upload Controller Layer"
        UC[DocumentUpload.post]
        RP[RequestParser]
        FV[File Validation]
    end
    
    subgraph "Service Layer"
        OCR[OCRService]
        DPS[DocumentProcessingService]
        NS[NguyenDonService]
        BS[BiDonService]
        HS[HoSoThuLyService]
    end
    
    subgraph "External Services"
        Azure[Azure OpenAI Vision]
        Mock[Mock Fixtures]
    end
    
    subgraph "Storage Layer"
        FS[File System]
        DB[SQLite Database]
    end
    
    UC --> RP
    UC --> FV
    UC --> OCR
    UC --> DPS
    
    OCR --> Azure
    OCR --> Mock
    OCR --> FS
    
    DPS --> NS
    DPS --> BS
    DPS --> HS
    
    NS --> DB
    BS --> DB
    HS --> DB
    
    %% Styling
    classDef controller fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef service fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef external fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef storage fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    
    class UC,RP,FV controller
    class OCR,DPS,NS,BS,HS service
    class Azure,Mock external
    class FS,DB storage
```

## 5. State Diagram

```mermaid
stateDiagram-v2
    [*] --> RequestReceived
    RequestReceived --> ParseArgs
    ParseArgs --> FileValidation
    
    FileValidation --> FileValid: valid image
    FileValidation --> Error400: invalid/missing file
    
    FileValid --> FileSaved
    FileSaved --> OCRProcessing
    
    OCRProcessing --> MockData: use_fixtures=true
    OCRProcessing --> AzureAPI: use_fixtures=false
    
    MockData --> DataExtracted
    AzureAPI --> DataExtracted: success
    AzureAPI --> Error500: API failure
    
    DataExtracted --> SearchExisting
    SearchExisting --> ProcessData
    ProcessData --> CreateNguyenDon
    
    CreateNguyenDon --> CreateBiDon
    CreateBiDon --> CreateHoSo
    CreateHoSo --> CleanupFile
    
    CleanupFile --> Success200
    Success200 --> [*]
    
    Error400 --> [*]
    Error500 --> [*]
    
    ProcessData --> Error500: DB error
```

## Summary

Các diagram này mô tả:

1. **Flowchart**: Luồng logic chi tiết với các nhánh decision
2. **Sequence**: Tương tác giữa các components theo thời gian
3. **Class**: Cấu trúc và relationships giữa các classes
4. **Component**: Kiến trúc tổng thể và dependencies
5. **State**: Các trạng thái và transitions của request

Mỗi diagram cung cấp góc nhìn khác nhau về cùng một function `post(self)` trong DocumentUpload controller.
