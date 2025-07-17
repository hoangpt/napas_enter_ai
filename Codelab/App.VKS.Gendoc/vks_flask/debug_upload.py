"""
Debug script để test upload API và identify issues
"""
import sys
import os

print("=== VKS Upload API Debug Script ===")
print(f"Python version: {sys.version}")
print(f"Working directory: {os.getcwd()}")
print()

# Test 1: Import modules
print("1. Testing module imports...")
try:
    from flask import Flask
    print("✓ Flask imported successfully")
except ImportError as e:
    print(f"✗ Flask import failed: {e}")

try:
    from flask_restx import Api, Resource, reqparse
    print("✓ Flask-RESTX imported successfully")
except ImportError as e:
    print(f"✗ Flask-RESTX import failed: {e}")

try:
    from openai import AzureOpenAI
    print("✓ OpenAI imported successfully")
except ImportError as e:
    print(f"✗ OpenAI import failed: {e}")

try:
    from PIL import Image
    print("✓ PIL imported successfully")
except ImportError as e:
    print(f"✗ PIL import failed: {e}")

print()

# Test 2: Check local modules
print("2. Testing local module imports...")
try:
    from models import db, NguyenDon, BiDon, HoSoThuLy
    print("✓ Models imported successfully")
except ImportError as e:
    print(f"✗ Models import failed: {e}")

try:
    from services.ocr_service import OCRService
    print("✓ OCR Service imported successfully")
except ImportError as e:
    print(f"✗ OCR Service import failed: {e}")

try:
    from controllers.upload_controller import upload_ns
    print("✓ Upload Controller imported successfully")
except ImportError as e:
    print(f"✗ Upload Controller import failed: {e}")

print()

# Test 3: Check environment variables
print("3. Checking environment variables...")
from dotenv import load_dotenv
load_dotenv()

azure_key = os.getenv('AZURE_OPENAI_API_KEY')
azure_endpoint = os.getenv('AZURE_OPENAI_ENDPOINT')

print(f"AZURE_OPENAI_API_KEY: {'SET' if azure_key else 'NOT SET'}")
print(f"AZURE_OPENAI_ENDPOINT: {'SET' if azure_endpoint else 'NOT SET'}")

if not azure_key or not azure_endpoint:
    print("⚠️  Warning: Azure OpenAI not configured. Upload OCR will not work.")
print()

# Test 4: Test Flask app creation
print("4. Testing Flask app creation...")
try:
    from app_swagger import create_app
    app = create_app()
    print("✓ Flask app created successfully")
    
    with app.app_context():
        print("✓ App context working")
        
        # Test database
        from models import db
        db.create_all()
        print("✓ Database tables created")
        
except Exception as e:
    print(f"✗ Flask app creation failed: {e}")
    import traceback
    traceback.print_exc()

print()

# Test 5: Test upload endpoints
print("5. Testing upload endpoints...")
try:
    from app_swagger import create_app
    app = create_app()
    
    with app.test_client() as client:
        # Test GET /api/upload/test
        response = client.get('/api/upload/test')
        print(f"GET /api/upload/test: {response.status_code}")
        if response.status_code == 200:
            print(f"Response: {response.get_json()}")
        else:
            print(f"Error response: {response.get_data(as_text=True)}")
            
except Exception as e:
    print(f"✗ Upload endpoint test failed: {e}")
    import traceback
    traceback.print_exc()

print()
print("=== Debug Complete ===")
print()
print("Next steps:")
print("1. If imports failed, install: pip install -r requirements.txt")
print("2. If Azure not configured, copy .env.example to .env and configure")
print("3. Run app with: python app_swagger.py")
print("4. Test upload at: http://localhost:5000/swagger/")
