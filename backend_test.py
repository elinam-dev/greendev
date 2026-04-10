#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class GreenDevAPITester:
    def __init__(self, base_url="https://sustainability-hub-52.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if headers:
            test_headers.update(headers)
        
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=test_headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, dict) and len(response_data) <= 3:
                        print(f"   Response: {response_data}")
                    elif isinstance(response_data, list) and len(response_data) <= 2:
                        print(f"   Response: {len(response_data)} items")
                except:
                    pass
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error: {response.text}")
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'endpoint': endpoint
                })

            return success, response.json() if response.content else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'name': name,
                'error': str(e),
                'endpoint': endpoint
            })
            return False, {}

    def test_auth_login(self, email, password):
        """Test admin login"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "api/auth/login",
            200,
            data={"email": email, "password": password}
        )
        if success and 'access_token' in response:
            self.token = response['access_token']
            print(f"   ✅ Token acquired")
            return True
        return False

    def test_auth_me(self):
        """Test get current user"""
        success, response = self.run_test(
            "Get Current User",
            "GET",
            "api/auth/me",
            200
        )
        return success

    def test_auth_logout(self):
        """Test logout"""
        success, response = self.run_test(
            "Admin Logout",
            "POST",
            "api/auth/logout",
            200
        )
        return success

    def test_contact_submission(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+233123456789",
            "company": "Test Company",
            "service": "Environmental Impact Assessment",
            "message": "This is a test message for the contact form."
        }
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=contact_data
        )
        return response.get('id') if success else None

    def test_get_stats(self):
        """Test stats endpoint"""
        success, response = self.run_test(
            "Get Stats",
            "GET",
            "api/stats",
            200
        )
        return success

    def test_get_projects(self):
        """Test get projects"""
        success, response = self.run_test(
            "Get All Projects",
            "GET",
            "api/projects",
            200
        )
        return response if success else []

    def test_get_featured_projects(self):
        """Test get featured projects"""
        success, response = self.run_test(
            "Get Featured Projects",
            "GET",
            "api/projects?featured=true",
            200
        )
        return response if success else []

    def test_get_projects_by_industry(self):
        """Test get projects by industry"""
        success, response = self.run_test(
            "Get Projects by Industry",
            "GET",
            "api/projects?industry=Oil & Gas",
            200
        )
        return response if success else []

    def test_get_team(self):
        """Test get team members"""
        success, response = self.run_test(
            "Get Team Members",
            "GET",
            "api/team",
            200
        )
        return response if success else []

    def test_get_clients(self):
        """Test get client logos"""
        success, response = self.run_test(
            "Get Client Logos",
            "GET",
            "api/clients",
            200
        )
        return response if success else []

    def test_get_testimonials(self):
        """Test get testimonials"""
        success, response = self.run_test(
            "Get Testimonials",
            "GET",
            "api/testimonials",
            200
        )
        return response if success else []

    def test_admin_contact_submissions(self):
        """Test admin get contact submissions"""
        success, response = self.run_test(
            "Admin Get Contact Submissions",
            "GET",
            "api/admin/contact-submissions",
            200
        )
        return response if success else []

    def test_admin_create_project(self):
        """Test admin create project"""
        project_data = {
            "client_name": "Test Client",
            "project_type": "Test Project Type",
            "location": "Test Location",
            "summary": "This is a test project summary.",
            "year": 2024,
            "industry": "Testing",
            "featured": False
        }
        success, response = self.run_test(
            "Admin Create Project",
            "POST",
            "api/admin/projects",
            200,
            data=project_data
        )
        return response.get('id') if success else None

    def test_admin_update_project(self, project_id):
        """Test admin update project"""
        if not project_id:
            return False
        
        update_data = {
            "client_name": "Updated Test Client",
            "project_type": "Updated Project Type",
            "location": "Updated Location",
            "summary": "This is an updated test project summary.",
            "year": 2024,
            "industry": "Updated Testing",
            "featured": True
        }
        success, response = self.run_test(
            "Admin Update Project",
            "PUT",
            f"api/admin/projects/{project_id}",
            200,
            data=update_data
        )
        return success

    def test_admin_delete_project(self, project_id):
        """Test admin delete project"""
        if not project_id:
            return False
        
        success, response = self.run_test(
            "Admin Delete Project",
            "DELETE",
            f"api/admin/projects/{project_id}",
            200
        )
        return success

    def test_admin_create_team_member(self):
        """Test admin create team member"""
        team_data = {
            "name": "Test Team Member",
            "role": "Test Role",
            "expertise": "Test Expertise",
            "bio": "This is a test bio.",
            "order": 99
        }
        success, response = self.run_test(
            "Admin Create Team Member",
            "POST",
            "api/admin/team",
            200,
            data=team_data
        )
        return response.get('id') if success else None

    def test_admin_create_testimonial(self):
        """Test admin create testimonial"""
        testimonial_data = {
            "name": "Test Testimonial Author",
            "role": "Test Role",
            "company": "Test Company",
            "content": "This is a test testimonial content."
        }
        success, response = self.run_test(
            "Admin Create Testimonial",
            "POST",
            "api/admin/testimonials",
            200,
            data=testimonial_data
        )
        return response.get('id') if success else None

def main():
    print("🚀 Starting GreenDev Associates API Testing")
    print("=" * 60)
    
    # Setup
    tester = GreenDevAPITester()
    admin_email = "admin@greendevassociates.net"
    admin_password = "GreenDev2024!"

    # Test public endpoints first
    print("\n📋 TESTING PUBLIC ENDPOINTS")
    print("-" * 40)
    
    tester.test_get_stats()
    projects = tester.test_get_projects()
    tester.test_get_featured_projects()
    tester.test_get_projects_by_industry()
    tester.test_get_team()
    tester.test_get_clients()
    tester.test_get_testimonials()
    
    # Test contact form
    contact_id = tester.test_contact_submission()
    
    # Test authentication
    print("\n🔐 TESTING AUTHENTICATION")
    print("-" * 40)
    
    if not tester.test_auth_login(admin_email, admin_password):
        print("❌ Login failed, stopping admin tests")
        print(f"\n📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
        return 1

    tester.test_auth_me()
    
    # Test admin endpoints
    print("\n👨‍💼 TESTING ADMIN ENDPOINTS")
    print("-" * 40)
    
    submissions = tester.test_admin_contact_submissions()
    
    # Test admin CRUD operations
    project_id = tester.test_admin_create_project()
    if project_id:
        tester.test_admin_update_project(project_id)
        tester.test_admin_delete_project(project_id)
    
    team_id = tester.test_admin_create_team_member()
    testimonial_id = tester.test_admin_create_testimonial()
    
    # Test logout
    tester.test_auth_logout()

    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 FINAL RESULTS: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.failed_tests:
        print(f"\n❌ FAILED TESTS ({len(tester.failed_tests)}):")
        for i, test in enumerate(tester.failed_tests, 1):
            print(f"   {i}. {test['name']} - {test.get('endpoint', 'N/A')}")
            if 'expected' in test:
                print(f"      Expected: {test['expected']}, Got: {test['actual']}")
            if 'error' in test:
                print(f"      Error: {test['error']}")
    else:
        print("\n✅ ALL TESTS PASSED!")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())