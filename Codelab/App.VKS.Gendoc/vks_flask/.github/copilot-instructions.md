# VKS Flask API - AI Coding Instructions

## Architecture Overview

This is a **Vietnamese Prosecution Service (VKS) case management system** built with Flask using a **3-layer MVC architecture** + Swagger documentation. The system manages legal cases with three main entities: `NguyenDon` (plaintiffs), `BiDon` (defendants), and `HoSoThuLy` (case files).

### Core Components
- **Models** (`models/__init__.py`): SQLAlchemy models with `to_dict()` serialization methods
- **Services** (`services/`): Business logic layer with static methods for CRUD operations
- **Controllers** (`controllers/`): Flask-RESTX resources handling HTTP requests/responses
- **Swagger Models** (`swagger_models.py`): Centralized API documentation schemas
- **OCR Service** (`services/ocr_service.py`): Azure OpenAI Vision integration for document processing

## Key Entry Points

- **Primary app**: `app_swagger.py` (recommended) - Full Swagger documentation + Upload OCR
- **Alternative**: `app_new.py` - MVC without Swagger
- **Legacy**: `app.py` - Basic user API only

Always start the application with `python app_swagger.py` for complete API documentation at `/swagger/`.

## Architecture Patterns

### Model Pattern
```python
# All models follow this pattern:
class Entity(db.Model):
    # Standard fields with timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Required serialization methods
    def to_dict(self):        # Full nested data
    def to_dict_simple(self):  # No nested relationships
```

### Service Layer Pattern
```python
# All services use static methods with consistent signatures:
class EntityService:
    @staticmethod
    def get_all()                    # List all
    @staticmethod
    def get_by_id(id)               # Get single by ID
    @staticmethod
    def create(data)                # Create new
    @staticmethod
    def update(id, data)            # Update existing
    @staticmethod
    def delete(id)                  # Delete by ID
    @staticmethod
    def search_by_name(name)        # Search functionality
```

### Controller Initialization Pattern
Controllers require model injection from the main app:
```python
# In each controller file:
models = {}
def init_models(swagger_models):
    global models
    models.update(swagger_models)

# In app_swagger.py:
init_nguyen_don_models(swagger_models)
```

## Database Relationships

- `HoSoThuLy` (case files) **requires** both `nguyen_don_id` and `bi_don_id`
- Relationships use `backref` for bidirectional access
- Foreign key constraints are enforced (`nullable=False`)

## API Conventions

### URL Structure
- All endpoints prefixed with `/api/`
- Namespaces: `/nguyen-don`, `/bi-don`, `/ho-so`, `/statistics`, `/upload`
- Individual resources: `/api/entity/{id}`
- Search by code: `/api/ho-so/ma/{ma}`
- Upload endpoints: `/api/upload/document`, `/api/upload/extract-only`

### Request/Response Patterns
- **POST/PUT**: Expect JSON input models (without ID/timestamps)
- **GET**: Return full nested objects via `to_dict()`
- **Search**: Use query parameters (`?search=name`, `?ma=code`)
- **Upload**: Accept `multipart/form-data` with 'file' key for image uploads
- **Date filtering**: `?start_date=2025-01-01&end_date=2025-12-31`

### Error Handling
```python
try:
    # operation
    return result, 200
except Exception as e:
    return {'error': str(e)}, 500
```

## Development Workflow

### Running the Application
```bash
# Development with Swagger (recommended)
python app_swagger.py

# Alternative MVC version
python app_new.py

# Access Swagger UI at: http://localhost:5000/swagger/
```

### Azure OpenAI Configuration
Required for upload OCR functionality:
```bash
# Copy .env.example to .env and configure:
AZURE_OPENAI_API_KEY=your_key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4-vision-preview
```

### Testing
- **Interactive**: Use Swagger UI at `/swagger/` for immediate API testing
- **Upload OCR**: Run `python test_upload_api.py` 
- **Automated**: Run `python test_swagger_api.py`
- **Manual**: curl examples in `README.md`

### Database Operations
- SQLite database auto-created as `instance/vks_app.db`
- Use `db.create_all()` in app context for schema creation
- All timestamps in ISO format (`datetime.isoformat()`)

## Vietnamese Context

This system uses Vietnamese legal terminology:
- `NguyenDon`: Plaintiff/Petitioner
- `BiDon`: Defendant/Respondent  
- `HoSoThuLy`: Case file/Legal proceeding
- `ma`: Case code/identifier
- `vu_viec`: Legal case/matter

Field names and API responses are in Vietnamese. Maintain this convention when extending the system.

## Common Tasks

### Adding New Entity
1. Create model in `models/__init__.py` with standard timestamps
2. Add service class in `services/` following static method pattern
3. Create controller in `controllers/` with model injection
4. Define Swagger models in `swagger_models.py`
5. Register namespace in `app_swagger.py`

### Search Implementation
Implement search in service layer using SQLAlchemy filters:
```python
@staticmethod
def search_by_name(name):
    return Entity.query.filter(Entity.ten.like(f'%{name}%')).all()
```

Use query parameters in controllers: `request.args.get('search')`

### Upload OCR Workflow
1. **File Upload**: Accept multipart/form-data with 'file' key
2. **Validation**: Use `OCRService.validate_image()` for file type checking
3. **OCR Processing**: `OCRService.extract_legal_document_info()` with Azure OpenAI Vision
4. **Data Processing**: `DocumentProcessingService.process_extracted_data()` to save to DB
5. **Response**: Return extracted data + processing results + existing record checks
