import requests
import re
import os

BASE_URL = "http://127.0.0.1:8000/api/auth"

def test_onboarding_flow():
    print("🚀 Starting Security & Onboarding Flow Test...\n")
    
    # 1. Registration
    print("--> 1. Registering new patient: Dev Tester")
    payload = {
        "first_name": "Dev",
        "last_name": "Tester",
        "phone": "1234567890",
        "dob": "1990-01-01",
        "gender": "Other",
        "blood_type": "O+",
        "password": "devpassword123"
    }
    headers = {
        "X-Device-Token": "nurse-station-approved"
    }
    
    response = requests.post(f"{BASE_URL}/register-patient", json=payload, headers=headers)
    
    if response.status_code != 200:
        print(f"❌ Failed to register: {response.text}")
        return

    # Extract ID from the filename header
    content_disp = response.headers.get("Content-Disposition", "")
    match = re.search(r'admission_card_(.*)\.pdf', content_disp)
    medical_id = match.group(1) if match else None

    if not medical_id:
        print("❌ Could not extract Medical ID from response headers.")
        return

    print(f"✅ Success! Generated Medical ID: {medical_id}")
    
    # Save PDF
    pdf_filename = f"onboarding_test_{medical_id}.pdf"
    with open(pdf_filename, "wb") as f:
        f.write(response.content)
    print(f"✅ PDF Admission Slip downloaded as: {pdf_filename}\n")
    
    # 2. Login
    print(f"--> 2. Attempting to log in with ID: {medical_id}")
    login_payload = {
        "medical_id": medical_id,
        "password": "devpassword123"
    }
    
    login_response = requests.post(f"{BASE_URL}/login", json=login_payload)
    if login_response.status_code == 200:
        data = login_response.json()
        print(login_response.json())
        
        print(f"✅ Login Successful!")
        print(f"🔑 JWT Token retrieved: {data.get('access_token')[:30]}...[truncated]")
        print(f"👤 Role: {data.get('role')}")
    else:
        print(f"❌ Login Failed: {login_response.text}")

if __name__ == "__main__":
    test_onboarding_flow()
