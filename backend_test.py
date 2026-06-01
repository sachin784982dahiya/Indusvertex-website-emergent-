#!/usr/bin/env python3
"""
Backend API Test Suite for IndusVertex
Tests all API endpoints at NEXT_PUBLIC_BASE_URL/api
"""

import requests
import json
import sys
from typing import Dict, Any

# Base URL from environment
BASE_URL = "https://infrastructure-hub-53.preview.emergentagent.com/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'

def log_test(name: str):
    print(f"\n{Colors.BLUE}{'='*80}{Colors.END}")
    print(f"{Colors.BLUE}TEST: {name}{Colors.END}")
    print(f"{Colors.BLUE}{'='*80}{Colors.END}")

def log_success(msg: str):
    print(f"{Colors.GREEN}✓ {msg}{Colors.END}")

def log_error(msg: str):
    print(f"{Colors.RED}✗ {msg}{Colors.END}")

def log_info(msg: str):
    print(f"{Colors.YELLOW}ℹ {msg}{Colors.END}")

def test_health():
    """Test GET /api/health"""
    log_test("Health Check - GET /api/health")
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        log_info(f"Status: {response.status_code}")
        log_info(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('ok') == True and data.get('service') == 'IndusVertex API':
                log_success("Health endpoint working correctly")
                return True
            else:
                log_error(f"Unexpected response structure: {data}")
                return False
        else:
            log_error(f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        log_error(f"Exception: {str(e)}")
        return False

def test_lead_capture_endpoints():
    """Test POST /api/contact, /api/consultation, /api/service-inquiry, /api/project-inquiry"""
    log_test("Lead Capture Endpoints")
    
    endpoints = ['contact', 'consultation', 'service-inquiry', 'project-inquiry']
    all_passed = True
    lead_ids = []
    
    for endpoint in endpoints:
        log_info(f"\nTesting POST /api/{endpoint}")
        
        # Test valid submission
        try:
            payload = {
                "name": "Rajesh Kumar",
                "email": "rajesh.kumar@acmecorp.in",
                "phone": "+91 98765 43210",
                "company": "ACME Industries Pvt Ltd",
                "subject": "Infrastructure Consultation",
                "service": "Data Centre",
                "message": "We need consultation for our upcoming data centre project in Bangalore."
            }
            
            response = requests.post(f"{BASE_URL}/{endpoint}", json=payload, timeout=10)
            log_info(f"Status: {response.status_code}")
            log_info(f"Response: {response.text}")
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') == True and 'id' in data and 'message' in data:
                    log_success(f"Valid submission to /{endpoint} successful")
                    lead_ids.append(data['id'])
                else:
                    log_error(f"Unexpected response structure: {data}")
                    all_passed = False
            else:
                log_error(f"Expected 200, got {response.status_code}")
                all_passed = False
        except Exception as e:
            log_error(f"Exception on valid submission: {str(e)}")
            all_passed = False
        
        # Test validation (missing name)
        try:
            invalid_payload = {
                "email": "test@example.com",
                "message": "Test"
            }
            
            response = requests.post(f"{BASE_URL}/{endpoint}", json=invalid_payload, timeout=10)
            log_info(f"Validation test status: {response.status_code}")
            log_info(f"Validation response: {response.text}")
            
            if response.status_code == 400:
                data = response.json()
                if 'error' in data and 'Name and email are required' in data['error']:
                    log_success(f"Validation working correctly for /{endpoint}")
                else:
                    log_error(f"Unexpected error message: {data}")
                    all_passed = False
            else:
                log_error(f"Expected 400 for validation error, got {response.status_code}")
                all_passed = False
        except Exception as e:
            log_error(f"Exception on validation test: {str(e)}")
            all_passed = False
    
    return all_passed, lead_ids

def test_get_leads():
    """Test GET /api/leads"""
    log_test("Get Leads - GET /api/leads")
    try:
        response = requests.get(f"{BASE_URL}/leads", timeout=10)
        log_info(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if 'leads' in data and isinstance(data['leads'], list):
                log_info(f"Found {len(data['leads'])} leads")
                if len(data['leads']) > 0:
                    log_info(f"Sample lead: {json.dumps(data['leads'][0], indent=2)}")
                log_success("GET /api/leads working correctly")
                return True
            else:
                log_error(f"Unexpected response structure: {data}")
                return False
        else:
            log_error(f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        log_error(f"Exception: {str(e)}")
        return False

def test_careers_get():
    """Test GET /api/careers (should auto-seed 5 jobs on first call)"""
    log_test("Get Careers - GET /api/careers")
    try:
        response = requests.get(f"{BASE_URL}/careers", timeout=10)
        log_info(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if 'jobs' in data and isinstance(data['jobs'], list):
                jobs = data['jobs']
                log_info(f"Found {len(jobs)} jobs")
                
                if len(jobs) >= 5:
                    log_success(f"Auto-seeding working - found {len(jobs)} jobs")
                    
                    # Verify job structure
                    sample_job = jobs[0]
                    required_fields = ['id', 'title', 'department', 'location', 'type', 'experience', 'description', 'createdAt']
                    missing_fields = [f for f in required_fields if f not in sample_job]
                    
                    if not missing_fields:
                        log_success("Job structure is correct")
                        log_info(f"Sample job: {json.dumps(sample_job, indent=2)}")
                        return True
                    else:
                        log_error(f"Missing fields in job: {missing_fields}")
                        return False
                else:
                    log_error(f"Expected at least 5 jobs, got {len(jobs)}")
                    return False
            else:
                log_error(f"Unexpected response structure: {data}")
                return False
        else:
            log_error(f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        log_error(f"Exception: {str(e)}")
        return False

def test_careers_post():
    """Test POST /api/careers"""
    log_test("Create Job - POST /api/careers")
    try:
        payload = {
            "title": "QA Automation Engineer",
            "department": "Quality Assurance",
            "location": "Remote",
            "type": "Full-time",
            "experience": "2-4 years",
            "description": "Develop and maintain automated test suites for our enterprise applications."
        }
        
        response = requests.post(f"{BASE_URL}/careers", json=payload, timeout=10)
        log_info(f"Status: {response.status_code}")
        log_info(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') == True and 'job' in data:
                log_success("Job creation successful")
                log_info(f"Created job: {json.dumps(data['job'], indent=2)}")
                return True
            else:
                log_error(f"Unexpected response structure: {data}")
                return False
        else:
            log_error(f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        log_error(f"Exception: {str(e)}")
        return False

def test_career_application():
    """Test POST /api/career-application"""
    log_test("Career Application - POST /api/career-application")
    
    # Test valid application
    try:
        payload = {
            "name": "Priya Sharma",
            "email": "priya.sharma@gmail.com",
            "phone": "+91 98765 12345",
            "jobTitle": "Senior Electrical Engineer",
            "experience": "6 years in HT/LT power systems",
            "coverLetter": "I am excited to apply for the Senior Electrical Engineer position. With 6 years of experience in power transmission projects...",
            "resumeUrl": "https://example.com/resumes/priya-sharma.pdf"
        }
        
        response = requests.post(f"{BASE_URL}/career-application", json=payload, timeout=10)
        log_info(f"Status: {response.status_code}")
        log_info(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') == True and 'id' in data:
                log_success("Valid application submission successful")
            else:
                log_error(f"Unexpected response structure: {data}")
                return False
        else:
            log_error(f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        log_error(f"Exception on valid application: {str(e)}")
        return False
    
    # Test validation (missing jobTitle)
    try:
        invalid_payload = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+91 1234567890"
        }
        
        response = requests.post(f"{BASE_URL}/career-application", json=invalid_payload, timeout=10)
        log_info(f"Validation test status: {response.status_code}")
        log_info(f"Validation response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if 'error' in data:
                log_success("Validation working correctly for career application")
                return True
            else:
                log_error(f"Unexpected error structure: {data}")
                return False
        else:
            log_error(f"Expected 400 for validation error, got {response.status_code}")
            return False
    except Exception as e:
        log_error(f"Exception on validation test: {str(e)}")
        return False

def test_projects():
    """Test GET /api/projects (should auto-seed 6 projects on first call)"""
    log_test("Get Projects - GET /api/projects")
    try:
        response = requests.get(f"{BASE_URL}/projects", timeout=10)
        log_info(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if 'projects' in data and isinstance(data['projects'], list):
                projects = data['projects']
                log_info(f"Found {len(projects)} projects")
                
                if len(projects) >= 6:
                    log_success(f"Auto-seeding working - found {len(projects)} projects")
                    
                    # Verify project structure
                    sample_project = projects[0]
                    required_fields = ['id', 'title', 'client', 'location', 'description', 'completionDate', 'category', 'image', 'createdAt']
                    missing_fields = [f for f in required_fields if f not in sample_project]
                    
                    if not missing_fields:
                        log_success("Project structure is correct")
                        log_info(f"Sample project: {json.dumps(sample_project, indent=2)}")
                        return True
                    else:
                        log_error(f"Missing fields in project: {missing_fields}")
                        return False
                else:
                    log_error(f"Expected at least 6 projects, got {len(projects)}")
                    return False
            else:
                log_error(f"Unexpected response structure: {data}")
                return False
        else:
            log_error(f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        log_error(f"Exception: {str(e)}")
        return False

def test_testimonials():
    """Test GET /api/testimonials (should auto-seed 3 testimonials on first call)"""
    log_test("Get Testimonials - GET /api/testimonials")
    try:
        response = requests.get(f"{BASE_URL}/testimonials", timeout=10)
        log_info(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if 'testimonials' in data and isinstance(data['testimonials'], list):
                testimonials = data['testimonials']
                log_info(f"Found {len(testimonials)} testimonials")
                
                if len(testimonials) >= 3:
                    log_success(f"Auto-seeding working - found {len(testimonials)} testimonials")
                    log_info(f"Sample testimonial: {json.dumps(testimonials[0], indent=2)}")
                    return True
                else:
                    log_error(f"Expected at least 3 testimonials, got {len(testimonials)}")
                    return False
            else:
                log_error(f"Unexpected response structure: {data}")
                return False
        else:
            log_error(f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        log_error(f"Exception: {str(e)}")
        return False

def test_stats():
    """Test GET /api/stats"""
    log_test("Get Stats - GET /api/stats")
    try:
        response = requests.get(f"{BASE_URL}/stats", timeout=10)
        log_info(f"Status: {response.status_code}")
        log_info(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if 'stats' in data and isinstance(data['stats'], list):
                stats = data['stats']
                if len(stats) == 4:
                    # Verify each stat has label, value, suffix
                    all_valid = all('label' in s and 'value' in s and 'suffix' in s for s in stats)
                    if all_valid:
                        log_success("Stats endpoint working correctly")
                        log_info(f"Stats: {json.dumps(stats, indent=2)}")
                        return True
                    else:
                        log_error("Some stats missing required fields")
                        return False
                else:
                    log_error(f"Expected 4 stats, got {len(stats)}")
                    return False
            else:
                log_error(f"Unexpected response structure: {data}")
                return False
        else:
            log_error(f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        log_error(f"Exception: {str(e)}")
        return False

def test_404():
    """Test GET /api/unknown-path (should return 404)"""
    log_test("404 Handling - GET /api/unknown-path")
    try:
        response = requests.get(f"{BASE_URL}/unknown-path-xyz-123", timeout=10)
        log_info(f"Status: {response.status_code}")
        log_info(f"Response: {response.text}")
        
        if response.status_code == 404:
            data = response.json()
            if 'error' in data and data['error'] == 'Not found':
                log_success("404 handling working correctly")
                return True
            else:
                log_error(f"Unexpected error message: {data}")
                return False
        else:
            log_error(f"Expected 404, got {response.status_code}")
            return False
    except Exception as e:
        log_error(f"Exception: {str(e)}")
        return False

def main():
    print(f"\n{Colors.BLUE}{'='*80}{Colors.END}")
    print(f"{Colors.BLUE}IndusVertex Backend API Test Suite{Colors.END}")
    print(f"{Colors.BLUE}Base URL: {BASE_URL}{Colors.END}")
    print(f"{Colors.BLUE}{'='*80}{Colors.END}")
    
    results = {}
    
    # Run all tests
    results['health'] = test_health()
    results['lead_capture'], lead_ids = test_lead_capture_endpoints()
    results['get_leads'] = test_get_leads()
    results['careers_get'] = test_careers_get()
    results['careers_post'] = test_careers_post()
    results['career_application'] = test_career_application()
    results['projects'] = test_projects()
    results['testimonials'] = test_testimonials()
    results['stats'] = test_stats()
    results['404'] = test_404()
    
    # Summary
    print(f"\n{Colors.BLUE}{'='*80}{Colors.END}")
    print(f"{Colors.BLUE}TEST SUMMARY{Colors.END}")
    print(f"{Colors.BLUE}{'='*80}{Colors.END}")
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = f"{Colors.GREEN}PASS{Colors.END}" if result else f"{Colors.RED}FAIL{Colors.END}"
        print(f"{test_name}: {status}")
    
    print(f"\n{Colors.BLUE}Total: {passed}/{total} tests passed{Colors.END}")
    
    if passed == total:
        print(f"{Colors.GREEN}All tests passed!{Colors.END}")
        return 0
    else:
        print(f"{Colors.RED}Some tests failed!{Colors.END}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
